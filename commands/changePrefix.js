module.exports = {
    name: 'prefixo',
    aliases: ['px','prefix'],
    description: 'Muda o prefixo do servidor.',
    serverOnly: true,
    args: true,
    usage: "&prefixo <novo prefixo>",
    execute(message, args, server){
        server.prefix = args;
        message.channel.send("Prefixo mudado com sucesso!");
    },
};