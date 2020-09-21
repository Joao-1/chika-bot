const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'end',
    serveOnly: true,
    execute(message){
        if(message.member.voice.channel){
            music.endMusic(message);
        };
    },
};