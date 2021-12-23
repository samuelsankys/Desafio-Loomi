const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(connection){
        super.init({
            rua: DataTypes.STRING,
            numero: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            estado: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client'});
    }
}
 
module.exports = Address;
