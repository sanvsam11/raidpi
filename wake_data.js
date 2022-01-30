var wol = require('node-wol')
require('dotenv').config()

var wake_data = ()=>{
    console.log("Initiating Wake")
    wol.wake(process.env.DATA_MAC_ID, function(error){
        if(error){
            console.log(error)
            console.log("sync failed")
            return false
        }
    })
    return true
}
module.exports = wake_data