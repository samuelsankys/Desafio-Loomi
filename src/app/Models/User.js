const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection){
        super.init({
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }
}

module.exports = User;