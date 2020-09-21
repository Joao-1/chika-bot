const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'resume',
    serveOnly: true,
    execute(message){
        if(message.member.voice.channel){
            music.resumeMusic(message);
        };
    },
};