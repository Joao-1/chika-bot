const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'disconnect',
    serveOnly: true,
    execute(message, args){
        if(message.member.voice.channel){
            message.member.voice.channel.leave();
            message.channel.send("Pronto!");
        }else{
            message.channel.send("Você precisa estar em um canal de voz para que eu pelo menos consiga sair.");
        };
    },
};