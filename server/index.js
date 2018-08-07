var mysql = require('mysql');
var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var exec = require("child_process").exec;

server.listen(3000, function() {
    console.log(__dirname);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index2.html');
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dhdlstj123',
    port: 3306,
    database: 'knock_knock'
});

connection.connect();

connection.query('SELECT * from class_info', function(err, rows, fields) {
    if(!err) 
        console.log('The Solution is : ', rows);
    else
        console.log('Error while performing Query', err);
});


io.on('connection', function(socket) {
    socket.on('lateClass', function(data) {
        connection.query('INSERT INTO exception (date, student_key, time, reason) VALUES (' + data.date + ',' + data.student_key + ',' + data.time + ',' + data.reason + ')', function(err, rows, fields) {
            if(!err)
                console.log('successed late part');
            else
                console.log('failed late part');
        });
    });
    socket.on('register', function(data) {
        connection.query('INSERT INTO student_info (student_name, student_mac, student_class, student_grade, student_num) VALUES (' + data.student_name + ',' + data.student_mac + ',' + data.student_class + ',' + data.student_grade + ',' + data.student_num + ')', function(err, rows, fields) {
            if(!err)
                console.log('successed register');
            else
                console.log('failed register');
        })
    })
});









connection.end();