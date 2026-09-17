# Node.js/Express Application with PostgreSQL Connection Pooling

This is a Node.js and Express application that demonstrates how to connect to a PostgreSQL database using connection pooling. The application provides two routes for querying user data, one using a direct connection and the other using a connection pool. It also includes monitoring for the connection pool.

## Features

- **Hello World Route**: A simple route that returns a greeting message.
- **Without Pool Connection**: A route that creates a new PostgreSQL client for each request, demonstrating the overhead of not using a connection pool.
- **With Pool Connection**: A route that utilizes a connection pool to handle database queries more efficiently.
- **Pool Statistics**: A route that provides statistics about the connection pool, including total connections, idle connections, and waiting connections.
- **Graceful Shutdown**: The application handles termination signals to close the server and database connections gracefully.

## Prerequisites

- Node.js (version 14 or higher)
- Docker and Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of the project directory and add the following environment variables:

```plaintext
PGHOST=localhost
PGPORT=5432
PGDATABASE=yourdatabase
PGUSER=yourusername
PGPASSWORD=yourpassword
PORT=3000
```

Replace `yourdatabase`, `yourusername`, and `yourpassword` with the values you will use for your PostgreSQL database.

### 3. Start PostgreSQL with Docker

Run the following command to start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

This command will start a PostgreSQL container with the specified environment variables.

### 4. Install Dependencies

Navigate to the project directory and install the required Node.js dependencies:

```bash
npm install
```

### 5. Start the Application

Run the application using the following command:

```bash
node src/server.js
```

The server will start on the specified port (default is 3000).

### 6. Access the Application

You can access the application using the following routes:

- **Hello World**: [http://localhost:3000/](http://localhost:3000/)
- **Without Pool Connection**: [http://localhost:3000/without-pool](http://localhost:3000/without-pool)
- **With Pool Connection**: [http://localhost:3000/with-pool](http://localhost:3000/with-pool)
- **Pool Statistics**: [http://localhost:3000/pool-stats](http://localhost:3000/pool-stats)

### 7. Stopping the Application

To stop the application, press `Ctrl + C` in the terminal where the server is running. To stop the PostgreSQL container, run:

```bash
docker-compose down
```

### 8. Graceful Shutdown

The application is designed to handle termination signals (SIGTERM) gracefully, ensuring that all database connections are closed properly before exiting.

## Conclusion

This application serves as a basic example of how to implement connection pooling with PostgreSQL in a Node.js/Express application. You can extend it further by adding more features, routes, and error handling as needed.
