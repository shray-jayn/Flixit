# Flixit API

Flixit API is a backend service for managing users, movies, and lists. It provides endpoints for user authentication, movie management, and list management. The API is built using Node.js, Express, TypeScript, Prisma, and MongoDB.

## Table of Contents

- [Flixit API](#flixit-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
  - [Scripts](#scripts)
  - [API Endpoints](#api-endpoints)
    - [Auth Routes](#auth-routes)
    - [User Routes](#user-routes)
    - [Movie Routes](#movie-routes)
    - [List Routes](#list-routes)
  - [Using Prisma ORM](#using-prisma-orm)
  - [Data Validation with Zod](#data-validation-with-zod)
  - [License](#license)

## Features

- User authentication and authorization
- Movie management (CRUD operations)
- List management (CRUD operations)
- Data validation using Zod
- JWT-based authentication
- TypeScript for static type checking

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn
- MongoDB database

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/shray-jayn/Flixit.git
    cd API
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
SECRET_KEY_FOR_CRYPTOJS="your_secret_key"
PORT=3000
JWT_SECRET="your_jwt_secret_key"
DATABASE_URL="mongodb://localhost:27017/your-database-name"
```

## Running the Application

Start the application in development mode:

```sh
npm run dev
```

Build the application for production:

```sh
npm run build
```

Start the application in production mode:

```sh
npm start
```

## Scripts

- `npm run dev`: Start the application in development mode
- `npm run build`: Build the application for production
- `npm start`: Start the application in production mode
- `npm run lint`: Run ESLint to check for linting errors
- `npm run lint:fix`: Run ESLint and fix linting errors

## API Endpoints

### Auth Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### User Routes

- `PUT /api/users/:userId`: Update a user
- `DELETE /api/users/:userId`: Delete a user
- `GET /api/users/find/:userId`: Get a user by ID
- `GET /api/users`: Get all users
- `GET /api/users/stats`: Get user statistics

### Movie Routes

- `POST /api/movies`: Create a new movie
- `PUT /api/movies/:userId`: Update a movie
- `DELETE /api/movies/:userId`: Delete a movie
- `GET /api/movies/find/:userId`: Get a movie by ID
- `GET /api/movies`: Get all movies
- `GET /api/movies/random`: Get a random movie

### List Routes

- `POST /api/lists`: Create a new list
- `DELETE /api/lists/:userId`: Delete a list
- `GET /api/lists`: Get all lists


## Using Prisma ORM

Prisma is an ORM (Object-Relational Mapping) tool that makes it easy to work with databases in a type-safe manner. It supports various databases, including MongoDB, PostgreSQL, MySQL, and SQLite.

### Setting Up Prisma

1. Initialize Prisma in your project:

    ```sh
    npx prisma init
    ```

2. Define your data models in `prisma/schema.prisma`. For example:

    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "mongodb"
      url      = env("DATABASE_URL")
    }

    model User {
      id        String   @id @default(auto()) @map("_id") @db.ObjectId
      email     String   @unique
      username  String   
      password  String
      profilePic String? @default("")
      isAdmin   Boolean  @default(false) 
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
    }

    model Movie {
      id          String  @id @default(auto()) @map("_id") @db.ObjectId
      description String?
      poster      String?
      thumbnail   String?
      title       String  @unique 
      trailer     String?
      video       String?
      year        String?
      limit       String?
      genre       String?
      isSeries    Boolean @default(false) 
      createdAt   DateTime @default(now())
      updatedAt   DateTime @updatedAt
    }

    model List {
      id        String   @id @default(auto()) @map("_id") @db.ObjectId
      title     String   @unique
      type      String?
      genre     String?
      content   String[]
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
    }
    ```

3. Pull your database schema into Prisma:

    ```sh
    npx prisma db pull
    ```

4. Generate the Prisma Client:

    ```sh
    npx prisma generate
    ```

5. Use Prisma Client in your application to interact with the database:

    ```ts
    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();

    const allUsers = await prisma.user.findMany();
    ```

## Data Validation with Zod

Zod is a TypeScript-first schema declaration and validation library. It provides a straightforward way to define schemas and validate data.
