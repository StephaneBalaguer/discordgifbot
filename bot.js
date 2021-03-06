require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const glob = require('glob');
var cron = require("node-schedule");
const path = require('path');
const fs = require('fs');
const {
    measureMemory
} = require('vm');

let knownGifs = [];
let knownImagesJpg = [];
let knownImagesPng = [];
let knownVideosAvi = [];
let knownVideosMp4 = [];
let knownSoundMp3 = [];

let knownImagesSourire = [];
let knownImagesKrok = [];
let knownImagesReptilien = [];
let knownImagesCouillons = [];
let knownImagesPressX = [];



let envieDeClubberAnswers = ["Ouais grave de t'accompagne !", "Allez on se retrouve a l'interieur !", "Ouais gros !", "Vas y chaud !", "T'as vraiment envie d'aller clubber avec un mec comme ca ?!", "LET'S GO"

];

cron.scheduleJob("* 1 * * * *", function () {
    changeNames();
});

const imgDirectoryPath = path.join(__dirname, 'img');
const videoDirectoryPath = path.join(__dirname, 'video');
const audioDirectoryPath = path.join(__dirname, 'audio');
const sourireDirectoryPath = path.join(__dirname, 'sourire');
const krokDirectoryPath = path.join(__dirname, 'krok');
const reptilienDirectoryPath = path.join(__dirname, 'reptilien');
const couillonsDirectoryPath = path.join(__dirname, 'couillons');
const pressXDirectoryPath = path.join(__dirname, 'pressx');

function registerList() {
    fs.readdir(imgDirectoryPath, function (err, files) {
        knownGifs = []
        knownImagesJpg = []
        knownImagesPng = [];


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

        files.forEach(function (file) {
            if (file.split('.')[file.split('.').length - 1] == "png") {
                file = file.split('.').slice(0, -1).join('.');
                knownImagesPng.push(file);
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

    fs.readdir(sourireDirectoryPath, function (err, files) {
        knownImagesSourire = []
        files.forEach(function (file) {
            knownImagesSourire.push(file);
        })
    });

    fs.readdir(couillonsDirectoryPath, function (err, files) {
        knownImagesCouillons = []
        files.forEach(function (file) {
            knownImagesCouillons.push(file);
        })
    });

    fs.readdir(reptilienDirectoryPath, function (err, files) {
        knownImagesReptilien = []
        files.forEach(function (file) {
            knownImagesReptilien.push(file);
        })
    });

    fs.readdir(pressXDirectoryPath, function (err, files) {
        knownImagesPressX = []
        files.forEach(function (file) {
            knownImagesPressX.push(file);
        })
    });

    fs.readdir(krokDirectoryPath, function (err, files) {
        knownImagesKrok = []
        files.forEach(function (file) {
            knownImagesKrok.push(file);
        })
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
    });
    glob(__dirname + "/video/*.*", function (err, files) {
        var processed = 0;
        files.forEach(function (file) {
            var dir = path.dirname(file);
            var filename = path.basename(file);
            fs.renameSync(file, dir + "/" + filename.toLowerCase());
            processed++;
        });
    });
    glob(__dirname + "/audio/*.*", function (err, files) {
        var processed = 0;
        files.forEach(function (file) {
            var dir = path.dirname(file);
            var filename = path.basename(file);
            fs.renameSync(file, dir + "/" + filename.toLowerCase());
            processed++;
        });
    });
    registerList();
}

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in`);
});

client.on('message', function (message) {
    if (message.author.bot) return;
    var msg = message.content;
    if (msg.toLowerCase() == "!list") {
        let existing = "Commandes disponibles :\r\n!couillons\r\n\!krok\r\n\!pressXforDoubt\r\n!reptilien\r\n\!sourire\r\n\r\n"
               
        //img gif
        existing += "Gifs disponible : ";
        knownGifs.forEach(function (gif) {
            existing += "\r\n" + ":" + gif + ":";
        })

        existing += "\r\n\r\nImages disponible : ";
        knownImagesJpg.forEach(function (jpg) {
            existing += "\r\n" + ":" + jpg + ":";
        })

        knownImagesPng.forEach(function (png) {
            existing += "\r\n" + ":" + png + ":";
        })
        //VIDEO
        existing += "\r\n\r\nVideos disponible : ";
        knownVideosMp4.forEach(function (mp4) {
            existing += "\r\n" + ":" + mp4 + ":";
        })

        knownVideosAvi.forEach(function (avi) {
            existing += "\r\n" + ":" + avi + ":";
        })


        // audio
        existing += "\r\n\r\nMp3 disponible : ";
        knownSoundMp3.forEach(function (mp3) {
            existing += "\r\n" + ":" + mp3 + ":";
        })
        message.channel.send(existing, {
            split: true
        });
        message.delete();
    }

    if (msg.toLowerCase() == "!refresh") {
        message.channel.send('refreshing list...')
        changeNames();
        message.delete();
    }

    if (msg.toLowerCase() == "!sourire") {
        if (knownImagesSourire.length != 0) {
            message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                files: ["./sourire/" + knownImagesSourire[getRandomInt(knownImagesSourire.length)]]
            })
            message.delete();
        }
    }

    if (msg.toLowerCase() == "!couillons") {
        if (knownImagesCouillons.length != 0) {
            message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                files: ["./couillons/" + knownImagesCouillons[getRandomInt(knownImagesCouillons.length)]]
            })
            message.delete();
        }
    }

    if (msg.toLowerCase() == "!reptilien") {
        if (knownImagesReptilien.length != 0) {
            message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                files: ["./reptilien/" + knownImagesReptilien[getRandomInt(knownImagesReptilien.length)]]
            })
            message.delete();
        }
    }

    if (msg.toLowerCase() == "!pressxfordoubt") {
        if (knownImagesReptilien.length != 0) {

            message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                files: ["./pressx/" + knownImagesPressX[getRandomInt(knownImagesPressX.length)]]
            })
            message.delete();
        }
    }

    if (msg.toLowerCase() == "!krok") {
        if (knownImagesKrok.length != 0) {

            message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                files: ["./krok/" + knownImagesKrok[getRandomInt(knownImagesKrok.length)]]
            })
            message.delete();
        }
    }


    if (msg.startsWith(":") && msg.endsWith(":")) {

        let shouldMessageBeDeleted = false;
        var msg = msg.substring(1, msg.length - 1);
        //img gif  jpg
        knownGifs.forEach(function (gif) {
            if (gif.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                shouldMessageBeDeleted = true;
                message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                    files: ["./img/" + msg + ".gif"]
                })
            }
        })
        knownImagesJpg.forEach(function (jpg) {
            if (jpg.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                shouldMessageBeDeleted = true;

                message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                    files: ["./img/" + msg + ".jpg"]
                })
            }
        })
        knownImagesPng.forEach(function (png) {
            if (png.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                shouldMessageBeDeleted = true;

                message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                    files: ["./img/" + msg + ".png"]
                })
            }
        })

        //video mp4 avi
        knownVideosMp4.forEach(function (mp4) {
            if (mp4.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                shouldMessageBeDeleted = true;

                message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                    files: ["./video/" + msg + ".mp4"]
                })
            }
        })

        knownVideosAvi.forEach(function (avi) {
            if (avi.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                shouldMessageBeDeleted = true;

                message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                    files: ["./video/" + msg + ".avi"]
                })
            }
        })

        //mp3

        knownSoundMp3.forEach(function (mp3) {
            if (mp3.toLocaleLowerCase() == msg.toLocaleLowerCase()) {
                shouldMessageBeDeleted = true;

                message.channel.send("**[" + message.author.username + "] says : \r\n**", {
                    files: ["./audio/" + msg + ".mp3"]
                })
            }
        })
        if (shouldMessageBeDeleted) {
            message.delete();
        }
    }

    if (msg.toLowerCase().includes("envie de clubber") ||
        msg.toLowerCase().includes("envie de cluber") ||
        msg.toLowerCase().includes("envie de clube") ||
        msg.toLowerCase().includes("envie de clubere") ||
        msg.toLowerCase().includes("envie de clubé") ||
        msg.toLowerCase().includes("envie de clubè")

        ||
        msg.toLowerCase().includes("envi de clubber") ||
        msg.toLowerCase().includes("envi de cluber") ||
        msg.toLowerCase().includes("envi de clube") ||
        msg.toLowerCase().includes("envi de clubé") ||
        msg.toLowerCase().includes("envi de clubè") ||
        msg.toLowerCase().includes("envi de clubere")

        ||
        msg.toLowerCase().includes("anvi de clubber") ||
        msg.toLowerCase().includes("anvi de cluber") ||
        msg.toLowerCase().includes("anvi de clube") ||
        msg.toLowerCase().includes("anvi de clubé") ||
        msg.toLowerCase().includes("anvi de clubè") ||
        msg.toLowerCase().includes("anvi de clubere")

        ||
        msg.toLowerCase().includes("envue de clubber") ||
        msg.toLowerCase().includes("envue de cluber") ||
        msg.toLowerCase().includes("envue de clube") ||
        msg.toLowerCase().includes("envue de clubere") ||
        msg.toLowerCase().includes("envue de clubé") ||
        msg.toLowerCase().includes("envue de clubè")

        ||
        msg.toLowerCase().includes("envu de clubber") ||
        msg.toLowerCase().includes("envu de cluber") ||
        msg.toLowerCase().includes("envu de clube") ||
        msg.toLowerCase().includes("envu de clubé") ||
        msg.toLowerCase().includes("envu de clubè") ||
        msg.toLowerCase().includes("envu de clubere")

        ||
        msg.toLowerCase().includes("anvu de clubber") ||
        msg.toLowerCase().includes("anvu de cluber") ||
        msg.toLowerCase().includes("anvu de clube") ||
        msg.toLowerCase().includes("anvu de clubé") ||
        msg.toLowerCase().includes("anvu de clubè") ||
        msg.toLowerCase().includes("anvu de clubere")

        ||
        msg.toLowerCase().includes("en vide club et") ||
        msg.toLowerCase().includes("en vie, deux cleux bés") ||
        msg.toLowerCase().includes("envi de cleuber")

    ) {
        message.channel.send(envieDeClubberAnswers[getRandomInt(envieDeClubberAnswers.length)], {
            files: ["./img/enviedeclubber.jpg"]
        })
    }
    if (msg.toLowerCase().includes("ca degoute") ||
        msg.toLowerCase().includes("ca dégoute") ||
        msg.toLowerCase().includes("ça degoute") ||
        msg.toLowerCase().includes("ça dégoute") ||
        msg.toLowerCase().includes("ca deggoute") ||
        msg.toLowerCase().includes("ca deggoutte") ||
        msg.toLowerCase().includes("ca degoutte") ||
        msg.toLowerCase().includes("ça deggoute") ||
        msg.toLowerCase().includes("ça deggoutte") ||
        msg.toLowerCase().includes("ça degoutte")

        ||
        msg.toLowerCase().includes("sa degoute") ||
        msg.toLowerCase().includes("sa dégoute") ||
        msg.toLowerCase().includes("sa deggoute") ||
        msg.toLowerCase().includes("sa deggoutte") ||
        msg.toLowerCase().includes("sa degoutte")

        ||
        msg.toLowerCase().includes("tu degoute") ||
        msg.toLowerCase().includes("tu dégoute") ||
        msg.toLowerCase().includes("tu deggoute") ||
        msg.toLowerCase().includes("tu deggoutte") ||
        msg.toLowerCase().includes("tu degoutte")) {
        message.channel.send("C'est lui qui dégoute", {
            files: ["./img/enviedeclubber.jpg"]
        })
    }


});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

changeNames();

client.login(process.env.BOT_TOKEN);