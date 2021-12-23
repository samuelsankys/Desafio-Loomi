const { Model, DataTypes } = require('sequelize');

class OrderProduct extends Model {
    static init(connection){
        super.init({
            preco_produto: DataTypes.DECIMAL,
            quantidade: DataTypes.DECIMAL,
        },
        {
            sequelize: connection
        })
    }
}

module.exports = OrderProduct;
