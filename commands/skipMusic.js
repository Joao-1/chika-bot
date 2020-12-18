const music = require('./music');

module.exports = {
	name: 'pular',
	aliases: ['skip'],
	descripiton: 'Pula a música que está tocando no momento.',
	serveOnly: true,
	usage: 'r!pular',
	execute(message) {
		const player = music.getPlayer(message.guild.id);
		if(!player.playing) return message.channel.send('Não estou tocando nada');
		const messagesResult = ['Não tenho mais nenhuma música na fila para tocar.', 'Preciso estar tocando algo para conseguir pular de tocar algo, não? Hm'];
		const result = player.skipMusic();
		message.channel.send(messagesResult[result]);
	},
};