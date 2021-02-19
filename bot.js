require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
client.login(process.env.BOT_TOKEN);
const glob = require('glob');
var cron = require("node-schedule");
const path = require('path');
const fs = require('fs');
const { measureMemory } = require('vm');

let knownGifs = [];
let knownImagesJpg = [];
let knownVideosAvi = [];
let knownVideosMp4 = [];
let knownSoundMp3 = [];

cron.scheduleJob("* 1 * * * *", function () {
    changeNames();
});

const imgDirectoryPath = path.join(__dirname, 'img');
const videoDirectoryPath = path.join(__dirname, 'video');
const audioDirectoryPath = path.join(__dirname, 'audio');

function registerList() {
    fs.readdir(imgDirectoryPath, function (err, files) {
        knownGifs = []
        knownImagesJpg = []

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length - 1] == "gif") {
                file = file.split('.').slice(0, -1).join('.');
                knownGifs.push(file);
            }
        });


        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length - 1] == "jpg") {
                file = file.split('.').slice(0, -1).join('.');
                knownImagesJpg.push(file);
            }
        });

    });

    fs.readdir(videoDirectoryPath, function (err, files) {
        knownVideosAvi = []
        knownVideosMp4 = []

        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length - 1] == "mp4") {
                file = file.split('.').slice(0, -1).join('.');
                knownVideosMp4.push(file);
            }
        });

        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length - 1] == "avi") {
                file = file.split('.').slice(0, -1).join('.');
                knownVideosAvi.push(file);
            }
        });

    });

    fs.readdir(audioDirectoryPath, function (err, files) {
        knownSoundMp3 = []
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length - 1] == "mp3") {
                file = file.split('.').slice(0, -1).join('.');
                knownSoundMp3.push(file);
            }
        });
    });
}


function changeNames() {
    glob(__dirname + "/**/*.*", function (err, files) {
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
    if (message.author.bot) return;
    var msg = message.content;
    if (msg.toLowerCase() == "!list") {
       //img gif
        let existing = "Gifs possible : ";
        knownGifs.forEach(function (gif) {
            existing += "\r\n" + ":" + gif + ":";
        })

        existing += "\r\n\r\nImages possible : ";
        knownImagesJpg.forEach(function (jpg) {
            existing += "\r\n" + ":" + jpg + ":";
        })


        //VIDEO
        existing += "\r\n\r\nVideos possible : ";
        knownVideosMp4.forEach(function (mp4) {
            existing += "\r\n" + ":" + mp4 + ":";
        })

        knownVideosAvi.forEach(function (avi) {
            existing += "\r\n" + ":" + avi + ":";
        })


        // audio
        existing += "\r\n\r\nMp3 possible : ";
        knownSoundMp3.forEach(function (MP3) {
            existing += "\r\n" + ":" + MP3 + ":";
        })
        message.channel.send(existing, {
            split: true});
    }

    if (msg.toLowerCase() == "!refresh") {
        message.channel.send('refreshing list...')
        changeNames();
    }

    if (msg.startsWith(":") && msg.endsWith(":")) {
        var msg = msg.substring(1, msg.length - 1);
        //img gif  jpg
        knownGifs.forEach(function (gif) {
            if (gif.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                message.channel.send("**["+message.author.username +"] says : \r\n**", { files: ["./img/" + msg + ".gif"] })
            }
        })
        knownImagesJpg.forEach(function (jpg) {
            if (jpg.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                message.channel.send("**["+message.author.username +"] says : \r\n**", { files: ["./img/" + msg + ".jpg"] })
            }
        })

        //video mp4 avi
        knownVideosMp4.forEach(function (mp4) {
            if (mp4.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                message.channel.send("**["+message.author.username +"] says : \r\n**", { files: ["./video/" + msg + ".mp4"] })
            }
        })

        knownVideosAvi.forEach(function (avi) {
            if (avi.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                message.channel.send("**["+message.author.username +"] says : \r\n**", { files: ["./video/" + msg + ".avi"] })
            }
        })

        //mp3

        knownSoundMp3.forEach(function (mp3) {
            if (mp3.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                message.channel.send("**["+message.author.username +"] says : \r\n**", { files: ["./audio/" + msg + ".mp3"] })
            }
        })
        message.delete();
    }
});

changeNames();