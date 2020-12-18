const music = require('./music');
const Discord = require('discord.js');
module.exports = {
	name: 'lista',
	aliases: ['fila', 'list', 'queue'],
	descripiton: 'Uma lista com todas as músicas na fila de espera.',
	serverOnly: true,
	usage: 'r!lista',
	async execute(message, args) {
		const player = music.getPlayer(message.guild.id);
		const embedResult = player.listSongs(args, player);
		const embed = new Discord.MessageEmbed()
			.setColor('#221297')
			.setTitle('Lista de músicas na espera')
			.setURL('https://discord.js.org/')
			.addFields(
				{ name: 'Tocando agora', value: embedResult.playingNow },
				{ name: 'Na fila', value: embedResult.inQueue },
			)
			.setFooter(`${embedResult.now}\\${embedResult.page}`);
		message.channel.send(embed);
	},
};