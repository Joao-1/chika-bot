const Discord = require('discord.js');

module.exports = {
	name: 'rikka',
	description: 'Rikka!',
	cooldown: 5,
	usage: 'r!chika',
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#221297')
			.setTitle('**Vote em mim!**')
			.setURL('https://top.gg/bot/751640134595903508/vote')
			.setDescription('**Está gostando de mim?. Digite rk&help para obter todos meus comandos em sua DM!**')
			.setThumbnail('https://i.pinimg.com/originals/a1/ea/72/a1ea72ab04d0ffa0fb679f58c14db7e9.png')
			.addFields(
				{ name: 'Twitter', value: '@sneckfis' },
			// { name: 'Patreon', value: 'NO FUTURO', inline: true },
			)
			.setFooter('Desenvolvido por JoãoVitor#5252');

		message.channel.send(exampleEmbed);
	},
};