const sequelize = require('../config/configDB');
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

module.exports = { getFaculty, getCourse };
