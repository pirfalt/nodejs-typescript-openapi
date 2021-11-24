# NodeJS + TypeScript + OpenAPI

https://trello.com/c/UbykGjK4/386-nodejs-typescript-openapi

[Presentation](./presentation.md)

## Setup

```sh
npm install
npm run openapi
npm run dev
```

## Usage

```sh
# Ping
curl 'http://localhost:3000/ping'
```

```sh
# Check for pets
curl 'http://localhost:3000/api/v3/pet' -i
curl 'http://localhost:3000/api/v3/pet/1' -i

# Create some pets
curl 'http://localhost:3000/api/v3/pet' -H 'content-type: application/json' -d '{}' | jq
curl 'http://localhost:3000/api/v3/pet' -H 'content-type: application/json' -d '{
  "name": "Fluffy",
  "photoUrls": ["/photo.jpg"],
  "status": "available"
}' | jq

# Check again
curl 'http://localhost:3000/api/v3/pet' -i
curl 'http://localhost:3000/api/v3/pet/1' -i
curl 'http://localhost:3000/api/v3/pet/10' -i


# Unimplemented routes
curl 'http://localhost:3000/api/v3/pet/findByTags'
curl 'http://localhost:3000/api/v3/pet/findByStatus'
curl 'http://localhost:3000/api/v3/pet/findByStatus?status=available'

```

```sh
# Store inventory
curl 'http://localhost:3000/api/v3/store/inventory' -i
```
