require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT_NO;

const admin = require('./controllers/adminControllers');
const student = require('./controllers/studentControllers');

const verifyStudent = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if (req.headers.authorization === 'student') {
        next();
    } else {
        return res.status(401).json({ error: 'Cannot access this route!' })
    }
}

app.route('/faculty/:id').get(student.getFaculty);
app.route('/course/:id').get(student.getCourse);

app.route('/register').post(verifyStudent, student.registerCourse);
app.route('/timetable').get(verifyStudent, student.timetable);

app.use('/admin', (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if (req.headers.authorization === 'admin') {
        next();
    } else {
        return res.status(401).json({ error: 'Cannot access this route!' })
    }
});

app.route('/admin/faculty').post(admin.createFaculty);
app.route('/admin/slot').post(admin.createSlot);
app.route('/admin/course').post(admin.createCourse);
app.route('/admin/student').post(admin.createStudent);


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});
