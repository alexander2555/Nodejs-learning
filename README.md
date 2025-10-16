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

## Login & Registration

1. Add User model
2. Add registration endpoint
3. Add login endpoint with JWT token generation
4. Protect notes endpoints with JWT token validation
5. [Task] Record Form

<p align="right"><b>branch</b>&nbsp;<u>Task-6-1-Records</u></p>

## _Records App_

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure MongoDB connection:**  
   Check the connection string in `index.js` or set it via environment variables.

3. **Run the backend server:**

   ```sh
   npm start
   ```

   or

   ```sh
   node index.js
   ```

4. **(If using frontend)**  
   Go to the `frontend` folder, install dependencies, and run:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

5. **Open in browser:**
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Frontend: [http://localhost:5173](http://localhost:5173)

> Requires [Node.js](https://nodejs.org/) and MongoDB access.
