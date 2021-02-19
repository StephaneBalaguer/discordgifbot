require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
client.login(process.env.BOT_TOKEN);
const glob = require('glob');
var cron = require("node-schedule");
const path = require('path');
const fs = require('fs');

let knownGifs = [];

cron.scheduleJob("* 1 * * * *", function () {
    changeNames();
});

const directoryPath = path.join(__dirname, 'img');

function registerList() {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length-1] == "gif") {
                file = file.split('.').slice(0, -1).join('.');
                knownGifs.push(file);
            }
        });
    });
}


function changeNames() {
    glob(__dirname + "/img/*.*", function (err, files) {
        var processed = 0;
        files.forEach(function (file) {
            var dir = path.dirname(file);
            var filename = path.basename(file);
            fs.renameSync(file, dir + "/" + filename.toLowerCase());
            processed++;
        });
        registerList();
    });
}
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('message', function (message) {
    var msg = message.content;
    if (msg.toLowerCase() == ":listgif") {
        let existing = "Gifs possible : ";
        knownGifs.forEach(function (gif) {
            existing += "\r\n" + " :" + gif + ":";
        })
        message.channel.send(existing);
    }

    if (msg.toLowerCase() == ":refreshgifs") {
        changeNames();
    }

    if (msg.startsWith(":") && msg.endsWith(":")) {
        var msg = msg.substring(1, msg.length - 1);
        knownGifs.forEach(function (gif) {
            if (gif.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                message.channel.send({ files: ["./img/" + msg + ".gif"] })
                message.delete();
            }
        })
    }
});

changeNames();