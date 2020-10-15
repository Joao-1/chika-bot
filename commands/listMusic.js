const Discord = require("discord.js");
const music = require("./music");
module.exports = {
    name: "queue",
    aliases: ["lista", 'fila', 'list'],
    nameHelp: "**!queue!**: Retorna as músicas que estão na fila de espera.",
    descripiton: "Uma lista com todas as músicas na fila de espera.",
    serverOnly: true,
    async execute(message, args){
        let arg = parseInt(args);
        let playingNow = '';
        let somethingInTheQueue = false;
        let now = 1;
        let numberOfPages = 0;
        var grupo = 0;
        let resultado = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        await separar(music.queue, 5);
        let fila = "Nada na fila";

        if(music.queue.length === 0){
            playingNow = "Nada, mas nunca é tarde para começar a festa!";
        }else{
            playingNow = `[${music.queue[0].Title}](${music.queue[0].URL}) | Requisitado por: ${music.queue[0].MemberReq}`;
        };  
        if(somethingInTheQueue === true){
            if(isNaN(arg)){
                fila = resultado[0];
            }else{
                if(arg - 1 > grupo){
                    fila = resultado[0];
                }else{
                    fila = resultado[arg - 1];
                    now = arg;
                };
            };
        };

        const Embed = new Discord.MessageEmbed()
        .setColor(`#ff6f9c`)
        .setTitle("Lista de músicas na espera")
        .setURL('https://discord.js.org/')
        .addFields(
            {name: 'Tocando agora', value: playingNow},
            {name: 'Na fila', value: fila},
        )
        .setFooter(`${now}\\${grupo + 1 + numberOfPages}`)

        message.channel.send(Embed);

        function separar(base, maximo){
            if(music.queue.length === 1) return;
            let i = 1;
            while(i < music.queue.length){
                somethingInTheQueue = true;
                if(i === music.queue.length){
                    return;
                };
                if(base[i] === undefined){
                    return;
                };
              
                resultado[grupo].push(`\`${i}\` - [${base[i].Title}](${base[i].URL}) | Requisitado por: ${base[i].MemberReq} \n`);
                if(i % maximo === 0){
                    grupo++;
                };
                i++;
                if(i === music.queue.length && resultado[grupo].length == 0) numberOfPages--;
            };
        };
    },
};