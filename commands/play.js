const google = require('googleapis').google
const Youtube = google.youtube('v3');
const keys = require('../config.json');
const ytdl = require('ytdl-core');

let idURL = [];

module.exports = {
    name: 'play',
    nameHelp: '**!play <URL ou nome da música que deseja>**: Escolha uma música e curta!',
    description: 'Toca uma música desejada.',
    serverOnly: true,
    args: true,
    usage: "Rise",
    execute(message, args){
        //procura a musica no YT e joga a URL em um array
        if(message.member.voice.channel){
            searchVideo();
            function searchVideo(){
                let results = Youtube.search.list({auth: keys.tokenYoutube, "type": ["video"], "part": ['id','snippet', ], q: args, maxResults: 1})
                .then(function(response){
                    let idVideo = response.data.items[0].id.videoId;
                    idURL.push(`https://www.youtube.com/watch?v=${idVideo}`);
                    if(idURL.length === 1){
                        playMusic(idURL);
                    };
                    console.log(idURL[0]);
                    console.log("Responde", response.data.items[0].id.videoId);
                });
            };
        };

        //play - Toca a musica
        function playMusic(a){
            const voiceChannel = message.member.voice.channel;
            voiceChannel.join().then(connection =>{
                const stream =  ytdl(idURL[0], {filter: 'audioonly', highWaterMark: 1<<25});
                const dispatcher = connection.play(stream);

                 dispatcher.on('finish', () => {
                     idURL.shift();
                     if(idURL.length >= 1){
                        console.log("Estou tocando a proxima musica")
                        playMusic(idURL);
                     }
                    });
             }).catch(console.error);
         }
    },
};