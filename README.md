## Pre-requisites

- Install Docker - [Docker >= 20.10.7](https://docs.docker.com/get-docker/)
- Install typescript - [Python >= 3.8.11](https://www.python.org/downloads/release/python-3811/)
- Install package.json - [npm install [<package-spec> ...]]

<br/>

##  Run Locally
### npx ts-node src/main.ts

## Build & Test
### npm run build
### npm run test

## Understanding Code Structure
Folderstructure and what each file does. 
```
📦DATA_STREAM_SERVICE
 ┣ 📂dest                         => Destination folder for all the auto created .js files
 ┃ ┃ 📂src                        => Source directory
 ┃ ┣ ┣ ┣ 📂database
 ┃ ┃ ┃  ┣📜db_client.js           => Client to conect to mongodb database 
 ┃ ┃ ┣ 📜cities.js                => Contains all the cities as object
 ┃ ┃ ┣ 📜consumer.service.js      => Comume messages published by publish service
 ┃ ┃ ┗ 📜main.js                  => Entrypoint for the application
 ┃ ┃ ┗ 📜publisher.service.js     => Publish message to the message broker 
 ┃ ┃ ┗ 📜street.service.js.       => Integrates extenal API 
 ┃ ┣ 📂test                       => Holds all the spec files.
 ┃ ┃ ┗ 📜db.spec.ts               => Test case to the db connection
 ┃ ┃ ┗ 📜publisher.spec.ts        => Unit test for Publishing service
 ┣ 📜.env                         => Configuration files
 ┣ 📜docker-compose.yml           => Docker-compose
 ┣ 📜package-lock.json          => npm package info (auto-generated)
 ┣ 📜package.json               => npm dependencies
 ┣ 📜README.md                  => READ FILE
 ┗ 📜tsconfig.json              => Typescript config
 ```