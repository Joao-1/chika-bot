const music = require("./music1");

module.exports = {
    name: 'pular',
    aliases: ["skip"],
    descripiton: "Pula a música que está tocando no momento.",
    serveOnly: true,
    usage: '&pular',
    execute(message){
        let player = music.getPlayer(message.guild.id);
        if(!player.playing) return message.channel.send("Não estou tocando nada");
        player.skipMusic(message);
    },
};