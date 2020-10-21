const music = require("./music1");

module.exports = {
    name: "lista",
    aliases: ["lista", 'fila', 'list', 'queue'],
    nameHelp: "**!lista**: Retorna as músicas que estão na fila de espera.",
    descripiton: "Uma lista com todas as músicas na fila de espera.",
    serverOnly: true,
    async execute(message, args){
        let player = music.getPlayer(message.guild.id);
        await player.listSongs(message,args,player);
    },
};