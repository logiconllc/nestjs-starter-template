
# Description

<PROJECT DESCRIPTION>

## Repo Information

- Nest.js
- GrahpQL (code basis)
- Additionals
- --- Logging Interceptor (for both REST & GraphQL)
- --- Custom GrahQL Response formatter (no stacktrace in prod)
- --- Custom GraphQL Error (for proper GraphQL Exception handling)


## Installation

```bash
npm install
```

## Database Migrations & Seeders

Migrations have their own database configurations in `src/config` folder

```bash
# Create a migration 
npm run migration:generate src/migrations/<MIGRATION_NAME>
# Run Migrations
npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🚀 About Me

> Built with ❤️ by @logiconllc
> 
<https://logicon.tech>
