const DigitalOcean = require("do-wrapper").default;
const instance = new DigitalOcean('0fc37c838bab5312360aa72420b30eb07fb2f94965ble7b7180a5c65aee9a659');
var moment = require('moment');
var schedule = require('node-schedule')

schedule.scheduleJob('45 3 * * *',	() => {
    instance.snapshots.get()
        .then(data => {
            for (let index = 0; index < data.snapshots.length; index++) { 
                const element = data.snapshots[index]; 
                var yesterday = moment().subtract(l, 'days'); 
                yesterday.set({hour:0,minute:0,second:0,millisecond:0})
                if(element.size_gigabytes > 8 && moment(element.created_at).isBefore(moment().set({hour:0,minute:0,second:0,millisecond:0}))){ 
                    instance.snapshots.deleteById(element.id).then(data2 => console.log(data2)).catch(err => console.error(err))
                }
            }
        })
        .catch(err => console.error(err));
})
