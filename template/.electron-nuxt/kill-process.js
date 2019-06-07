const psTree = require('ps-tree');


function killProcess(pid, warningOut = console.warn){
    try{
        process.kill(pid);
    }catch (e) {
        if(e.code !== 'ESRCH') warningOut(e);
    }
}

function killWithAllSubProcess(pid, warningOut = console.warn){
    return new Promise((resolve, reject) => {
        psTree(pid, (err, children) =>  {
            if(err) reject(err);
            children.forEach(p => {
                killProcess(p.PID, warningOut)
            });
            killProcess(pid);
            resolve();
        });
    });
}


module.exports = {
    killProcess,
    killWithAllSubProcess
};