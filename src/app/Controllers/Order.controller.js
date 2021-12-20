const User = require('../Models/User');
const Product = require('../Models/Product');
const Order = require('../Models/Order');

module.exports = {
    async index(req, res){
 
    },

    async store(req, res){
        const { user_id } = req.params;
        const { listProduct } = req.body;

        const user = await User.findByPk(user_id,
            {
                include: { association: 'client'}
            });
            
        if( !user ){
            return res.status(400).json({error: 'User not found'});
        }
        let client_id = user.client.id;
    
        try {
            const product = await Product.findByPk(listProduct);
            const order = await Order.create({ 
                client_id,
                status: 'Aguardando Pagamento',
                data_do_pedido : new Date(),
            })
                
            const c = await order.addProduct(product, { through: { preco_produto: product.preco } })


            // listProduct.forEach(async element => {
            //     const product = await Product.findByPk(element);
                    
            //     order.addProduct(product, { through: { preco_produto: 10.00 } });
            // });
            const result = await Order.findOne({
                where: { client_id },
                include: { model: Product, as: "orders" },
            })
            
            return res.json(result);
        } catch (error) {
            
            console.log(error);
          
        }  


    }

}
