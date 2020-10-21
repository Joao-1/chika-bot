module.exports = {
    name: 'prefixo',
    aliases: ['px'],
    nameHelp: '**!prefixo <novo Prefixo>**: mude o prefixo do servidor.',
    description: 'Muda o prefixo do servidor.',
    serverOnly: true,
    args: true,
    usage: "!",
    execute(message, args, server){
        server.prefix = args;
    },
};