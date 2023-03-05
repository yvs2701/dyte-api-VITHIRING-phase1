const { Slot, Faculty, Course, Student, Timing } = require('../models/models');

const createFaculty = async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;

        const faculty = await Faculty.create({ id: id, name: name });

        res.status(200).json({ success: true, data: faculty.toJSON() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: {}, error: "Some error occured!" });
    }
}

const createSlot = async (req, res) => {
    try {
        const id = req.body.id;
        const timings = req.body.timings;

        const slot = await Slot.create({
            id: id,
            timings: timings
        }, {
            include: [Timing]
        });

        res.status(200).json({ success: true, data: slot });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: {}, error: "Some error occured!" });
    }
}

const createCourse = async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const course_type = req.body.course_type;

        const course = Course.build({ id: id, name: name, course_type: course_type });

        const faculties = req.body.faculty_ids;
        const slots = req.body.slot_ids;

        await course.save();

        await course.setFaculties(faculties);
        await course.setSlots(slots);

        let data = await Course.findByPk(course.id, {
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

        // renaming slots to allowed_slots
        data = data.dataValues;
        data.allowed_slots = data.slots;
        delete data.slots;

        res.status(200).json({ success: true, data: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: {}, error: "Some error occured!" });
    }
}

const createStudent = async (req, res) => {
    try {
        const [student, created] = await Student.findOrCreate({ where: { id: "student" }, defaults: { name: "John Doe" } });
        res.status(created ? 201 : 200).json({ success: true, data: student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: {}, error: "Some error occured!" });
    }
}

module.exports = { createFaculty, createSlot, createCourse, createStudent };
