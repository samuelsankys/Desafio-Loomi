const Sequelize = require('sequelize')
const dbConfig = require('../Config/database');
const sequelize = new Sequelize(dbConfig);
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op;

const Client = require('../Models/Client');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const OrderProduct = require('../Models/OrderProduct');



module.exports = {
    async index(req, res){
        const  {status, dateYear, priceTo, client}  = req.query;
        const filter =  {where: {} }
        const filtercCli =  {where: {} }


        if(status){
            filter.where = {
                    status: {
                        [Op.like]: `%${status}%`,
                    },
                }
        }
        if(dateYear){
            dateYear
            filter.where = {
                    data_do_pedido: {
                        [Op.between]: [`${dateYear}` , `${parseInt(dateYear)+1}`],
                    },
                }
        }
        if(client){
            filtercCli.where = {
                nome: {
                    [Op.like]: `%${client}%`,
                }
            }
        }

        try {
    
            const orders = await Order.findAll({ 
                where: filter.where,
                attributes: {exclude: ['createdAt', 'updatedAt', 'client_id']},
                include: {
                    association: 'client',
                    attributes: {exclude: ['createdAt', 'updatedAt', 'user_id']},
                    where: filtercCli.where,
                },
            });

            if(!orders){
                return res.status(400).json({ message: 'Orders not found' });
            }
            
            return res.status(200).json({ orders });
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: 'Search failed'});
        }
       
    },

    async orderDetail(req, res){
        const { order_id } = await req.params;
        
        try {
            const order = await Order.findByPk(order_id, {
                include: { association: 'client'}
            });
            if( !order ){
                return res.status(400).json({error: 'Order not found'});
            }
            
            return res.status(200).json({ order });
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: 'Search failed'});
        }
    },

    async updateOrder(req, res){
        const { order_id } = req.params
        const { status } = req.body;

        try {
            
            const order = await Order.findByPk(order_id);

            if( !order ){
                return res.status(400).json({error: 'Order not found'});
            }
            
            if(status){
                order.status = status;
            }

            const orderUp = await order.save();

            if( !orderUp ){
                return res.status(400).json({error: 'Update order failed'});
            }
            
            return res.status(200).json({message: 'Update order Successfully'});

        } catch (error) {
            console.log(error);
            return res.status(400).json({error: 'Update client failed'});
        }

       
    },

    async store(req, res){
        const { client_id } = req.params;
        const { list } = req.body;
        
        try {
            const client = await Client.findOne({ where: { id: client_id }});
          
            if( !client ){
                return res.status(400).json({error: 'Client not found'});
            }
            
            const produtosIds = list.map(e => e.produto);
            const produtos = await Product.findAll({
                where:{
                    id : produtosIds
                }
            });
            if( !produtos.length ){
                return res.status(400).json({error: 'Products not found'});
            }

            let prod = produtos.map((e, i) => {
                for(e2 of list){
                    console.log('e2', e2);
                    if(e2.produto == e.id){
                        return {
                            produto : e.id,
                            quantidade : e2.quantidade
                        }
                    }
                }
            }); 

            let order = await Order.create({ 
                client_id,
                status: 'Aguardando Pagamento',
                data_do_pedido : new Date(),
            })

            if( !order ){
                return res.status(400).json({error: 'Create order failed'});
            }
          
            let insert = []

            produtos.forEach((e, i)=>{
                insert.push(sequelize.query(
                    `INSERT INTO "orders_products" 
                    ("product_id","order_id", "preco_produto", "quantidade", "created_at", "updated_at" ) 
                    VALUES (?,?,?,?,?,?);`,
                        {
                            replacements: [
                                e.id, 
                                order.id, 
                                e.preco,
                                prod[i].quantidade,
                                new Date(), 
                                new Date()
                            ],
                            type: QueryTypes.INSERT,
                        }
                    )
                )
            })

            return Promise.all(insert)
            .then(() => {
                return sequelize.query(
                    `SELECT * FROM products p 
                    JOIN orders_products op ON op.product_id = p.id
                    WHERE op.order_id = ? `,
                    {
                        replacements: [order.id ],
                        type: QueryTypes.SELECT,
                    }
                );
            })
            .then(produtos => {
                order = JSON.parse(JSON.stringify(order))
                order.product = produtos
                return res.status(200).json({order})
            })

            
        } catch (error) {
            return res.status(400).json({error: 'Create order failed'});
        }  


    },
    async delete(req, res){
        const { order_id } = req.params

       try {

            const order = await Order.findByPk(order_id);

            if( !order ){
                return res.status(400).json({error: 'Order not found'});
            }
            const orderDel = await Order.destroy({where: {id: order_id}})

            if(!orderDel){
                return res.status(400).json({error: 'Deleted order failed'});
            }

            return res.status(200).json({message: 'Order deleted successfully'});

       } catch (error) {
            return res.status(400).json({error: 'Deleted order failed'});
       }

    }
    

}
