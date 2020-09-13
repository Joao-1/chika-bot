const prefix = require("../config.json");

module.exports = {
    name: "prefixo",
    nameHelp: "**!mudarprefixo <novo Prefixo>**: Mude o prefixo do Chika-bot.",
    description: "Mudar o prefixo",
    args: true,
    execute(message, args){
        try{
            let p = args;
            prefix.prefix = p;
            message.reply(`prefixo mudado para "${args}"`);
        } catch(error){
            message.reply(`Algo deu errado :( digite **<${prefix}help>** para obter ajuda com os comandos.`);
        };
    }
};