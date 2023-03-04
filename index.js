require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT_NO;


const db = require("./config/dbconfig");
// const verifyUser = require("./middleware/verifyUser.js");

// app.use(verifyUser.isStudent());

app.use('/admin', (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if (req.headers.authorization === 'admin') {
        next();
    } else {
        return res.status(401).json({ error: 'Cannot access this route!' })
    }
});
app.route('/admin/faculty').post(db.createFaculty);
app.route('/admin/slot').post(db.createSlot);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});
