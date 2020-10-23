const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['commands','ajuda','comandos'],
    nameHelp: '**!help**: Todos os comandos da Chika-Bot',
    descripton: "Lista de todos os comandos da Chika-Bot.",
    usage: '[nome do comando]',
    execute(message, args){
        if(!args.length){
            const embedHelp = new Discord.MessageEmbed()
            .setColor('#ff6f9c')
            .setTitle('Olá')
            .setThumbnail("https://i.pinimg.com/originals/66/b7/66/66b766fb125df7664502ffc98a02fff5.jpg")
            .setDescription('Aqui está todos os meus comandos!')
            .addFields(
                {name: 'Música', value:"tocar, procurar, limpar, terminar, entrar, lista, pausar, despausar, remover, pular"},
                {name: 'Para o servidor', value: "apagar"}
            )
            message.author.send(embedHelp).then(()=>{
                if(message.channel.type === "dm") return;
                message.channel.send("Mandei todos os meus comandos para você na DM!").catch(error => {
                console.error(`Nao consegui mandar ajuda para o membro ${message.author.tag}.\n`, error);
                message.channel.send('Eu não consegui mandar os comandos para você na DM! :( Tem certeza que ela está ativa?');
                return;
             });
            });
        };

        if(args.length){
            const {commands} = message.client;
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    
            if(!command) return message.reply('Comando não encontrado! Verifique a ortografía.');
    
            let commandHelp = [];
            commandHelp.push({name: "Descrição:", value: `${command.description}`})
            commandHelp.push({name: "Aliases:", value: `${command.aliases}`})
            if(command.usage) commandHelp.push({name: "Exemplo:", value: `${command.usage}`});
    
            const embedHelp = new Discord.MessageEmbed()
            .setColor('#ff6f9c')
            .setTitle(`${command.name}`)
            .addFields(commandHelp);
    
            message.channel.send(embedHelp);
        };
    },
};

// const data = [];
// const {commands} = message.client;

// if(!args.length){
//     data.push('Aqui está a lista de todos meus comandos:\n');
//     data.push(commands.map(command => command.nameHelp).join('\n '));
//     data.push(`\nVocê pode usar \`${process.env.APP_PREFIX}help [Nome do comando]\` para uma info específica do comando!`);
    
//     return message.author.send(data, {split:true}).then(()=>{
//         if(message.channel.type === "dm") return;
//         message.reply("Eu mandei todos os meus comandos para você na DM!").catch(error => {
//             console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
//             message.reply('Eu não consegui mandar os comandos para você na DM! :( Tem certeza que ela está ativada?');
//         });
//     })
// }

// const name = args[0].toLowerCase();
// const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

// if (!command) {
//     return message.reply('Comando não encontrado! Verifique a ortografía.');
// }

// data.push(`**Nome:** ${command.nameHelp}`);

// if (command.aliases) data.push(`**Outras formas de usar este comando:** ${command.aliases.join(', ')}`);
// if (command.description) data.push(`**Descrição:** ${command.description}`);
// if (command.usage) data.push(`**Exemplo de uso:** ${process.env.APP_PREFIX}${command.name} ${command.usage}`);

// message.channel.send(data, { split: true });

