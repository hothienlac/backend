const util = require('util');

const a = (x) => {
    x('abc');
}

ax = util.promisify(a);


q = () => {
    ax().then((x) => {console.log('sda',x)}).catch((e) => {
        console.log('aaa',e)
        return;
    });
    console.log('x');
    return;
}

q()