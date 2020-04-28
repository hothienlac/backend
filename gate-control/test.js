// const mysql = require('mysql');

// var data;

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'dorm_database'
// });


// connection.query("SELECT * FROM rule WHERE label = 'all' or label = ?", ['dien'], (err, rows) => {
//     if (err) throw err;

//     console.log('Data received from Db:');
//     data = rows;

//     // console.log(typeof rows[0]);
//     // console.log(rows[0].start);
//     console.log(rows);

//     console.log(check(rows, 20));
// });

// function check(rule_list, current_time){
//     for (var rule of rule_list){
//         console.log(rule.start);
//         if(current_time > rule.start & current_time < rule.end){
//             return true
//         }
//     }
//     return false
// }

const accepted_list = [{label: 'dien', start: 1},
{label: 'lac', start: 2},
{label: 'khoi', start: 3}]

console.log(accepted_list)


date1 = new Date(2019, 5, 11, 5, 23, 59)
console.log(date1)


// current timestamp in milliseconds
let ts = Date.now();

let now_date_ob = new Date(ts);
let date_ob = new Date(2020, 4, 28, 23);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hour = date_ob.getHours();
let minute = date_ob.getMinutes();

// prints date & time in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);
console.log(hour + ':' + minute);
console.log(date_ob > now_date_ob);

var datetime = now_date_ob.toLocaleString();
console.log(datetime);
console.log(typeof (date_ob - now_date_ob));