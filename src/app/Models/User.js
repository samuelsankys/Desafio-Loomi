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

    static associate(models){
        this.hasOne(models.Client, { foreignKey: 'user_id', as: 'client' });
    }
}

module.exports = User;