#Don't panic, it's not rocket science. -

## server

# run es:
```
cd elasticsearch-7.17.11/
    bin/elasticsearch
        curl -X GET "http://localhost:9200" -u "elastic:password"
            curl -X GET "http://localhost:9200/_cat/indices" -u "elastic:password"
                curl -X GET "http://localhost:9200/new_index_js/_search" -u "elastic:password"
                    cmd+./ctrl+c to stop
                    ps -ef | grep elasticsearch kill <pid>
```

# enable security:
```
config/
    elasticsearch.yml
        xpack.security.enabled: true
            bin/elasticsearch-setup-passwords interactive
```

# install es on mac:
```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.11-darwin-x86_64.tar.gz
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.11-darwin-x86_64.tar.gz.sha512
    -> to compare elasticsearch-7.17.11-darwin-x86_64.tar.gz: OK
        shasum -a 512 -c elasticsearch-7.17.11-darwin-x86_64.tar.gz.sha512 
            tar -xzf elasticsearch-7.17.11-darwin-x86_64.tar.gz
                cd elasticsearch-7.17.11/ 
```