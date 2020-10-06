const Discord = require("discord.js");
const music = require("./music");
module.exports = {
    name: "queue",
    aliases: ["lista", 'fila', 'list'],
    nameHelp: "**!queue!**: Retorna as músicas que estão na fila de espera.",
    descripiton: "Uma lista com todas as músicas na fila de espera.",
    serverOnly: true,
    execute(message, args){
        let queueList = '';
        let playingNow = '';
        let i = 1;

        if(music.queue.length < 2){
            queueList = "Nada na fila."
        }else{
            while(i <= music.queue.length - 1){
                queueList += `\`${i}\` - [${music.queue[i].Title}](${music.queue[0].URL}) | Requisitado por: ${music.queue[i].MemberReq} \n`
                i++;
            };    
        };

        if(music.queue.length === 0){
            playingNow = "Nada, mas nunca é tarde para começar a festa!";
        }else{
            playingNow = `[${music.queue[0].Title}](${music.queue[0].URL}) | Requisitado por: ${music.queue[0].MemberReq}`;
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