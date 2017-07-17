// add item to agenda
function addAgendaItem(req, res){
    const pool = require('../pool.js');
    
    console.log(req.query)
    
    var query = 'INSERT INTO agenda (note_id, item) ' +
                'VALUES ((SELECT id FROM note WHERE id = $1), $2);';
    var note_id = req.query.id;
    var item = req.query.item;
    pool.query(query, [note_id, item], function(err, res2) {
        console.log(err);
        if (err) {
            console.log("error creating note");
            console.log(err.stack)
        } else {
            if (res2.rowCount == 1) {
                console.log("created an agenda item");
                res.statusCode = 201;
                res.end('Created agenda item');
            }
        }
    })
}

// get items from agenda
function getAgendaItems(req, res){
    const pool = require('../pool.js');

    var query = 'SELECT * FROM agenda WHERE note_id = $1';
    var note_id = req.query.id;
    pool.query(query, [note_id], function(err, res2) {
        if (err) {
            console.log(err.stack)
        } else {
            res.statusCode = 200;
            res.json(res2.rows)
        }
    })
}


module.exports = {
    addAgendaItem: addAgendaItem,
    getAgendaItems: getAgendaItems
};
