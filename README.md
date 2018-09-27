# dotThen

> An attempt at replicating Spotify's Artist page UI 

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API

Server supports all CRUD operations

GET: Artists

- Endpoint: /artists/albums/:artistID
- Description: Will get all information associated with specified :artistID  
- Response: contains object with artist data

POST: Artists

- Endpoint: /artists/albums
- Description: Will add a complete artist object to the database.
- Response: no response

PUT: Artists

- Endpoint: /artists/albums/:artistID
- Description: Will update artist object for given artistID and object with properties and values to update
- Response: no response

DELETE: Artists

- Endpoint: /artists/albums/:artistID
- Description: Will delete artist object for given :artistID  
- Response: no response