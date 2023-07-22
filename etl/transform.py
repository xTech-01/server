import sys
import ast

def transform(product, data, logger):
    logger.info('Transforming data')
    data_to_db = []
    if data is None:
        logger.error('no data to transform')
        return
    else:
        if type(data) == str:
            data = ast.literal_eval(data)
            logger.info(data)
        for d in data:
            # logger.info(d)
            d = int(d.replace('€', '').replace(',', '.').replace(' ', ''))
            data_to_db.append(d)
        logger.info(data_to_db)

        value = []
        category = 'tuuletin'
        description = 'tuuletin'
        image = '123'
        upsert_source = 'tori'

        for i in range(len(data_to_db)):
            if data_to_db[i] == 0:
                continue
            else:
                row = (product, category, description, image, data_to_db[i], upsert_source)
                value.append(row)
        logger.info(len(value))
        # logger.info(value)
        logger.info('data transformed')

        return value