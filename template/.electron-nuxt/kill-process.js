module.exports = {
    kill(pid, warningOut){
        try{
            process.kill(pid);
        }catch (e) {
            if(warningOut) warningOut(e);
            else console.warn(e);
        }
    }
};