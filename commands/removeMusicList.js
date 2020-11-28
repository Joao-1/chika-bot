const music = require("./music");

module.exports = {
    name: 'delete',
    aliases: ['remove','deletar','remover'],
    descripiton: "Deleta uma música da fila. É necessário um argumento..",
    serverOnly: true,
    args: true,
    usage: "&deletar <posição na fila onde a música se encontra",
    execute(message, args){
        let player = music.getPlayer(message.guild.id);
        if(args == 0 || player.queue.length - 1 < args){
            message.channel.send(`Não achamos nenhuma música nessa posição. Use o comando \`\`rk&queue\`\` para saber qual música irá remover!`);
        }else{
            let removeList = player.queue.splice(args);
            message.channel.send(`**Música** \`\`${removeList[0].Title}\`\`**removida com sucesso!**`);
        };
    },
};