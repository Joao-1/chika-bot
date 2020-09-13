const Discord = require("discord.js");

module.exports = {
    name: "chika",
    nameHelp:"**!chika**",
    description: "Chika!",
    cooldown: 5,
    execute(message){
        const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**Oiii**')
	.setURL('https://discord.js.org/')
	.setAuthor('Chika Fujiwara', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('**Eu sou a secretaria Chika e estou aqui pra lhe atender! Digite !help para obter todos meus comandos em sua DM!**')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

message.channel.send(exampleEmbed);
    }
};