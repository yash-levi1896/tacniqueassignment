# tacniqueassignment

Task Management API
This is a RESTful API for managing tasks. Users can create, retrieve, update, and delete tasks. It also includes optional features like authentication and rate limiting.

## Table of Contents
- Getting Started
- Prerequisites
- Installation
- Usage
- Running the API
- Task structure
- Endpoints
- Authentication
- Error Handling
- Logging
- Rate Limiting

## Getting Started
Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js
- npm installed.


## Clone this repository:

- git clone https://github.com/yash-levi1896/tacniqueassignment.git <br/>
- cd tacniqueassignment
## Install dependencies:

npm install <br/>

Add a .env file and add below three varibales:-<br/>
MongoURL=your mongodb atlas url <br/>
PORT=your choice of port<br/>
secret_key=your secret key<br/>
- Running the APP: <br/>

npm run server <br/>

The API will be accessible at http://localhost:3000 by default.
## Task Structure
Each task should have the following properties:<br/>
ID<br/>
Title<br/>
Description<br/>
Creation Date<br/>
Status (e.g., pending, completed)

## Endpoints:

POST /tasks/      Add a new task.<br/>
GET /tasks/       Retrieve a list of all tasks.<br/>
GET /tasks/id     Retrieve a specific task by ID.<br/>
PUT /tasks/id     Update a specific task by ID.<br/>
DELETE /tasks/id  Delete a specific task by ID.<br/>

## Authentication Endpoints 
POST /register: Register a new user.<br/>
POST /login: Authenticate and log in a user.<br/>
## Authentication:
To use authentication, you must register and log in to manage tasks. Protected endpoints require authentication.

# API Endpoints

## User Authentication and Management

| Endpoint    | Method | Description                     | Request Body                                                         | Response                          |
|-------------|--------|---------------------------------|----------------------------------------------------------------------|------------------------------------|
| `/register` | POST   | Register a new user             | {"email": "example@example.com", "password": "password123" }` | `{ "msg": "User registered" }` |
| `/login`    | POST   | User login                     | `{ "email": "example@example.com", "password": "password123" }`       | `{ "msg": "sucessfull login" }`    

## Task Management

| Endpoint       | Method | Description                      | Request Body                                                                             | Response                              |
|-----------------|--------|----------------------------------|------------------------------------------------------------------------------------------|----------------------------------------|
| `/tasks`       | POST   | Add a new task                   | `{ "title": "Task Title", "description": "Task Description" }`       | `{ "message": "Task added" }` |
| `/tasks`       | GET    | Get all tasks                    | -                                                                                        | List of tasks                         |
| `/tasks/:id`   | GET    | Get a specific task by ID        | -                                                                                        | Task details                         |
| `/tasks/:id`   | PUT    | Update a specific task by ID     | `{ "title": "Updated Task Title", "description": "Updated Task Description", "status": "completed" }` | task updated!         |
| `/tasks/:id`   | DELETE | Delete a specific task by ID     | -                                                                                        | `{ "message": "task deleted!" }` |

---

## Error Handling
Appropriate HTTP status codes and error messages will be returned in case of errors.
## Logging 
API requests and responses can be logged in a acess.log file.
## Rate Limiting 
Rate limiting  applied to restrict the number of requests from clients within a specified time period.
<h1 align="center">✨Thank You✨</h1>