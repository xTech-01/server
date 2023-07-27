const { Pool } = require('pg');
const logger = require('./winston_logger.js');
const dbConfig = require('./config.js');


const pool = new Pool(dbConfig);

async function perform_query() {
  try {
    const client = await pool.connect();

    // ----TODO:----
    // add column 'url/' 
    const query = "SELECT name, price1, price2, price3 FROM public.halpaa_hinta_products WHERE name ILIKE '%imuri%';";
    logger.info('Querying...');
    logger.info(query);

    const result = await client.query(query);
    logger.info('Query Result:');
    logger.info(JSON.stringify(result.rows));

    // Release the client back to the pool
    client.release();
    return result.rows;
  } catch (error) {
    logger.error('Error:', error);
  }
}

perform_query();
