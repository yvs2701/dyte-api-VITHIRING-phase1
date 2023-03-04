const sequelize = require('../config/configDB');
const { Slot, Faculty, Course, Student } = require('../models/models');


const getFaculty = async (req, res) => {
    const id = req.params.id;
    const doc = await Faculty.findByPk(id);

    if (doc === null)
        res.status(404).json({ success: false, data: {} });
    else
        res.status(200).json({ success: true, data: doc });
}

const createFaculty = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    const faculty = Faculty.build({ id: id, name: name });
    await faculty.save();

    res.status(200).json({ success: true, data: faculty });
}

const createSlot = (req, res) => {

}


module.exports = { getFaculty, createFaculty, createSlot };
