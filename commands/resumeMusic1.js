const music = require("./music1");

module.exports = {
    name: 'despausar',
    aliases: ["despausar"],
    descripiton: "Despausa uma música caso esteja pausada.",
    serveOnly: true,
    usage: '&despusar',
    execute(message){
        let player = music.getPlayer(message.guild.id);
        if(!player.playing) return message.channel.send("Não estou tocando nada");
        player.resumeMusic(message);
    },
};