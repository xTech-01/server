import { Client } from '@elastic/elasticsearch';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(), 
    transports: [
      new winston.transports.Console(), 
      new winston.transports.File({ filename: 'es.log' }),
    ],
  });

const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'password'
    },
  });

const deleteIndex = async (indexName) => {
    try {
    const { body } = await client.indices.delete({
        index: indexName,
    });
    logger.info('Index successfully deleted:');
    logger.info(body);
    } catch (error) {
    logger.error('Error deleting index:', error);
    }
};


async function getIndexObj(indexName) {
    try {
        const { body } = await client.indices.get({ index: indexName });
        logger.info('body')
        logger.info(body)
        logger.info('body[indexName]')
        logger.info(body[indexName])
        logger.info(body[indexName].mappings)
        return body[indexName];
    } catch (error) {
        logger.error('Error getting index obj:', error);
        return null;
    }
}


const createIndex = async (indexName) => {
    try {
    const { body } = await client.indices.create({
        index: indexName,
        body: {
        mappings: {
            properties: {
            title: { type: 'text' },
            content: { type: 'text' },
            },
        },
        },
    });
    logger.info('Index successfully created:');
    } catch (error) {
    logger.error('Error creating index:', error);
    }
};


const indexDocument = async (indexName, document) => {
    try {
    const { body } = await client.index({
        index: indexName,
        body: document,
    });
    logger.info('Document indexed successfully:');

    } catch (error) {
    logger.error('Error indexing document:', error);
    }
};



const search = async (new_index_js, query) => {
    try {
    const { body } = await client.search({
        index: new_index_js,
        body: {
        query: {
            match_all: {},
        },
        },
    });
    logger.info('Search Results:');
    if (body.hits && body.hits.hits) {
        logger.info(`hits: ${typeof(body.hits.hits)}`);
    } else {
        logger.info('No hits');
    }
    } catch (error) {
    logger.error('Error searching :', error);
    }
};


const start_app = () => {
    const indexName = 'new_index_js';
    const document = { title: 'Sample Document', content: 'This is a test document.' };

    // deleteIndex(indexName);
    // createIndex(indexName);
    // indexDocument(indexName, document);

    // getIndexObj(indexName)
    // .then((indexObj) => {
    //     if (indexObj) {
    //         logger.info('Index obj:'); 
    //         logger.info(indexObj);
    //     } else {
    //         logger.info('Index obj is null');
    //     }
    // })
    // .catch((err) => {
    //     logger.error('Error getting index obj:', err);
    // });

    search(indexName, 'test');
    
}

start_app();