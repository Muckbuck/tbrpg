namespace Routes {
    const User = require('../controllers/user');

    const register =  function(req:any, res:any, next:any) {
        console.dir(__dirname);
        let newUser = new User(req.body.username, req.body.password);
        newUser.registerUser();
        if(newUser) res.send('registered');
        
    }

    module.exports = register;
}