import sys
import requests
from bs4 import BeautifulSoup

from random import choice
import time

from config_extract import (proxy_list, USER_AGENTS, COOKIE, 
                            tori_url_1, tori_proxy_url_1, tori_url_tuuletin,
                            giantti_url_1, giantti_url_ilmastointi)


def extract(live, proxy, product, logger):
    logger.info('Extracting data')

    if product is None:
        logger.error('no product specified in extract')
        return
    else:
        try:
            if live:
                logger.info('live mode')

                headers = {
                    'User-Agent': choice(USER_AGENTS),
                    # 'Accept': 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8',
                    # 'Cookie': COOKIE,
                    # 'Pragma': 'no-cache',
                }

                # -----TODO-----
                # if tori
                url = giantti_url_1 + product + tori_url_tuuletin
                logger.info('making request to: ' + url)


                if not proxy:
                    logger.info('not using proxy')
                    response = requests.get(url, headers=headers)
                else:
                    logger.info('using proxy')

                    data_tori = {
                    "hostname": "www.tori.fi",
                    "path": tori_proxy_url_1 + product + tori_url_tuuletin,
                    "method": "GET",
                    "port": "443",
                    "headers": headers,
                    }

                    data = {
                    "hostname": "www.gigantti.fi",
                    "path": giantti_url_1 + product + giantti_url_ilmastointi,
                    "method": "GET",
                    "port": "443",
                    "headers": headers,
                    }

                    logger.info('proxy data: ' + str(data))
                    proxy = choice(proxy_list)
                    response = requests.post(proxy, json=data)

                logger.info('response received, status code: ' + str(response.status_code))
                logger.info('html parsing...')
                soup = BeautifulSoup(response.content, 'html.parser')
                data_tori = soup.find_all('p', class_='list_price ineuros')
                data = soup.find_all('span', class_='price')
                logger.info(f'data: {data}')

                prices = [price.text for price in data]
                logger.info(f'prices: {prices}')
                '''
                outFile = open('prices_extract.txt', 'w')
                outFile.write(str(prices))
                outFile.close()
                logger.info('extracted data written to file')
                '''
                time.sleep(5)
            else:
                logger.info('reading data from file')
                with open('prices_extract.txt', 'r') as file:
                    prices = file.read()
                    logger.info(f'prices: {prices}')
                    file.close()
            return prices
        except Exception as e:
            logger.error('error making request: ' + str(e))
        

