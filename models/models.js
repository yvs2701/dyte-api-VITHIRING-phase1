const Sequelize = require('sequelize');
const sequelize = require('../config/configDB');

const Timing = sequelize.define('timing', {
    _id: {
        field: "_id",
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [['MON', 'TUE', 'WED', 'THU', 'FRI']]
        }
    },
    start: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    end: {
        type: Sequelize.TIME,
        allowNull: false,
    }
}, {
    timestamps: false
});

const Slot = sequelize.define('slots', {
    id: {
        field: "id",
        type: Sequelize.STRING,
        primaryKey: true,
    },
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
            isIn: [['THEORY', 'LAB']]
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
    name: {
        field: "name",
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});
Slot.hasMany(Timing);
Timing.belongsTo(Slot);
Course.belongsToMany(Faculty, { through: "Course_Faculty" });
Faculty.belongsToMany(Course, { through: "Course_Faculty" });
Course.belongsToMany(Slot, { through: "Course_Slot" });
Slot.belongsToMany(Course, { through: "Course_Slot" });
Student.belongsToMany(Course, { through: "Student_Course" });
Course.belongsToMany(Student, { through: "Student_Course" });

(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports = { Slot, Faculty, Course, Student, Timing };
