# tembo-be


`docker compose up --build`

starts up docker containers with node server on port 8080, postgres on 5432

`yarn db:migration up`

runs migration script to create user table and populate with fake users

`yarn db:migration up`

destroys db tables

service can be reached at http://localhost:8080/v1/users


