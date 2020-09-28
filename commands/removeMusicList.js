const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'delete',
    aliases: ['remove'],
    serverOnly: true,
    args: true,
    usage: "1",
    execute(message, args){
        if(args == 0 || music.queue.length - 1 < args){
            message.channel.send(`Não achamos nenhuma música nessa posição. Use o comando \`\`!queues\`\` para saber qual música irá remover!`);
        }else{
            let removeList = music.queue.splice(args);
            message.channel.send(`**Música** \`\`${removeList[0].Title}\`\`**removida com sucesso!**`);
        };
    },
};