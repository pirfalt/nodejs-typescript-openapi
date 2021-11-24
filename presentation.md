# Specification vs Documentation

The way I see it, there are three ways one _could_ use openapi or similar api specifications.

1. Manually keep the code and specification in sync.
   - Reasonable if the specification is added to an already existing project.
   - Easy to get out of sync. 👎
2. Code first. Write/annotate your code and generate the specification.
   - Always in sync. 👍
   - Adding annotations or conforming to a code/layout standard can be annoying.
   - The tooling may put restrictions on both language features and specification output. 👎
3. Specification first. Write your specification and generate your code.
   - Always in sync. 👍
   - The generated code can be absolutely horrible. 👎

Number 2 and 3 are both good options, the choice comes down to preference and tooling support.

If you have an architect who makes design decisions, they prefer nr 3.

Consider if you expect your implementation or specification to outlive the other?

## `openapi-typescript`

We chose the "specification first" approach. Using a the [openapi-typescript](https://www.npmjs.com/package/openapi-typescript) library.

> ### 🏅 Project Goals
>
> 1. Support converting any OpenAPI 3.0 or 2.0 (Swagger) schema to TypeScript types, no matter how complicated
> 2. The generated TypeScript types **must** match your schema as closely as possible (i.e. don’t convert names to PascalCase or follow any TypeScript-isms; faithfully reproduce your schema as closely as possible, capitalization and all)
> 3. This library is a TypeScript generator, not a schema validator.

That sounds good to me!

```sh
# Usage
$(npm bin)/openapi-typescript --help
$(npm bin)/openapi-typescript specification/petstore-openapi.yaml --output src/openapi-types.ts

# Inspect output
code specification/petstore-openapi.yaml
code src/openapi-types.ts
```

## Demo 1

What is a handler? And what is an `API`?

```sh
# Handler type, using the generated types
code --goto ./src/routes/types.ts:24
```

This is the code you want to get right, so you can build upon it later.

## Demo 2

Working with a handler.

```sh
# Naive handler implementation
code --goto ./src/routes/pet-handler.ts:7
code --goto ./src/routes/pet-handler.ts:93
```

## Demo 3

A layered approach.

```sh
# Service
code --goto ./src/services/store-service.ts:15

# Handler, using service
code --goto ./src/routes/store-handler.ts:6

# Server
code --goto ./src/server.ts:12
```

## Demo 4

Only if there is time and no questions.

```sh
# FIXME(demo)
code --goto ./src/routes/pet-handler.ts:77

# TODO(demo)
code --goto ./src/routes/store-handler.ts:54
```
