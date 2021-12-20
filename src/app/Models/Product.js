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

    static associate(models){
        this.belongsToMany(models.Order, { foreignKey: 'product_id', through: 'orders_products', as: 'orders'})
        //this.hasMany(models.OrderProduct);
    }

}

module.exports = Product;