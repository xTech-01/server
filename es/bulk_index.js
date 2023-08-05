'use strict'

require('array.prototype.flatmap').shim()
const { Client } = require('@elastic/elasticsearch')
const logger = require('./logger.js');


const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'password'
    },
  });
// const client = new Client({
//   cloud: { id: '<cloud-id>' },
//   auth: { apiKey: 'base64EncodedKey' }
// })

async function run () {
  await client.indices.create({
    index: 'tweets',
    operations: {
      mappings: {
        properties: {
          id: { type: 'integer' },
          text: { type: 'text' },
          user: { type: 'keyword' },
          time: { type: 'date' }
        }
      }
    }
  }, { ignore: [400] })

const dataset = [{
    id: 1,
    text: 'If I fall, don\'t bring me back.',
    user: 'jon',
    date: new Date()
  }, {
    id: 2,
    text: 'Winter is coming',
    user: 'ned',
    date: new Date()
  }, {
    id: 3,
    text: 'A Lannister always pays his debts.',
    user: 'tyrion',
    date: new Date()
}]

const operations = dataset.flatMap(doc => [{ index: { _index: 'tweets' } }, doc])

const bulkResponse = await client.bulk({ refresh: true, operations })

if (bulkResponse.errors) {
  const erroredDocuments = []
  // The items array has the same order of the dataset we just indexed.
  // The presence of the `error` key indicates that the operation
  // that we did for the document has failed.
  bulkResponse.items.forEach((action, i) => {
    const operation = Object.keys(action)[0]
    if (action[operation].error) {
      erroredDocuments.push({
        // If the status is 429 it means that you can retry the document,
        // otherwise it's very likely a mapping error, and you should
        // fix the document before to try it again.
        status: action[operation].status,
        error: action[operation].error,
        operation: operations[i * 2],
        document: operations[i * 2 + 1]
      })
    }
  })
  logger.error(erroredDocuments)
}

const count = await client.count({ index: 'tweets' })
  logger.info(JSON.stringify(count))
}

run().catch(logger.error)
