namespace controllers{
    const userModel = require('../models/user');

    class User{
        username: string;
        password: string;

        constructor(username: string, password: string){
            this.username = username;
            this.password = password;
        }

        registerUser(){
            let newUser = new userModel();
            
            newUser.username = this.username;
            newUser.password = this.password;

            newUser.save().then((doc: any) => {
                return true;
            })
            .catch((err: any) => {
                console.error(err)
            })
        }
    }

    module.exports = User;
}