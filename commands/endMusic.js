const Discord = require('discord.js');
const music = require('./music');

module.exports = {
	name: 'terminar',
	aliases: ['t', 'end', 'disconnect', 'sair', 'leave'],
	description: 'Deixa o canal de voz e limpa a fila de músicas do servidor',
	serveOnly: true,
	usage: 'r!terminar',
	execute(message) {
		if(message.guild.me.voice.channel) {
			const player = music.getPlayer(message.guild.id);
			const messagesResult = ['Byeee!', 'Preciso estar tocando algo para conseguir pular de tocar algo, não? Hm'];
			const result = player.endMusic(message);
			message.channel.send(messagesResult[result]);
		}
		else{
			message.channel.send('Eu não estou em nenhum canal de voz no momento!');
		};
	},
};