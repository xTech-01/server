import sys
import argparse
import logging

import extract, transform, load



def get_options(argv=None):
    parser = argparse.ArgumentParser(description='ETL Tori Gigantti S K Low Price Data')
    # python3 app.py -v T
    # python3 app.py -v T -p T -pr T
    parser.add_argument('-v', '--verbose', default=False, type=bool, help='verbose output')
    parser.add_argument('-p', '--production', default=False, type=bool, help='production mode')
    parser.add_argument('-pr', '--proxy', default=False, type=bool, help='use proxy')

    return parser.parse_args(argv)

args = get_options(sys.argv[1:])

if args.verbose:
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
else:
    logging.basicConfig(level=logging.ERROR, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)
logger.info(args)
logger.info('Starting')

def etl():
    production = args.production
    proxy = args.proxy
    e = extract.extract(proxy, logger)
    if e is None:
        logger.error('no data from extraction')
        return
    else: 
        logger.info('data extracted')
        t = transform.transform(e, logger)
        load.load(t, production, logger)



if __name__ == '__main__':
    etl()