const { prefix } = require('../config.json');

module.exports = {
    name: "help",
    nameHelp: '**!help**: Todos os comandos da Chika-Bot',
    descripton: "Lista de todos os comandos da Chika-Bot.",
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args){
        const data = [];
        const {commands} = message.client;
        
        if(!args.length){
            data.push('Aqui está a lista de todos meus comandos:\n');
            data.push(commands.map(command => command.nameHelp).join('\n '));
            data.push(`\nVocê pode usar \`${prefix}help [Nome do comando]\` para uma info específica do comando!`);
            
            return message.author.send(data, {split:true}).then(()=>{
                if(message.channel.type === "dm") return;
                message.reply("Eu mandei todos os meus comandos para você na DM!").catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('Eu não consegui mandar os comandos para você na DM! :( Tem certeza que ela está ativada?');
                });
            })
        }
        
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('Comando não encontrado! Verifique a ortografía.');
        }
        
        data.push(`**Name:** ${command.nameHelp}`);
        
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descrição:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        message.channel.send(data, { split: true });
        
	
    }
};
//const textHelp = "Aqui estão todos meus comandos:";
 //      return message.author.send(textHelp, {split:true}).then(()=>{
//		if(message.channel.type === "dm") return;
//		message.reply("Eu mandei todos os meus comandos para você na DM!").catch(error => {
//			console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
//			message.reply('Eu não consegui mandar os comandos para você na DM! :( Tem certeza que ela está ativada?');
//		});