from random import choice
import requests
import json
import logging

from config import (proxy_list, 
                    USER_AGENTS, 
                    COOKIE,
                    url_gigantti,
                    proxy_gigantti)

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def daily(url, proxy_url):
    agent = choice(USER_AGENTS)
    try:
        headers = {
            'user-agent': agent,
            'Accept': 'application/json',
            'Accept-Encoding': '*',
            'Accept-Language': 'en-US,en;q=0.9',
            "Cookie": COOKIE,
            'Pragma': 'no-cache'
        }


        logger.info('Making a request to :'+ url)
        data = {"hostname": "www.gigantti.fi",
            "path": proxy_url,
            "method": "GET",
            "port": 443,
            "headers": headers}
        logger.info(data)

        proxy = choice(proxy_list)
        logger.info('Using Proxy: ' + proxy)
        r = requests.post(proxy, json=data)

        logger.info(r.status_code)
        
        j = r.json()
        logger.info(j)
        logger.info('got data')
        return j
    except Exception as e:
        logger.error(e)
        logger.error('error in extract')
        return None

daily(url_gigantti, proxy_gigantti)