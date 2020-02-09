namespace Routes {
    const express = require('express');
    let router = express.Router()


    router.get('/', function (req: any, res: any) {
        res.render('index', {'name': 'Eric Rosenborg'});
    })

    module.exports = router;

}