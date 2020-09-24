const Discord = require("discord.js");
const music = require("./music");
module.exports = {
    name: "queue",
    serverOnly: true,
    async execute(message, args){
        let queueList = '';
        let playingNow = '';
        let i = 1;

        if(music.queue.length < 2){
            queueList = "Nada na fila"
        }else{
            while(i <= music.queue.length - 1){
                queueList += `**${i}** - ${music.queue[i].Title} \n`
                i++;
            };    
        };

        if(music.queue.length === 0){
            playingNow = "Nada, mas nunca é tarde para começar a festa!";
        }else{
            playingNow = music.queue[0].Title;
        };

        const Embed = new Discord.MessageEmbed()
            .setColor(`#ff6f9c`)
            .setTitle("Lista de músicas na espera")
            .setURL('https://discord.js.org/')
            .addFields(
                {name: 'Tocando agora', value: playingNow},
                {name: 'Na fila', value: queueList},
                );
    
        message.channel.send(Embed);
    },
};