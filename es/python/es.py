from elasticsearch import Elasticsearch

# dict for each node
hosts = [
    {
        'host': 'localhost',
        'port': 9200,
        'scheme': 'http',  # Or 'https' if using SSL/TLS
    },
    ]
es = Elasticsearch(
    hosts=hosts,
    basic_auth=('elastic', 'password'),
    )


def delete_index():
    response = es.indices.delete(index='my_web_data_index')
    if response['acknowledged']:
        print("Index was deleted successfully")
    else:
        print("Index was not deleted successfully")


def update():
    document_id = '1'  
    script = {
        "source": "ctx._source.content = params.updated_value",
        "params": {
            "updated_value": "hi there updated"
        }
    }
    response = es.update(index=index_name, id=document_id, body={"script": script})
    print(response)


def delete_field():
    if 'field_name' in es.get(index=index_name, id='1')['_source']:
        update_script = {
            "script": {
                "source": "ctx._source.remove('field_name')"
            }
        }
        response = es.update(index=index_name, id='1', body=update_script)
        print(response)
    else:
        print("Field does not exist")


def mapping():
    mapping = {
        "properties": {
            "title": {"type": "text"},
            "message": {"type": "text"},
            "timestamp": {"type": "date"}
        }
    }
    print('Mapping created successfully')


def indexing():
    if not es.indices.exists(index=index_name):
        es.indices.create(index=index_name, body={"mappings": mapping})
    data_to_index = [
        {"title": "Doc1", "message": "Hi there", "timestamp": "2023-07-22"},
        {"title": "Doc2", "message": "hello world", "timestamp": "2023-07-22"},
    ]
    for idx, doc in enumerate(data_to_index):
        es.index(index=index_name, id=idx, body=doc)
    print("Indexed successfully")


def search():
    search_query = {
        "query": {
            "match_all": {}
        }
    }
    results = es.search(index=index_name, body=search_query)

    for hit in results["hits"]["hits"]:
        print(f"Document ID: {hit['_id']}")
        print(hit["_source"])
        # print(f"Score: {hit['_score']}, Title: {hit['_source']['title']}, Content: {hit['_source']['content']}")


if __name__ == '__main__':
    index_name = 'new_index'
    
    # delete_index()
    # update()
    # delete_field()
    # mapping()
    # indexing()
    search()