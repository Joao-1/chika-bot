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
        let props = args.join('-');
        if(message.member.voice.channel){
            console.log(props);
            await music.searchVideo(props, message);
            if(music.ResearchResult[0]){
                music.queue.push(music.ResearchResult[0]);
                music.ResearchResult.length = 0;
            };

            if(music.queue.length === 1){
                music.playMusic(message, music.queue);
            }else if(music.queue.length === 0){
                console.log("Busca cancelada");
            }else{
                music.createListMessage(message, music.queue);
            };

        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.")
        };
    },
};