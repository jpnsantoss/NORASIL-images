# NORASIL-images

## Overview

NORASIL-images is an API for storing and serving images. It allows users to upload images, retrieve all images, retrieve a specific image by ID, and serve the image file.

## Features

- Upload images
- Retrieve all images
- Retrieve a specific image by ID
- Serve image files

## Prerequisites

- Node.js (>= 20.x)
- PostgreSQL
- npm (Node Package Manager)

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/NORASIL-images.git
cd NORASIL-images# NORASIL-images
```

### 2. Install Dependencies

``npm install``

### 3. Configure Environment Variables

Create a ``.env`` file in the root directory and add the following environment variables:

```
DATABASE_URL=your_postgresql_connection_string
PORT=8080
```

### 4. Set Up the Database

Ensure your PostgreSQL database is running and accessible. The ``DATABASE_URL`` should point to your PostgreSQL instance.

### 5. Run the Application

```npm start```

## API Endpoints

### 1. Upload Image

- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**: 
  - `image`: The image file to upload.

**Example Request**:

```sh
curl -X POST http://localhost:8080/api/upload -F "image=@/path/to/your/image.jpg"
```

{
  "id": 1,
  "filename": "image.jpg",
  "path": "/uploads/image.jpg",
  "createdAt": "2023-10-01T00:00:00.000Z"
}

### Get All Images

- **URL**: `/api/images`
- **Method**: `GET`

**Response**:

```json
[
  {
    "id": 1,
    "filename": "image.jpg",
    "path": "/uploads/image.jpg",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
]
```

### Get Image by ID

- **URL**: `/api/images/:id`
- **Method**: `GET`

**Example Response**:

```json
{
  "id": 1,
  "filename": "image.jpg",
  "path": "/uploads/image.jpg",
  "createdAt": "2023-10-01T00:00:00.000Z"
}
```

### Serve Image File

- **URL**: `/api/images/:id/file`
- **Method**: `GET`

**Example Request**:

```sh
curl -X GET http://localhost:8080/api/images/1/file
```

The image file will be served directly.

## Error Handling

The API uses a global error handler to catch and respond to errors. Common error responses include:

- **400 Bad Request**: Missing or invalid parameters.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: An unexpected error occurred.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.