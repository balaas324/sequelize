module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.DATEONLY,
        }
    })

    return User;
}