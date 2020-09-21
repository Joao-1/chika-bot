const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'pause',
    serveOnly: true,
    execute(message, args){
        if(message.member.voice.channel){
            music.pauseMusic(message);
        };
    },
};