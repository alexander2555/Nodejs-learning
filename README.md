# Result University Backend Course - _Note App_

## Basics

1. Install Node and setup the project
2. Add base console commands (add, list)
3. Add file storage (db.json) with read/write operations
4. [task] Add Remove operation (remove)

## Web-server

1. Implement web-server with express package
2. Add GET|POST|DELETE endpoints
3. Add static front-end
4. [Task] Add PUT endpoint (edit operation implement)

## Database

1. Install MongoDB and mongoose package
2. Replace file storage with MongoDB

---

<p align="right"><b>branch</b>&nbsp;<u>Task-5-1-Quiz</u></p>

## _Quiz Application_

### 1. Clone the repository

```sh
git clone https://github.com/alexander2555/Nodejs-learning
cd Nodejs-learning-project
```

### 2. Install dependencies

```sh
npm install
cd frontend
npm install
cd ..
```

### 3. Configure MongoDB connection

Check the MongoDB connection string in `index.js` or set it via environment variables.

### 4. Run the app

**Start backend:**

```sh
npm start
```

or

```sh
node index.js
```

**Start frontend (in a new terminal):**

```sh
cd frontend
npm run dev
```

### 5. Open in browser

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:5173](http://localhost:5173)

### 6. API Endpoints

`GET /api/questions` - Retrieve all questions.
`GET /api/questions/:id` - Retrieve one question.
`POST /api/questions` - Add a new question.
`PUT /api/questions/:id` - Update an existing question.
`DELETE /api/questions/:id` - Delete a question.

### 7. Frontend Features

- View all quiz questions.
- Add, edit, and delete quiz questions.
- Take the quiz and view results.

### 8. Technologies Used

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite

### 9. Notes

- Ensure MongoDB is running locally or update the connection string to point to a remote database.
