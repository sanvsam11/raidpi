const watch = require('node-watch')
const callRsync = require('./rsync')

 watch('/media/pi/data1/', {recursive: true}, function(evt, name){
    console.log("Detected data update")
    callRsync()
    console.log("Handled data update")
 })
