const express = require('express');

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Rahul", branch: "CSE" },
    { id: 2, name: "Aman", branch: "IT" },
    { id: 3, name: "Rohit", branch: "ECE" }
];

// Check API status
app.get('/', (req, res) => {
    res.send('API is running');
});

// GET all students
app.get('/students', (req, res) => {
    res.json(students);
});

// PUT update student
app.put('/students/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.branch = req.body.branch;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// Start server
app.listen(3005, () => {
    console.log("Server running on port 3005");
});