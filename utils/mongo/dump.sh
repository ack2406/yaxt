#/bin/bash

username='root'
password='root123'

# create a dump folder if it doesn't exist
mkdir -p dumps

# dump the database
docker exec $1 sh -c "exec mongodump --db yaxt -u ${username} -p ${password} --gzip --archive" > dumps/dump_`date "+%Y-%m-%d"`.gz