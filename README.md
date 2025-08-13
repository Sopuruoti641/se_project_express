# PROBLEM

I am unable to use my domain when pasted into the web browser "wtwr-web.home.kg".
When I am in the dev tools is give me an error with the following " https://api.wtwr-web.home.kg/items' from origin 'https://wtwr-web.home.kg' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:3000' that is not equal to the supplied origin. Have the server send the header with a valid value. "

# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Features

- Error handling with status code
- Modular routing and controllers
- Validating data with Mongoose and Validator
- 404 route handling for unknown paths

## Tachnologies and Techniques Used

- Node.js and Express.js - for creating the server and APIs
- MongoDB and Mongoose - for database and object modeling
- Validator.js - for input validation
- Nodeman - for live reloading during development
- Modular code structures - using separate folders for routes, controllers, models, and constants

## Running the Project

```bash
`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
```
