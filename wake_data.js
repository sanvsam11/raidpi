var wol = require('node-wol')
var wake_data = ()=>{
    console.log("Initiating Wake")
    wol.wake('D4-3D-7E-BC-A6-15', function(error){
        if(error){
            console.log(error)
            console.log("sync failed")
            return false
        }
    })
    return true
}
module.exports = wake_data