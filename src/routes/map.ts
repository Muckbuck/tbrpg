namespace Routes {

    const CAMap = require('../MapGeneration/CAMap');

    const map =  function(req:any, res:any, next:any) {
        const camap = new CAMap(100,100);
        const map = camap.generateMapLayout();
        res.json({map});
    }

    module.exports = map;
}