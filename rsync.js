const Rsync = require('rsync')
const wake_data = require('./wake_data')
const fs = require('fs')

const rsync = new Rsync()
const rsyncSource = '/media/pi/data1/Pictures/'
const rsyncDestination = '/media/pi/data/Pictures/'

var rsync_trigger = ()=>{
    rsync.flags('avzP')
    rsync.set('progress')
    rsync.set('update')
    rsync.set('no-p')
    rsync.set('chmod=ugo=rwX')
    rsync.source(rsyncSource)
    rsync.destination(rsyncDestination)

    return new Promise((resolve, reject) => {
        
        try{
            let logData = ""
            rsync.execute(
                (error, code, cmd) => {
                    resolve({error, code, cmd, data: logData})
                },
                (data)=>{
                    logData += data
                },
                (err) => {
                    logData += err
                }
            )
        }catch(error){
            reject(error)
        }
    })
}
var callRsync = async ()=>{
    console.log("check data access")
    await checkData('/media/pi/data/')
    console.log('starting rsync')
    let output = await rsync_trigger()
    console.log(output)
    console.log('rsync complete')
}
function checkData(path, timeout=2000){
    const intervalObj = setInterval(function(){
        const dataInactive = true
        return new Promise((resolve, reject)=>{
            try{
                const dataObj = fs.readdirSync(path)
                if(dataObj)
                    dataInactive = dataObj.length === 0
            }
            catch(error){
                console.log("Data missing. Invoking WOL.")
                wake_data()
    
            }
            if(!dataInactive){
                console.log("Data is available. Stop looping.")
                clearInterval(intervalObj)
            }
        }, timeout)
    })
}
module.exports = callRsync