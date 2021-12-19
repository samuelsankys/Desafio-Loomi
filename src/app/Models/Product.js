const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            preco: DataTypes.DECIMAL,
            codigo: DataTypes.STRING,
            caracteristicas: DataTypes.STRING,
            imagem: DataTypes.STRING,
        },
        {
            sequelize: connection
        })
    }

}

module.exports = Product;