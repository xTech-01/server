import sys
import argparse
import logging

from config_extract import products
import extract, transform, load



def get_options(argv=None):
    parser = argparse.ArgumentParser(description='ETL Tori Gigantti S K Low Price Data')
    # python3 app.py -v T
    # python3 app.py -v T -l T -pr T -db T -p T
    parser.add_argument('-v', '--verbose', default=False, type=bool, help='verbose output')
    parser.add_argument('-p', '--production', default=False, type=bool, help='production mode')
    parser.add_argument('-l', '--live', default=False, type=bool, help='live mode')
    parser.add_argument('-pr', '--proxy', default=False, type=bool, help='use proxy')
    parser.add_argument('-db', '--db', default=False, type=bool, help='connect to database')
    parser.add_argument('-pd', '--product', default='all', nargs='+', type=str, help='products to search for')

    return parser.parse_args(argv)

args = get_options(sys.argv[1:])

if args.verbose:
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
else:
    logging.basicConfig(level=logging.ERROR, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)
logger.info(args)
logger.info('Starting')

try:
    if args.product == 'all':
        logger.info('all products')
    elif len(args.product) >= 1:
        logger.info('multiple products')
        products = args.product
    logger.info(products)
except Exception as e:
    logger.error(e)
    logger.error('no product specified in args')
    sys.exit(1)

def etl(product):
    production = args.production
    live = args.live
    proxy = args.proxy
    db = args.db
    e = extract.extract(live, proxy, product, logger)
    if e is None:
        logger.error('no data from extraction')
        return
    else: 
        logger.info('data extracted')
        t = transform.transform(product, e, logger)
        load.load(t, db, production, logger)



if __name__ == '__main__':
    for product in products:
        logger.info('product: ' + product)
        etl(product)