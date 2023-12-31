import sys
import requests
from bs4 import BeautifulSoup

from random import choice
import time

from config import (proxy_list, USER_AGENTS, COOKIE, 
                            url_tori, url_tori_1, url_proxy_tori_1, url_tori_ilmastointi, url_tori_tuuletin,
                            url_giantti, url_giantti_1, url_giantti_ilmastointi,)


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
                url = url_tori_1 + product + url_tori_tuuletin
                logger.info('making request to: ' + url)


                if not proxy:
                    logger.info('not using proxy')
                    response = requests.get(url, headers=headers)
                else:
                    logger.info('using proxy')

                    data_tori = {
                    "hostname": "www.tori.fi",
                    "path": url_proxy_tori_1 + product + url_tori_tuuletin,
                    "method": "GET",
                    "port": "443",
                    "headers": headers,
                    }

                    data_gigantti = {
                    "hostname": "www.gigantti.fi",
                    "path": url_giantti_1 + product + url_giantti_ilmastointi,
                    "method": "GET",
                    "port": "443",
                    "headers": headers,
                    }

                    data = data_tori
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
        

