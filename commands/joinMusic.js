const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'join',
    serveOnly: true,
    execute(message, args){
        if(message.member.voice.channel){
            message.member.voice.channel.join();
            message.send.send("Com sua licença, obrigada!")
        }else{
            message.channel.send("Você precisa estar em um canal de voz para que eu consiga entrar.");
        };
    },
};