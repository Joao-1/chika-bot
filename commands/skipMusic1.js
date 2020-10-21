const music = require("./music1");

module.exports = {
    name: 'skip',
    aliases: ["pular"],
    nameHelp: "**!pular**: pula a música que está tocando no momento.",
    descripiton: "Pula a música que está tocando no momento.",
    serveOnly: true,
    execute(message){
        let player = music.getPlayer(message.guild.id);
        if(!player.playing) return message.channel.send("Não estou tocando nada");
        player.skipMusic(message);
    },
};