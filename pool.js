// connection to the database
const pg = require('pg');


var config = {
    user: 'tony',
    host: 'localhost',
    database: 'test',
    password: 'super3005',

    // host: 'ec2-107-20-226-93.compute-1.amazonaws.com',
    // database: 'd53jbk6vf5dg1g',
    // User: 'nuqewjsmmzkatz',
    // Port: '5432',
    // Password: 'cf19ac012c68e7b1cf60534e71399e289d866e386ed7b34c560b96492c17250d',

    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(config);

pool.on('error', function(err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack);
});


//export the query method for passing queries to the pool
module.exports.query = function(text, values, callback) {
    console.log('query:', text, values);
    return pool.query(text, values, callback);
};

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = function(callback) {
    return pool.connect(callback);
};



// const client = new Client();
//
// client.connect();
