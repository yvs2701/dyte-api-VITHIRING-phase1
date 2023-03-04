const Sequelize = require('sequelize');
const sequelize = require('../config/configDB');

const Slot = sequelize.define('slots', {
    id: {
        field: "id",
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    startTime: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIN:[['MON', 'TUE', 'WED', 'THU', 'FRI']]
        }
    },
    startTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    endTime: {
        type: Sequelize.TIME,
        allowNull: false,
    }
}, {
    timestamps: false
});

const Faculty = sequelize.define('faculty', {
    id: {
        field: "id",
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        field: "name",
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

const Course = sequelize.define('course', {
    id: {
        field: "id",
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        field: "name",
        type: Sequelize.STRING,
        allowNull: false
    },
    course_type: {
        field: "course_type",
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIN: [['THEORY', 'LAB']]
        }
    },
}, {
    timestamps: false
});

const Student = sequelize.define('student', {
    id: {
        field: "id",
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name : {
        field: "name",
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

Course.hasMany(Faculty);
Course.hasMany(Slot);
Student.hasMany(Course);

(async () => {
    await sequelize.sync({ force: false, alter: true });
})();

module.exports = { Slot, Faculty, Course, Student };
