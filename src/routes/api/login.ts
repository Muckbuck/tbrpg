namespace Routes {
    const User = require(rootPath + '/controllers/user');

    const login =  function(req:any, res:any, next:any) {
        let newUser = new User(req.body.username, req.body.password);
        newUser.registerUser();
        if(newUser) res.send('registered');
        
    }

    module.exports = login;
}