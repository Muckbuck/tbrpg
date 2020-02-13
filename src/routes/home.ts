namespace Routes {
    const home =  function(req:any, res:any, next:any) {
        res.render('home', {layout: 'home', template: 'home-template'});
    }

    module.exports = home;
}