const { exec } = require("child_process");

let mainArr ='cd testcases/user';
var lstBuild = new Array();
lstBuild.push('Login.js')
//lstBuild.push('MyAccount.js')
lstBuild.push('Search.js')

lstBuild.forEach(arg => {
    let newaray = mainArr + ` && mocha ${arg} --timeout 6000000 --parallel`;
    exec(newaray, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    //return arg
});

