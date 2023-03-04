const Pool = require('pg').Pool;

const pool = new Pool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// initialize tables
const initTables = () => {
    pool.query(
        `CREATE TABLE IF NOT EXISTS timings(
            id SERIAL,
            day TEXT NOT NULL,
            starttime TIME NOT NULL,
            endtime TIME NOT NULL
        );`,
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
    pool.query(
        `CREATE TABLE IF NOT EXISTS slots (
            id TEXT PRIMARY KEY NOT NULL,
            timings int[] NOT NULL
        );`,
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
    pool.query(
        `CREATE TABLE IF NOT EXISTS faculty (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL
        );`,
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
    pool.query(
        `CREATE TABLE IF NOT EXISTS course (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            f_id TEXT[] NOT NULL,
            course_type TEXT NOT NULL CHECK ( course_type in ('THEORY', 'LAB') ),
            allowed_slots TEXT[] NOT NULL
        );`,
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
    pool.query(
        `CREATE TABLE IF NOT EXISTS student (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        registered_courses TEXT[] NOT NULL
        );`,
        (err) => {
            if (err) {
                throw err;
            }
        }
    );
}

try {
    initTables();
} catch (err) {
    console.error(err);
}

// DB queries
const createFaculty = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    pool.query(
        `INSERT INTO faculty (id, name) VALUES ($1, $2);`,
        [id, name],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, data: {}, error: err });
            } else {
                res.status(200).json({
                    success: true, data: {
                        id: req.body.id,
                        name: req.body.name
                    }
                });
            }
        }
    );
}

const createSlot = (req, res) => {
    const id = req.body.id;
    const timings = req.body.timings;
    const tarray = [];

    timings.forEach(timing => {
        // create timings
        pool.query(
            `INSERT INTO timings (day, starttime, endtime) VALUES ($1, $2, $3) RETURNING id;`,
            [timing.day, timing.start, timing.end],
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, data: {}, error: err });
                } else {
                    console.log(results.rows);
                    tarray.push(results.rows[0].id);
                }
            }
        );

        // create slots
        pool.query(
            `INSERT INTO slots (id, timings) VALUES ($1, $2) RETURNING slots.id, slots.timings;`,
            [id, tarray],
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, data: {}, error: err });
                } else {
                    res.status(200).json({
                        success: true,
                        data: {
                            id: results.rows[0].id,
                            timings: results.rows[0].timings
                        }
                    });
                }
            }
        );
    });
}

const createCourse = (req, res) => {

}


module.exports = {
    createFaculty,
    createSlot,
};
