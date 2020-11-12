const Discord = require("discord.js");
const music = require("./music1");

module.exports = {
    name: 'terminar',
    aliases: ['t','end','disconnect','sair','leave'],
    description: 'Deixa o canal de voz e limpa a fila de músicas do servidor',
    serveOnly: true,
    usage: '&terminar',
    execute(message){
        if(message.guild.me.voice.channel){
            let player = music.getPlayer(message.guild.id);
            player.endMusic(message);
        }else{
            message.channel.send("Eu não estou em nenhum canal de voz no momento!");
        };
    },
};