import psycopg2


def connect(logger):
    try:
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="savings_finder",
            user="postgres",
            password="1234"
        )
        logger.info('Connected to database')
        cur = conn.cursor()
        return conn, cur
    except Exception as e:
        logger.error('error connecting to database: ' + str(e))


def load(data, db, production, logger):
    logger.info('Loading data')
    if data is None:
        logger.error('no data to load')
        return
    else:
        if db:
            logger.info('Connecting to database')
            logger.info('Executing query')
            sql = "INSERT INTO halpaa_hinta_products (name, category, description, image, price1, source1) VALUES (%s, %s, %s, %s, %s, %s)"
            logger.info(sql)
            logger.info(data)
            conn, cur = connect(logger)  
            if production:
                logger.info('Production mode')
                try:
                    for row in data:
                        cur.execute(sql, row)
                    logger.info('row count: ' + str(cur.rowcount))
                    conn.commit()
                    logger.info('commited to database')
                    cur.close()
                    conn.close()
                except Exception as e:
                    logger.error('error connecting to database: ' + str(e))
    logger.info('Finished')