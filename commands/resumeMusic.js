const music = require('./music');

module.exports = {
	name: 'despausar',
	aliases: ['despausar', 'resume'],
	descripiton: 'Despausa uma música caso esteja pausada.',
	serveOnly: true,
	usage: 'r!despusar',
	execute(message) {
		const player = music.getPlayer(message.guild.id);
		if(!player.playing) return message.channel.send('Não estou tocando nada');
		const messagesResult = ['Música despausada', 'Não encontrei nenhuma música pausada.', 'Alö? Não tem nada sendo tocado.'];
		const result = player.resumeMusic();
		message.channel.send(messagesResult[result]);
	},
};