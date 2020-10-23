const music = require("./music1");

module.exports = {
    name: 'pausar',
    aliases: ["pause"],
    descripiton: "Pausa a música que está tocando no momento.",
    serveOnly: true,
    usage: '&pausar',
    execute(message){
        let player = music.getPlayer(message.guild.id);
        if(!player.playing) return message.channel.send("Não estou tocando nada");
        player.pauseMusic(message);
    },
};