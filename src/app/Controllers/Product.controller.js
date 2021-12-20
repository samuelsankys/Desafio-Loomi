const Product = require('../Models/Product');


module.exports = {
    async index(req, res){
        const products = await Product.findAll();

        return res.json(products);
    },
    async store(req, res){
        const { nome, preco, codigo, caracteristicas, imagem } = req.body;

        try {
            const product = await Product.create({ 
                nome, 
                preco,
                codigo,
                caracteristicas,
                imagem,  
            });

            return res.json(product);
        } catch (error) {
            console.log(error);
        }
    }
}