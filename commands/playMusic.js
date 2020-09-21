const Discord = require("discord.js");
const { videoProp } = require("./music");
const music = require("./music");


module.exports = {
    name: 'play',
    nameHelp: '**!play <URL ou nome da música que deseja>**: Escolha uma música e curta!',
    description: 'Toca uma música desejada.',
    serverOnly: true,
    args: true,
    usage: "Rise",
    async execute(message, args){
        let search = args.join('-');
        if(message.member.voice.channel){
            console.log(search);
            await music.searchVideo(search, message);

            if(music.videoProp.length === 1){
                music.playMusic(message, music.videoProp);
            }else if(music.videoProp.length === 0){
                console.log("Busca cancelada");
            }else{
                music.createListMessage(message, music.videoProp);
            };

        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.")
        };

    },
};