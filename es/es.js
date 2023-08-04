const { Client } = require('@elastic/elasticsearch')
const logger = require('./logger.js');


const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'password'
    },
  });

async function run_ping() {
    try {
        const response = await client.ping()
        if (response.statusCode === 200) {
            logger.info('Elasticsearch cluster is up!');
        } else {
            logger.error('Elasticsearch cluster is down!');
        };
    } catch (error) {
        logger.error('Error connecting to the Elasticsearch cluster:', error.message);
    }
}


const del_index = async (indexName) => {
    try {
        const del = await client.indices.delete({
            index: indexName,
        });
        logger.info('Index successfully deleted:');
        logger.info(body);
    } catch (error) {
        logger.error('Error deleting index:', error);
    }
};


const del_doc = async (indexName) => {
    try {
        const del = await client.delete({
            index: indexName,
            id: 'ypBAmIkBHSnjRtQvAkbH',
        });
        logger.info('Document successfully deleted:');
        logger.info(JSON.stringify(del));
    } catch (error) {
        logger.error('Error deleting document:', error);
    }
};


const update_doc = async (indexName) => {
    try {
        const updated = await client.update({
            index: indexName,
            id: '1',
            doc: {
                title: 'ai',
                news: 'new vibes',
            },
        });
        logger.info('Document updated successfully:');
        logger.info(JSON.stringify(updated));
    } catch (error) {
        logger.error('Error updating document:', error);
    }
};


const add_doc = async (indexName) => {
    try {
        const indexed = await client.index({
            index: indexName,
            id : '1',
            document: {
                title: 'ai',
                content: '1 hello world',
            }
        });
        logger.info('Document indexed successfully:');
        logger.info(JSON.stringify(indexed));
    } catch (error) {
        logger.error('Error indexing document:', error);
    }
};


const create_index = async (indexName) => {
    try {
        const idx = await client.indices.create({
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
        logger.info(JSON.stringify(idx))
    } catch (error) {
        logger.error('Error creating index:', error);
    }
};


async function get_index(indexName) {
    try {
        const index_exists = await client.indices.exists({ index: indexName });
        if (!index_exists) {
            logger.info(`Index ${indexName} does not exist`);
            return;
        } else {
            logger.info(`Index ${indexName} exists`);
        }

        const obj = await client.indices.get({ 
            index: indexName 
        });
        logger.info('obj mappings:')
        logger.info(JSON.stringify(obj[indexName].mappings))

        const doc = await client.get({
            index: indexName,
            id: '1'
        });
        logger.info('doc:')
        logger.info(JSON.stringify(doc))
    } catch (error) {
        logger.error('Error getting index obj:', error);
    
    }
}


const search = async (indexName) => {
    try {
        const res = await client.search({
            index: indexName,
            query: {
                match_all: {},
            },
        });
        logger.info('Search Results:');
        if (res.hits && res.hits.hits) {
            const docs = res.hits.hits;
            docs.forEach((doc) => {
                logger.info(`doc: ${JSON.stringify(doc)}`);
            });
        } else {
            logger.info('No hits');
        }

        const resp = await client.search({
            query: {
                match: {
                    title: 'ai',
                },
            },
        });
        logger.info('get query results:')
        logger.info(JSON.stringify(resp))
    } catch (error) {
    logger.error('Error searching :', error);
    }

};


const start_app = () => {
    run_ping();
    // const indexName = 'new_index_js';
    const indexName = 'tweets'

    // del_index(indexName);
    // del_doc(indexName);

    // update_doc(indexName);
    // add_doc(indexName);
    // create_index(indexName);
    // get_index(indexName)



    search(indexName);
    
}

start_app();