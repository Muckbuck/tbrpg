namespace Routes {

    const CAMap = require('../MapGeneration/CAMap');

    const map =  function(req:any, res:any, next:any) {
        const camap = new CAMap(req.query.width, req.query.height);
        const map = camap.generateMapLayout();
        res.json({map});
    }

    module.exports = map;
}