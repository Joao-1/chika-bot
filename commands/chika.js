const Discord = require("discord.js");


module.exports = {
    name: "chika",
    nameHelp:"**!chika**",
    description: "Chika!",
    cooldown: 5,
    execute(message){
        const exampleEmbed = new Discord.MessageEmbed()
		.setColor('#ff6f9c')
		.setTitle('**Vote em mim!**')
		.setURL('https://discord.js.org/')
		.setDescription('**Eu sou a secretaria Chika e estou aqui pra lhe atender. Digite !help para obter todos meus comandos em sua DM!**')
		.setThumbnail('https://i.pinimg.com/originals/1e/ae/8e/1eae8e9753690c193232b5eb77d8849f.png')
		.addFields(
			{ name: 'Twitter', value: `[@sneckfis](https://twitter.com/sneckfis)`},
			{ name: 'Patreon', value: 'NO FUTURO', inline: true },
		)
		.setTimestamp()
		.setFooter('Desenvolvido por JoãoVitor#5252', 'https://i.pinimg.com/originals/29/8c/56/298c565e1d66f648108cc2650a51d386.jpg');

		message.channel.send(exampleEmbed);
    }
};