const accepted_list = 
[{label: 'dien', start: new Date(2020, 4, 28, 19, 30, 0), end: new Date(2020, 4, 28, 20, 30, 0)},
{label: 'lac', start: new Date(2020, 4, 28, 20, 30, 0), end: new Date(2020, 4, 28, 21, 0, 0)}]


function GoOut(connection, callback, label, current_time) {
    connection.query("SELECT * FROM rule", (err,rows) => {
        if(err) throw err;
      
        var rules = rows;
        const message = 'abc';
        const accepted = check(rules, accepted_list, label, current_time)
        const result = {accepted, message};
        
        console.log(result);
        callback(null, result)
    });
}

function check(rules, accepted_list, label, current_time){
    for (var rule of rules){
        var temp_start = new Date(current_time.getFullYear(), current_time.getMonth(), current_time.getDate(),
            rule.h_start, rule.m_start);
        var temp_end = new Date(current_time.getFullYear(), current_time.getMonth(), current_time.getDate(),
            rule.h_end, rule.m_end);

        if(current_time > temp_start & current_time < temp_end){
            return true
        }
    }
    for (var x of accepted_list){
        if(current_time > x.start & current_time < x.end){
            return true
        }
    }
    return false
}

module.exports = GoOut;