const music = require("./music1");

module.exports = {
    name: 'play',
    aliases: ['p','start','iniciar'],
    nameHelp: '**!play <URL ou nome da música que deseja>**: Escolha uma música e curta.',
    description: 'Toca a primeira música que o bot achar em relação ao que for passado como argumento.',
    serverOnly: true,
    args: true,
    usage: "Chika Dance",
    async execute(message, args){
        if(message.member.voice.channel){
            let props = args.join('-');
            console.log('Pesquisa: ' + props);
            let player = music.getPlayer(message.guild.id);
            await music.searchVideo(props, message, player);
            if(player.ResearchResult.length === 0) return;

            player.addQueue(player.ResearchResult[0], player);
            player.ResearchResult.length = 0;
            if(player.queue.length === 1){
                player.playMusic(message, player.queue);
            }else{
                music.createListMessage(message, player.queue);
            };
        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.");
        };
    },
};