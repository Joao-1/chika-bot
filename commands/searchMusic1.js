const music = require("./music1");

module.exports = {
    name: 'search',
    aliases:['procurar'],
    description: 'Diferente do comando play, o search retorna 5 opções de músicas diferentes. Escolha uma dela informando o número correspondendo a música no chat.',
    serverOnly: true,
    args: true,
    usage: "&procurar <nome da música que deseja procurar>",
    async execute(message,args){
        if(message.member.voice.channel){
            let props = args.join('-');
            console.log('Pesquisa: ' + props);
            let player = music.getPlayer(message.guild.id);
            await music.searchVideo(props, message, player);
            if(player.ResearchResult.length === 0) return;

            music.searchCommand(player).then(Embed=>{
                message.channel.send(Embed).then(async () =>{
                    let filter = (response) =>{
                        return ['1','2','3','4','5','cancel','cancelar'].some(number => number === response.content) && response.author.id === message.author.id;
                    };
                    message.channel.awaitMessages(filter, {max: 1, time:20000, errors: ['time']}).then(collected =>{
                        let content = collected.first().content;
                        if(content === 'cancel' || content === 'cancelar'){
                            message.channel.send("Busca cancelada!");
                            player.ResearchResult.length = 0;
                            play();
                        };
                        if(content === '1'){
                            player.queue.push(player.ResearchResult[0]);
                            player.ResearchResult.length = 0;
                            play();;
                        }else if(content === '2'){
                            player.queue.push(player.ResearchResult[1]);
                            player.ResearchResult.length = 0;
                            play();;
                        }else if(content === '3'){
                            player.queue.push(player.ResearchResult[2]);
                            player.ResearchResult.length = 0;
                            play();;
                        }else if(content === '4'){
                            player.queue.push(player.ResearchResult[3]);
                            player.ResearchResult.length = 0;
                            play();;
                        }else if(content === '5'){
                            player.queue.push(player.ResearchResult[4]);
                            player.ResearchResult.length = 0;
                            play();;
                        };
                    }).catch(()=>{
                        message.channel.send('Acha que estou a sua disposição? O tempo já esgotou! Tente mais tarde, se puder hihihi');
                        player.ResearchResult.length = 0;
                    });
                });
            });
            
            function play(){
                if(player.queue.length === 1){
                    player.playMusic(message, player.queue);
                }else if(player.queue.length === 0){
                    console.log("Busca cancelada");
                }else{
                    player.createListMessage(message, player.queue);
                };
            };
        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.")
        };
    },
};