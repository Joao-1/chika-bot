const google = require('googleapis').google
const Youtube = google.youtube('v3');
const keys = require('../config.json');
const ytdl = require('ytdl-core');
const Discord = require("discord.js");

let videoProp = [];
let voiceChannel;
let playing;
//Procura vídeo no Youtube e cria um objeto com URL, Título, Nome do Canal e Thumbnail
async function searchVideo(args, message){
    console.log("Procurando vídeo...");
    let results = await Youtube.search.list({auth: keys.tokenYoutube, "type": ["video"], "part": ['id', 'snippet'], q: args, maxResults: 10})
    .then(function(response){
        let idVideo = response.data.items[0].id.videoId;
        videoProp.push({
            URL: `https://www.youtube.com/watch?v=${idVideo}`,
            Title: response.data.items[0].snippet.title,
            Channel:response.data.items[0].snippet.channelTitle,
            Thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
        });
        console.log("Vídeo achado!"); 
    }).catch((err)=>{
        console.log(err); 
        message.channel.send("Não encontrei sua busca :c Verifique a ortografía.");
        console.log("Vídeo não encontrado");
    });    
};

async function playMusic(message, props){
    console.log("Colocando música para tocar");
    voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection =>{
        message.channel.send(`**Tocando: **${videoProp[0].Title} - Boa música`);
        const stream =  ytdl(videoProp[0].URL, {filter: 'audioonly', highWaterMark: 1<<25});
        const dispatcher = connection.play(stream);
        playing = dispatcher;
        dispatcher.on('finish', () => {
            videoProp.shift();
            if(videoProp.length >= 1){
                console.log("Estou tocando a proxima musica");
                playMusic(message, videoProp);
            };
        });
    }).catch((err) => console.log(err));
};
//Adiciona uma música na lista de espera caso já esteja tocando algo.
async function createListMessage(message, props){
    console.log("Vídeo adicionada na lista");
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor(`#ff6f9c`)
    .setTitle(props[props.length - 1].Title)
    .setThumbnail(props[props.length - 1].Thumbnail, {width: 120, height: 90})
    .addFields(
        { name: 'Canal', value: `${props[props.length - 1].Channel}` },
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
        videoProp.length = 0;
        message.channel.send("Byeee!");
    }else{
        message.send("Preciso estar tocando algo para conseguir parar de tocar algo, não? Hms");
    }
};

async function skipMusic(message){
    if(playing){
        if(videoProp.length > 1){
            playing.end();
        }else{
            message.channel.send("Não tenho mais nenhuma música na fila para tocar.");
        }      
    }else{
        message.send("Preciso estar tocando algo para conseguir parar de tocar algo, não? Hms");
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
    videoProp: videoProp,
};
