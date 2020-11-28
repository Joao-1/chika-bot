const ytdl = require('ytdl-core');
const Discord = require("discord.js");
const ytsr = require('ytsr');

class Player{
    constructor() {
        this.ResearchResult = [];
        this.queue = [];
    };
    researchVideos(URL,Title,Channel,Thumbnail,Duration,views,MemberReq){
        this.ResearchResult.push({               
            URL,
            Title, 
            Channel,
            Thumbnail,
            Duration,
            views,
            MemberReq,
        });
    };
    addQueue(queue){
        this.queue.push(queue);
    };
    playMusic(message,queue){
        console.log("Colocando música para tocar");
        var voiceChannel = message.member.voice.channel;
        voiceChannel.join().then(connection =>{
            var stream =  ytdl(queue[0].URL, {filter: 'audioonly', highWaterMark: 1<<25});
            var dispatcher = connection.play(stream);
            this.playing = dispatcher;
            console.log("Tocando");
            dispatcher.on('finish', () => {
                queue.shift();
                if(queue.length >= 1){
                    console.log("Estou tocando a proxima musica");
                    this.playMusic(message, queue);
                }else{connection.disconnect();};
            });
        }).catch((err) => console.log(err));
    };
    pauseMusic(message){
        if(this.playing){
            if(!this.playing.paused){
                this.playing.pause();
                message.channel.send("Música pausada");
            }else{message.channel.send("Como vou pausar algo que já está pausado? Baaaaka!");}
        }else{message.channel.send("Alö? Não tem nada sendo tocado.");};
    };
    resumeMusic(message){
        if(this.playing){
            if(this.playing.paused){
                this.playing.resume();
                message.channel.send("Música despausada");
            }else{message.channel.send("Não encontrei nenhuma música pausada.");};
        }else{message.channel.send("Alö? Não tem nada sendo tocado.");};
    };
    skipMusic(message){
        if(this.playing){
            if(this.queue.length > 1){
                this.playing.end();
            }else{message.channel.send("Não tenho mais nenhuma música na fila para tocar.");};      
        }else{message.channel.send("Preciso estar tocando algo para conseguir pular de tocar algo, não? Hms");};
    };
    endMusic(message){
        if(this.playing){
            this.playing.end();
            this.queue.length = 0;
            message.member.voice.channel.leave();
            message.channel.send("Byeee!");
        }else{
            message.channel.send("Preciso estar tocando algo para conseguir parar de tocar algo, não? Hms");
        };
    };
    listSongs(message,arg,player){
        let args = parseInt(arg);
        let playingNow = 'Não estou tocando nada no momento!';
        let inQueue = "Nada na fila";
        this.somethingInTheQueue = false;
        this.numberOfPages = 0;
        this.grup = 0;
        this.now = 1;
        this.result = [[],[],[]];
        separateSongs(player,5);
        
        if(this.queue.length >= 1){
            playingNow = `[${this.queue[0].Title}](${this.queue[0].URL}) - ${player.queue[0].Duration} | Requisitado por: ${this.queue[0].MemberReq}`;
        };

        if(this.somethingInTheQueue === true){
            if(isNaN(args)){
                inQueue = this.result[0];
            }else{
                if(args - 1 > this.grup){
                    inQueue = this.result[0];
                }else{
                    inQueue = this.result[args - 1];
                    this.now = args;
                };
            };
        };

        const embed = new Discord.MessageEmbed()
        .setColor(`#221297`)
        .setTitle("Lista de músicas na espera")
        .setURL('https://discord.js.org/')
        .addFields(
            {name: 'Tocando agora', value: playingNow},
            {name: 'Na fila', value: inQueue},
        )
        .setFooter(`${this.now}\\${this.grup + 1 + this.numberOfPages}`);
    
        message.channel.send(embed);
    };
};

let players = {};

function getPlayer(server){
    if(!players[server]) players[server] = new Player();
    return players[server];
};

async function searchVideo(args,message,player,max){
    console.log("Procurando vídeo...");
    let result;
    await ytsr.getFilters(args).then(async (filters1) => {
        const filter1 = filters1.get('Type').find(o => o.name === 'Video');
        const search = await ytsr(filter1.ref,{limit:max,safeSearch:true});
        result = search.items.slice(0,max);
      }).catch(err => {
        console.error(err);
      });
    if(result){
        for(let i = 0; i <= max - 1; i++){
            player.researchVideos(
                result[i].link,
                result[i].title,
                result[i].author.name,
                result[i].thumbnail,
                result[i].duration,
                result[i].views,
                message.author.tag,
            );
        };
        console.log("Vídeo achado!");
    }else{
        message.channel.send("Não encontrei sua busca :c Verifique a ortografía.");
        console.log("Vídeo não encontrado");
    }; 


};

function separateSongs(player, maximo){
    if(player.queue.length === 1 || player.queue.length === 0) return;
    player.somethingInTheQueue = true;
    let i = 1;
    while(i < player.queue.length){
        if(i === player.queue.length){
            return;
        };
        if(player.queue[i] === undefined){
            return;
        };
      
        player.result[player.grup].push(`\`${i}\` - [${player.queue[i].Title}](${player.queue[i].URL}) - ${player.queue[i].Duration} | Requisitado por: ${player.queue[i].MemberReq} \n`);
        if(i % maximo === 0){
            player.grup++;
        };
        if(i === player.queue.length && player.result[player.grup] == undefined) player.numberOfPages--;
        i++;
    };
};

function createListMessage(message, queue){
    console.log("Vídeo adicionada na lista");
    const Embed = new Discord.MessageEmbed()
    .setAuthor('Adicionado a fila', message.author.avatarURL())
    .setColor(`#221297`)
    .setTitle(queue[queue.length - 1].Title)
    .setURL(queue[queue.length -1].URL)
    .setThumbnail(queue[queue.length - 1].Thumbnail, {width: 120, height: 90})
    .addFields(
        {name: 'Canal', value: `${queue[queue.length - 1].Channel}`, inline: true},
        {name: 'Duração', value: `${queue[queue.length - 1].Duration}`, inline: true},
        {name: 'Visualizações', value: `${(queue[queue.length - 1].views).toLocaleString('pt-br')}`, inline: true},
        {name: 'Posição na fila de espera', value: `${queue.length - 1}`}
        )
    message.channel.send(Embed);
};

async function searchCommand(player){
    const Embed = new Discord.MessageEmbed()
    .setColor(`#221297`)
    .setTitle("Lista dos resultados:")
    .setURL('https://discord.js.org/')
    .setDescription('**Escolha o número correspondente a sua pesquisa**')
    .setThumbnail('https://i.pinimg.com/736x/5e/9a/03/5e9a033287e21ebbfe5acd1dace7a519.jpg')
    .addFields(
        { name: `\u200B`, value: `\`${1}\` - [${player.ResearchResult[0].Title}](${player.ResearchResult[0].URL}) - (${player.ResearchResult[0].Duration})`},
        { name: `\u200B`, value: `\`${2}\` - [${player.ResearchResult[1].Title}](${player.ResearchResult[1].URL}) - (${player.ResearchResult[1].Duration})`},
        { name: `\u200B`, value: `\`${3}\` - [${player.ResearchResult[2].Title}](${player.ResearchResult[2].URL}) - (${player.ResearchResult[2].Duration})`},
        { name: `\u200B`, value: `\`${4}\` - [${player.ResearchResult[3].Title}](${player.ResearchResult[3].URL}) - (${player.ResearchResult[3].Duration})`},
        { name: `\u200B`, value: `\`${5}\` - [${player.ResearchResult[4].Title}](${player.ResearchResult[4].URL}) - (${player.ResearchResult[4].Duration})`},
        )
    .addField(`\u200B`, `Digite \`\`cancelar\`\` caso queira cancelar a pesquisa`);
    return Embed;
};

module.exports = {
    Player,
    getPlayer,
    searchVideo,
    searchCommand,
    separateSongs,
    createListMessage,
};