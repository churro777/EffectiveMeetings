// create event
function createEvent(req, res){
    const pool = require('../pool.js');

    console.log(req.body);

    var query = 'INSERT INTO event (eventDate, startTime, eventName) ' +
                'VALUES ($1, $2, $3);';
    var eventDate = req.body.eventDate;
    var startTime = req.body.startTime;
    var eventTitle = req.body.eventTitle;
    pool.query(query, [eventDate, startTime, eventTitle], function(err, res2) {
        if (err) {
            console.log(err.stack)
        } else {
            if (res2.rowCount == 1) {
                res.statusCode = 201;
                res.end('Created event');
            }
        }
    })
}

// edit event
function updateEvent(req, res){

}

// get all events
function getEvents(req, res){

}

module.exports = {
    createEvent: createEvent,
    updateEvent: updateEvent,
    getEvents: getEvents
};
