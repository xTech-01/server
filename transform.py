

def transform(data, logger):
    logger.info('Transforming data')
    if data is None:
        logger.error('no data to transform')
        return
    else:
        logger.info('data transformed')
        return data