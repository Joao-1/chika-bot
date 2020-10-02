const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'play',
    aliases: ['p', 'start', 'iniciar'],
    nameHelp: '**!play <URL ou nome da música que deseja>**: Escolha uma música e curta!',
    description: 'Toca a primeira música que o bot achar em relação ao que for passado como argumento.',
    serverOnly: true,
    args: true,
    usage: "Chika Dance",
    async execute(message, args){
        let props = args.join('-');
        if(message.member.voice.channel){
            console.log('Pesquisa: ' + props);
            await music.searchVideo(props, message);
            if(music.ResearchResult.length === 0){
                console.log("Busca cancelada");
                return;
            };

            music.queue.push(music.ResearchResult[0]);
            music.ResearchResult.length = 0;

            if(music.queue.length === 1){
                music.playMusic(message, music.queue);
            }else{
                music.createListMessage(message, music.queue);
            };

        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.")
        };
    },
};