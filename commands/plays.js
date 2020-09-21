const Discord = require("discord.js");
const music = require("./music");


module.exports = {
    name: 'play',
    nameHelp: '**!play <URL ou nome da música que deseja>**: Escolha uma música e curta!',
    description: 'Toca uma música desejada.',
    serverOnly: true,
    args: true,
    usage: "Rise",
    async execute(message, args){
        if(message.member.voice.channel){
            await music.searchVideo(args);
            
            if(music.videoProp.length === 1){
                music.playMusic(message, music.videoProp);
            } else{
                music.createListMessage(message, music.videoProp);
            };

        }else{
            message.send("Você precisa estar em um canal de voz para usar esse comando.")
        };

    },
};