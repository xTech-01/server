import requests
from bs4 import BeautifulSoup

from random import choice
import time

from config_extract import proxy_list, USER_AGENTS, COOKIE, tori_url_1, tori_proxy_url_1, tori_url_tuuletin

# import logging
# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')


def extract(proxy, logger):

    # products = ['tuuletin', 'ilmastointi', 'renkaat']
    products = ['tuuletin']
    synonym = ['ilmastointilaite', 'ilmastointilaitteet', 'ilmastointilaitetta', 'ilmastointilaitteita', 'ilmastointilaitteiden', 'ilmastointilaitteeseen', 'ilmastointilaitteeseesi', 'ilmastointilaitteeseenne', 'ilmastointilaitteellesi', 'ilmastointilaitteellasi', 'ilmastointilaitteellanne', 'ilmastointilaitteellesi', 'ilmastointilaitteellasi', 'ilmastointilaitteellanne', 'ilmastointilaitteelta', 'ilmastointilaitteeltasi', 'ilmastointilaitteeltanne']


    for product in products:
        logger.info('extracting data for: ' + product)
        try:
            headers = {
                'User-Agent': choice(USER_AGENTS),
                # 'Accept': 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8',
                # 'Cookie': COOKIE,
                # 'Pragma': 'no-cache',
            }

            # -----TODO-----
            # if tori
            url = tori_url_1 + product + tori_url_tuuletin
            logger.info('making request to: ' + url)


            if not proxy:
                logger.info('not using proxy')
                response = requests.get(url, headers=headers)
            else:
                logger.info('using proxy')
                data = {
                "hostname": "www.tori.fi",
                "path": tori_proxy_url_1 + product + tori_url_tuuletin,
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
            data = soup.find_all('p', class_='list_price ineuros')
            # logger.info(f'data: {data}')

            prices = [price.text for price in data]
            logger.info(f'prices: {prices}')
            time.sleep(5)

            outFile = open('prices_extract.txt', 'w')
            outFile.write(str(prices))
            outFile.close()
            logger.info('extracted data written to file')

            return prices
        except Exception as e:
            logger.error('error making request: ' + str(e))
        

