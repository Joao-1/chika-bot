const music = require("./music1");

module.exports = {
    name: 'despausar',
    aliases: ["despausar"],
    nameHelp: "**!despausar**: despausa a música.",
    descripiton: "Despausa uma música caso esteja pausada.",
    serveOnly: true,
    execute(message){
        let player = music.getPlayer(message.guild.id);
        if(!player.playing) return message.channel.send("Não estou tocando nada");
        player.resumeMusic(message);
    },
};