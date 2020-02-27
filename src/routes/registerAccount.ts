namespace Routes {
    const User = require('../controllers/user');

    const registerAccount =  function(req:any, res:any, next:any) {
        let newUser = new User(req.body.username, req.body.password);
        newUser.registerUser();
        if(newUser) res.send('registered');
        
    }

    module.exports = registerAccount;
}