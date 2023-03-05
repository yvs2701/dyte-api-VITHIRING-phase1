const { Slot, Faculty, Course, Student, Timing } = require('../models/models');

const getFaculty = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await Faculty.findByPk(id, { raw: true });

        if (doc === null)
            res.status(404).json({ success: false, data: {}, error: "Not found!" });
        else
            res.status(200).json({ success: true, data: doc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: {}, error: "Some error occured!" });
    }
}

const getCourse = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Course.findByPk(id, {
            include: [
                {
                    model: Faculty,
                    attributes: ["id", "name"],
                    through: { attributes: [] }, // exclude junction table
                },
                {
                    model: Slot,
                    attributes: ["id"],
                    include: {
                        model: Timing,
                        attributes: ["day", "start", "end"],
                    },
                    through: { attributes: [] }, // exclude junction table
                }
            ],
        });

        if (data === null)
            res.status(404).json({ success: false, data: {}, error: "Not found!" });
        else {
            // renaming slots to allowed_slots
            data = data.dataValues;
            data.allowed_slots = data.slots;
            delete data.slots;
            res.status(200).json({ success: true, data: data });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: {}, error: "Some error occured!" });
    }
}

const registerCourse = async (req, res) => {
    const { course_id, faculty_id, slot_ids } = req.body;

    const course = await Course.findByPk(course_id, {
        include: [
            {
                model: Faculty,
                attributes: ["id"],
                through: { attributes: [] }, // exclude junction table
            },
            {
                model: Slot,
                attributes: ["id"],
                through: { attributes: [] }, // exclude junction table
            }
        ],
    });

    if (course === null)
        res.status(404).json({ success: false, data: {}, error: "Not found!" });
    else if (course.hasFaculties(faculty_id) && course.hasSlots(slot_ids)) {
        const student_id = req.headers.authorization;
        const student = await Student.findByPk(student_id);

        if (student.hasSlots(slot_ids))
            res.status(400).json({ success: false, data: {}, error: "Slot already taken!" });
        else {
            student.setCourses([course.id]);
            student.setSlots(slot_ids);

            const data = await Student.findByPk(student.id, {
                include: [
                    {
                        model: Course,
                        through: { attributes: [] }, // exclude junction table
                        include: [
                            {
                                model: Faculty,
                                attributes: ["id", "name"],
                                through: { attributes: [] }, // exclude junction table
                            },
                            {
                                model: Slot,
                                attributes: ["id"],
                                include: {
                                    model: Timing,
                                    attributes: ["day", "start", "end"],
                                },
                                through: { attributes: [] }, // exclude junction table
                            }
                        ],
                    },
                ]
            });

            res.status(200).json({ success: true, data: data });
        }
    } else {
        res.status(400).json({ success: false, data: {}, error: "Bad Request!" });
    }
}

const timetable = async (req, res) => {
    const id = req.headers.authorization;
    const student = await Student.findByPk(id, {
        include: [
            {
                model: Course,
                through: { attributes: [] }, // exclude junction table
                include: [
                    {
                        model: Faculty,
                        attributes: ["id", "name"],
                        through: { attributes: [] }, // exclude junction table
                    },
                    {
                        model: Slot,
                        attributes: ["id"],
                        include: {
                            model: Timing,
                            attributes: ["day", "start", "end"],
                        },
                        through: { attributes: [] }, // exclude junction table
                    }
                ],
            },
            {
                model: Slot,
                attributes: ["id"],
                include: {
                    model: Timing,
                    attributes: ["day", "start", "end"],
                },
                through: { attributes: [] }, // exclude junction table
            }
        ]
    });

    if (student === null)
        res.status(404).json({ success: false, data: {}, error: "Not found!" });
    else
        res.status(200).json({ success: true, data: student });
}

module.exports = { getFaculty, getCourse, registerCourse, timetable };
