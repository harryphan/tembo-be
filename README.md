# tembo-be

Proof of concept for one time secret. Any user can send a message to another existing user. Messages
will be encrypted and stored until retrieval. Once retrieved, secret is destroyed.

`docker compose up --build`

builds docker image for back end and starts up docker 
containers with node server on port 8080, postgres on 5432. can be called without --build once
the image is built.

`yarn db:migration up`

runs migration script to create user table and populate with fake users

`yarn db:migration up`

destroys db tables

service can be reached at http://localhost:8080/v1/users


example post message: 

```
curl -X POST localhost:8080/v1/messages -H 'Content-Type: application/json' -d '{"toUserId":1,"message":"secret"}'
```
