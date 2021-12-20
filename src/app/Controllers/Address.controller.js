const User = require('../Models/User');
const Address = require('../Models/Address');
const Client = require('../Models/Client');

module.exports = {
    async index(req, res){
        const { user_id } = req.params;
        try {
            const user = await User.findByPk(user_id, {
                include: { association: 'client'}
            }); 
            if( !user ){
                return res.status(400).json({error: 'User not found'});
            }

            const client = await Client.findByPk(user.client.id, {
                include: { association: 'address'}
            }); 

            return res.json(client);
        } catch (error) {
            console.log(error);
        }
    },

    async store(req, res){
        const { user_id } = req.params;
        const { rua, numero, bairro, cidade, estado } = req.body;

        const user = await User.findByPk(user_id,
            {
                include: { association: 'client'}
            });
            
        if( !user ){
            return res.status(400).json({error: 'User not found'});
        }
        let client_id = user.client.id;
        
        try {
            const address = await Address.create({ 
                client_id,
                rua,
                numero,
                bairro,
                cidade, 
                estado,
            });
            
            return res.json(address);
        } catch (error) {
            console.log(error);
        }  
    }

}
