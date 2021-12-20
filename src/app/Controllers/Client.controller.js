const User = require('../Models/User');
const Client = require('../Models/Client');

module.exports = {
    async index(req, res){
        const { user_id } = req.params;
        const { nome, email, telefone } = req.body;
        try {
            const user = await User.findByPk(user_id, {
                include: { association: 'client'}
            }); 
            if( !user ){
                return res.status(400).json({error: 'User not found'});
            }
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
    },



    async store(req, res){
        const { user_id } = req.params;
        const { nome, email, telefone } = req.body;

        const user = await User.findByPk(user_id);
            
        if( !user ){
            return res.status(400).json({error: 'User not found'});
        }

        try {
            const client = await Client.create({ 
                nome,
                user_id,
                email,
                telefone,
            });
            
            return res.json(client);
        } catch (error) {
            console.log(error);
        }
       
    }
}