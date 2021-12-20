const User = require('../Models/User');

module.exports = {
    async index(req, res){
        const { email, senha } = req.body;
        try {
            const user = await User.findAll();
            
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
       
    },

    async store(req, res){
        const { email, senha } = req.body;
        try {
            const user = await User.create({ email, senha });
            
            return res.json(user);
        } catch (error) {
            console.log(error);
        }
       
    }
}