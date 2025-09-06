


// console.log("Hello from Node.js!");

// setTimeout(function() {
//     console.log("This is the second statement");
// }, 1000); // 1 second delay (timer is in milliseconds)

// console.log("This is the third statement");



// // Client-side (browser)
// document.getElementById('myButton').addEventListener('click', () => {
//     fetch('/api/data'); // Request to server
// });

// // Server-side (Node.js)
// app.get('/api/data', (req, res) => {
//     res.json({ message: 'Data from server' }); // Response to client
// });



// // A simple Node.js script
// console.log("Hello from Node.js!");

// // To run this:
// // 1. Save as app.js
// // 2. Open terminal in the same directory
// // 3. Type: node app.js





// // server.mjs
// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });

// // // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });



// // Conceptual API Endpoints
// GET /api/cars          // Get all cars
// GET /api/cars/123      // Get car with ID 123
// POST /api/cars         // Create a new car
// PUT /api/cars/123      // Update car with ID 123
// DELETE /api/cars/123   // Delete car with ID 123




// // File system operations in Node.js
// const fs = require('fs');

// // Asynchronously read a file
// fs.readFile('data.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error("Error reading file:", err);
//         return;
//     }
//     console.log("File content:", data);
// });

// // Asynchronously write to a file
// fs.writeFile('log.txt', 'Server started at ' + new Date().toISOString(), (err) => {
//     if (err) console.error("Error writing file:", err);
//     console.log("Log written.");
// });





