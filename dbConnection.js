var pg = require("pg");
var generic_pool = require("generic-pool");
require("pg-parse-float")(pg);
var express = require("express");
var dbconnection = express();
dbconnection.connectionpool = null;
var MAX_POOL_SIZE = 50;
var MIN_POOL_SIZE = 2;
var events = require("events");
var eventEmitter = (dbconnection.eventEmitter = new events.EventEmitter());
const {
  development: {username, password, host, port, database}
} = require("./config/config.json");
//console.log(eventEmitter);
var pgConString = `postgres://${username}:${password}@${host}:${port}/${database}`;

var asyncPushNotifConnection = new pg.Client(pgConString);
asyncPushNotifConnection.connect(async function (err, client) {
  if (err) {
  } else {
    client.on("notification", function (msg) {
      try {
        //console.log(eventEmitter);
        eventEmitter.emit("message", msg);
        //console.log("After listen");
      } catch (e) {
        console.log(e);
      }
    });
    await client.query('LISTEN "messageAddedToDBEvent"', function (
      err,
      result
    ) {});
    await client.query('LISTEN "textAddedToDBEvent"', function (
      err,
      result
    ) {});
  }
});

var pool = generic_pool.Pool({
  name: "postgres",
  min: MIN_POOL_SIZE,
  max: MAX_POOL_SIZE,
  idleTimeoutMillis: 60 * 10000,
  log: false,
  refreshIdle: true,
  create: function (callback) {
    var c = new pg.Client(pgConString);
    c.connect(function (err, client) {
      if (err) {
        console.log("Error in connecting to the database: " + err);
        callback(err, client);
      } else {
        client.query("Set search_path = unit-test-demo", function (err, result) {
          if (err)
            console.log("Error setting the connection search path: " + err);
          callback(err, client);
        });
      }
    });
  },
  destroy: function (client) {
    if (client) client.end();
  }
});

dbconnection.createConnection = function (callback) {
  pool.acquire(function (err, connection) {
    if (err) console.log("Error in acquiring connection");
    callback(err, connection);
  });
};

dbconnection.closeConnection = function (connection) {
  if (connection !== null) pool.release(connection);
};

dbconnection.end = function () {
  if (pool !== null)
    pool.drain(function () {
      pool.destroyAllNow();
    });
};

module.exports = dbconnection;
