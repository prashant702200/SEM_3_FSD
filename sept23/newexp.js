const express = require('express');

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Rahul", branch: "CSE" },
    { id: 2, name: "Aman", branch: "IT" }
];

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

app.listen(3005, () => {
    console.log("Server running at port 3005");
});