const music = require("./music1");

module.exports = {
    name: 'limpar',
    aliases:['l'],
    nameHelp: '**!limpar**: limpa toda a fila de músicas.',
    description: 'Limpa a fila de música do servidor.',
    serveOnly: true,
    execute(message){
        if(music.queue.length > 1){
            let player = music.getPlayer(message.guild.id);
            player.queue.splice(1);
            message.channel.send("Fila limpa!");
        }else{
            message.channel.send("A fila já está limpa.");
        };
    },
};