const { Model, DataTypes } = require('sequelize');

class Client extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
        this.hasOne(models.Address, { foreignKey: 'client_id', as: 'address'});
    }
}
 
module.exports = Client;
