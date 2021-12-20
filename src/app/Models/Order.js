const { Model, DataTypes } = require('sequelize');

class Order extends Model {
    static init(connection){
        super.init({
            data_do_pedido: DataTypes.DATE,
            status: DataTypes.STRING,
        },
        {
            sequelize: connection
        })
    }


    static associate(models){
        this.belongsToMany(models.Product, { foreignKey: 'order_id', through: 'orders_products', as: 'products'})
        this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client'});
    }

}

module.exports = Order;