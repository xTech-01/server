const Redis = require('ioredis');
const logger = require('./logger.js');

/*
test in redis:
LPUSH es-test "{\"product\": \"imuri\"}"
*/


async function run_redis() {

    const data = JSON.stringify({ product: 'iPhone', price: 599.99 });
    // const data = '{\"product\": \"imuri\"}';
    logger.info(data)

    try {
        const redisClient = new Redis();
        logger.info('Connected to Redis successfully.');

        await redisClient.lpush('es-test', data);
        logger.info('Lpushed data successfully.');

        const result = await redisClient.lrange('es-test', 0, -1);
        logger.info('Lranged data retrieved successfully.');
        logger.info(result);

        redisClient.disconnect();
    } catch (error) {
        logger.error(error);
    }
}

run_redis();
