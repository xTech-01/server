const Redis = require('ioredis');
const logger = require('./logger.js');

/*
test in redis:
LPUSH es-test "{\"product\": \"imuri\"}"
*/


async function run_redis(data_from_db, topic) {


    const data = JSON.stringify(data_from_db);

    logger.info(data)

    try {
        const redisClient = new Redis();
        logger.info('Connected to Redis successfully.');

        await redisClient.lpush(topic, data);
        logger.info('Lpushed data successfully.');

        const result = await redisClient.lrange(topic, 0, -1);
        logger.info('Lranged data retrieved successfully.');
        logger.info(result);

        redisClient.disconnect();
    } catch (error) {
        logger.error(error);
    }
}

const data_from_db = { product: 'ilmastointilaite', price: 299.99 };
const topic = 'es-redis';

run_redis(data_from_db, topic);
