const google = require('googleapis').google
const Youtube = google.youtube('v3');
const keys = require('../config.json');
const ytdl = require('ytdl-core');
const Discord = require("discord.js");

let ResearchResult = [];
let queue = [];
let voiceChannel;
let playing;
//Procura vídeo no Youtube e cria um objeto com URL, Título, Nome do Canal e Thumbnail
async function searchVideo(args, message){
    console.log("Procurando vídeo...");
    let results = await Youtube.search.list({auth: keys.tokenYoutube, "type": ["video"], "part": ['id', 'snippet'], q: args, maxResults: 5})
    .then(function(response){
    if(response.data.items[0]){
        for(let i = 0; i <= 4; i++){
            let idVideo = response.data.items[i].id.videoId;
            ResearchResult.push({
                URL: `https://www.youtube.com/watch?v=${idVideo}`,
                Title: response.data.items[i].snippet.title,
                Channel:response.data.items[i].snippet.channelTitle,
                Thumbnail: response.data.items[i].snippet.thumbnails.medium.url,
                MemberReq: [message.author.username, message.author.id]
            });
        };
        console.log("Vídeo achado!");
    }else{
        message.channel.send("Não encontrei sua busca :c Verifique a ortografía.");
        console.log("Vídeo não encontrado");
    }; 
    }).catch((err)=>{
        console.log(err); 
    });    
};

async function playMusic(message, props){
    console.log("Colocando música para tocar");
    voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection =>{
        message.channel.send(`**Tocando: **${queue[0].Title} - Boa música`);
        const stream =  ytdl(queue[0].URL, {filter: 'audioonly', highWaterMark: 1<<25});
        const dispatcher = connection.play(stream);
        playing = dispatcher;
        dispatcher.on('finish', () => {
            queue.shift();
            if(queue.length >= 1){
                console.log("Estou tocando a proxima musica");
                playMusic(message, queue);
            };
        });
    }).catch((err) => console.log(err));
};
//Adiciona uma música na lista de espera caso já esteja tocando algo.
async function createListMessage(message){
    console.log("Vídeo adicionada na lista");
    console.log(queue[1]);
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor(`#ff6f9c`)
    .setTitle(queue[queue.length - 1].Title)
    .setURL(queue[queue.length -1].URL)
    .setThumbnail(queue[queue.length - 1].Thumbnail, {width: 120, height: 90})
    .addFields(
        { name: 'Canal', value: `${queue[queue.length - 1].Channel}` },
        )
    message.channel.send(exampleEmbed);
};

async function pauseMusic(message){
    if(playing){
        if(!playing.paused){
            playing.pause();
            message.channel.send("Música pausada");
        }else{
            message.channel.send("Como vou pausar algo que já está pausado? Baaaaka!");
        }
    }else{
        message.channel.send("Alö? Não tem nada sendo tocado.");
    }
    
};

async function resumeMusic(message){
    if(playing){
        if(playing.paused){
            playing.resume();
            message.channel.send("Música despausada");
        }else{
            message.send("Não encontrei nenhuma música pausada.");
        }
    }else{
        message.channel.send("Alö? Não tem nada sendo tocado.");
    }
    
};

async function endMusic(message){
    if(playing){
        playing.end();
        queue.length = 0;
        message.channel.send("Byeee!");
    }else{
        message.channel.send("Preciso estar tocando algo para conseguir parar de tocar algo, não? Hms");
    }
};

async function skipMusic(message){
    if(playing){
        if(queue.length > 1){
            playing.end();
        }else{
            message.channel.send("Não tenho mais nenhuma música na fila para tocar.");
        }      
    }else{
        message.channel.send("Preciso estar tocando algo para conseguir parar de tocar algo, não? Hms");
    }
};

module.exports = {
    searchVideo: searchVideo,
    playMusic: playMusic,
    createListMessage: createListMessage,
    pauseMusic: pauseMusic, 
    resumeMusic: resumeMusic,
    endMusic: endMusic,
    skipMusic: skipMusic,
    queue: queue,
    ResearchResult: ResearchResult,
};
