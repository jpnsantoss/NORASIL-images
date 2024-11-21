# Construction Image Upload API

This project is an API for uploading and managing images related to construction builds. It is built using Hono, Prisma, and PostgreSQL, and is designed to be easily deployable using Docker.

## Features

- Upload images related to construction builds
- Upload general images
- Fetch all images from a specific build
- Fetch an image by key
- Delete an image by key
- Delete all images of a specific build
- Serve static images

## Technologies Used

- **Hono**: A lightweight web framework for building APIs
- **Prisma**: An ORM for interacting with the PostgreSQL database
- **PostgreSQL**: A powerful, open-source relational database
- **Docker**: For containerizing the PostgreSQL database

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/construction-image-upload-api.git
   cd construction-image-upload-api
   ```

2. Install the dependencies

    ```sh
    npm install
    ```

3. Set up the PostgreSQL database using Docker:

   ```sh
   docker compose up -d
   ```

4. Set up the environment variables:
   Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_URL="postgresql://images:password@localhost:5432/images"
   ```

5. Initialize the Prisma schema:

    ```sh
    npx prisma migrate dev --name init
    npx prisma generate
    ```

6. Start the server:

    ```sh
    npm run dev
    ```

## API Endpoints

The API provides the following endpoints:

### Upload an image related to a construction build

- **URL**: `/images/builds/upload`
- **Method**: `POST`
- **Request**:
  - `multipart/form-data`
  - `build_id` (optional): ID of the construction build
  - `image` (required): Image file to upload
- **Response**:

  ```json
  {
    "message": "Image uploaded successfully",
    "image": {
      "key": "1",
      "url": "uploads/1633024800000-image.jpg",
      "buildId": "build123"
    }
  }
  ```

### Upload a general image

- **URL**: `/images/upload`
- **Method**: `POST`
- **Request**:
  - `multipart/form-data`
  - `image` (required): Image file to upload
- **Response**:

  ```json
  {
    "message": "Image uploaded successfully",
    "image": {
      "key": "1",
      "url": "uploads/1633024800000-image.jpg"
    }
  }
  ```

### Fetch all images from a build

- **URL**: `/images/builds/{id}`
- **Method**: `GET`
- **Response**:

  ```json
  [
    {
      "key": "1",
      "url": "uploads/1633024800000-image.jpg",
      "buildId": "build123"
    }
  ]
  ```

### Fetch an image by key

- **URL**: `/images/{key}`
- **Method**: `GET`
- **Response**:

  ```json
  {
    "key": "1",
    "url": "uploads/1633024800000-image.jpg",
    "buildId": "build123"
  }
  ```

### Delete an image by key

- **URL**: `/images/{key}`
- **Method**: `DELETE`
- **Response**:

  ```json
  {
    "message": "Image deleted successfully"
  }
  ```

### Delete all images of a build

- **URL**: `/images/builds/{id}`
- **Method**: `DELETE`
- **Response**:

  ```json
  {
    "message": "All images of the build deleted successfully"
  }
  ```

## Prisma Schema

The Prisma schema defines the data models for the application:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Image {
  key       Int       @id @default(autoincrement())
  url       String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  buildImage BuildImage?
}

model BuildImage {
  id        Int       @id @default(autoincrement())
  buildId   String
  imageKey  Int       @unique
  image     Image     @relation(fields: [imageKey], references: [key])
}
```

## Swagger Documentation

The API is documented using Swagger. The `swagger.yml` file defines the API endpoints and their request and response formats.
