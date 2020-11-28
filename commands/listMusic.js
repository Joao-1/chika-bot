const music = require("./music");

module.exports = {
    name: "lista",
    aliases: ["lista", 'fila', 'list', 'queue'],
    descripiton: "Uma lista com todas as músicas na fila de espera.",
    serverOnly: true,
    usage: '&lista',
    async execute(message, args){
        let player = music.getPlayer(message.guild.id);
        await player.listSongs(message,args,player);
    },
};