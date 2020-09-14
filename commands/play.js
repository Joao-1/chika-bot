const google = require('googleapis').google
const Youtube = google.youtube('v3');
const keys = require('../config.json');
const URL = require("url").URL;
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    nameHelp: '**!play <URL ou nome da música que deseja>**: Escolha uma música e curta!',
    description: 'Toca uma música desejada.',
    serverOnly: true,
    args: true,
    usage: "Rise",
    execute(message, args){
        function validHttpURL(string){
            let url;
            try{
                url = new URL(string);
            }catch(err){
                return false;
            }
            return url.protocol === "http:" || url.protocol === "https:";
        };

        if(validHttpURL(args) === false){
            searchByKeyword();
            function searchByKeyword(){
                let results = Youtube.search.list({auth: keys.tokenYoutube, "part": ['id','snippet', ], q: args, maxResults: 25})
                .then(function(response){console.log("Responde", response)});
            };
        };

         if(message.member.voice.channel){
             const voiceChannel = message.member.voice.channel;
            voiceChannel.join().then(connection =>{
                const stream =  ytdl(`${args}`, {filter: 'audioonly'});
                const dispatcher = connection.play(stream);

                 dispatcher.on('finish', () => voiceChannel.leave());
             }).catch(console.error);
         }
    },
};