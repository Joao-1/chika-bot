const music = require("./music1");

module.exports = {
    name: 'delete',
    aliases: ['remove','deletar'],
    nameHelp: "**!delete <posição da música na fila>**: deleta uma música que esteja na fila.",
    descripiton: "Deleta uma música da fila. É necessário um argumento..",
    serverOnly: true,
    args: true,
    usage: "7",
    execute(message, args){
        let player = music.getPlayer(message.guild.id);
        if(args == 0 || player.queue.length - 1 < args){
            message.channel.send(`Não achamos nenhuma música nessa posição. Use o comando \`\`!queue\`\` para saber qual música irá remover!`);
        }else{
            let removeList = player.queue.splice(args);
            message.channel.send(`**Música** \`\`${removeList[0].Title}\`\`**removida com sucesso!**`);
        };
    },
};