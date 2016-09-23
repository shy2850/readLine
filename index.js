const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const reg = /read_line\(\)/;

module.exports = function (code) {

    var lines = code.match(/read_line\(\)/g) || [];
    
    rl.on('line', function (line) {
        if (lines.length) {
            code = code.replace(reg, '"' + line + '"');
            lines.pop();
        }
        if (!lines.length) {
            new Function(code.replace(/\bprint\(/g, 'console.log('))();
            process.exit(0);
        }
    });
};