#/bin/bash

username='root'
password='root123'

# restore the database
docker exec -i $1 sh -c "exec mongorestore --nsInclude=yaxt.tests -u ${username} -p ${password} --gzip --archive" < $2
docker exec -i $1 sh -c "exec mongorestore --nsInclude=yaxt.questions -u ${username} -p ${password} --gzip --archive" < $2
docker exec -i $1 sh -c "exec mongorestore --nsInclude=yaxt.answers -u ${username} -p ${password} --gzip --archive" < $2