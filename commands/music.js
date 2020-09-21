const google = require('googleapis').google
const Youtube = google.youtube('v3');
const keys = require('../config.json');
const ytdl = require('ytdl-core');
const Discord = require("discord.js");

let videoProp = [];
//Procura vídeo no Youtube e cria um objeto com URL, Título, Nome do Canal e Thumbnail
async function searchVideo(args){
    console.log("Procurando vídeo...")
    let results = await Youtube.search.list({auth: keys.tokenYoutube, "type": ["video"], "part": ['id', 'snippet'], q: args, maxResults: 10})
    .then(function(response){
        let idVideo = response.data.items[0].id.videoId;
        videoProp.push({
            URL: `https://www.youtube.com/watch?v=${idVideo}`,
            Title: response.data.items[0].snippet.title,
            Channel:response.data.items[0].snippet.channelTitle,
            Thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
        });
    }).catch((err)=>{console.log(err)});  
    console.log("Vídeo achado!");   
};

async function playMusic(message, props){
    console.log("Colocando música para tocar");
    const voiceChannel = message.member.voice.channel;
    voiceChannel.join().then(connection =>{
        message.channel.send(`**Tocando: **${videoProp[0].Title} - Boa música`);
        const stream =  ytdl(videoProp[0].URL, {filter: 'audioonly', highWaterMark: 1<<25});
        const dispatcher = connection.play(stream);

        dispatcher.on('finish', () => {
            videoProp.shift();
            if(videoProp.length >= 1){
                console.log("Estou tocando a proxima musica")
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
        { name: 'Channel', value: `${props[props.length - 1].Channel}` },
        )
    message.channel.send(exampleEmbed);
};

module.exports = {
    searchVideo: searchVideo,
    playMusic: playMusic,
    createListMessage: createListMessage,
    videoProp: videoProp,
};
