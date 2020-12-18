const music = require('./music');

module.exports = {
	name: 'pausar',
	aliases: ['pause'],
	descripiton: 'Pausa a música que está tocando no momento.',
	serveOnly: true,
	usage: 'r!pausar',
	execute(message) {
		const player = music.getPlayer(message.guild.id);
		if(!player.playing) return message.channel.send('Não estou tocando nada');
		const messagesResult = ['Música pausada', 'Como vou pausar algo que já está pausado? Baaaaka!', 'Alö? Não tem nada sendo tocado.'];
		const result = player.pauseMusic();
		message.channel.send(messagesResult[result]);
	},
};