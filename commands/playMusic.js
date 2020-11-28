const music = require("./music");

module.exports = {
    name: 'play',
    aliases: ['p','start','iniciar','tocar'],
    description: 'Toca a primeira música que o bot achar em relação ao que for passado como argumento.',
    serverOnly: true,
    args: true,
    usage: "&tocar <nome ou link de alguma música>",
    async execute(message, args){
        if(message.member.voice.channel){
            let props = args.join('-');
            console.log('Pesquisa: ' + props);
            let player = music.getPlayer(message.guild.id);
            message.channel.send("Revirando o Youtube. . .");
            await music.searchVideo(props,message,player,1);
            if(player.ResearchResult.length === 0) return;

            player.addQueue(player.ResearchResult[0]);
            player.ResearchResult.length = 0;
            if(player.queue.length === 1){
                message.channel.send(`Achei \`\`${player.queue[0].Title} (${player.queue[0].Duration})\`\` - Som na Caixa`);
                player.playMusic(message, player.queue);
            }else{
                music.createListMessage(message, player.queue);
            };
        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.");
        };
    },
};