const music = require('./music');

module.exports = {
	name: 'play',
	aliases: ['p', 'start', 'iniciar', 'tocar'],
	description: 'Toca a primeira música que o bot achar em relação ao que for passado como argumento.',
	serverOnly: true,
	args: true,
	usage: 'r!tocar <nome ou link de alguma música>',
	async execute(message, args) {
		if(message.member.voice.channel) {
			const props = args.join('-');
			const player = music.getPlayer(message.guild.id);
			message.channel.send('Revirando o Youtube. . .');

			try{
				const responseSearch = await player.searchSongs(props, 1, message);
				const saveSearch = new music.SaveSearch(responseSearch, message.author, player);
				player.addQueue(saveSearch.data[0]);
			}
			catch(err) {
				if(err == 'Music not found') {
					message.channel.send('Música não encontrada');
					return;
				};
				message.channel.send('Não consegui pesquisar sua música. Por favor, verifique a ortografia e se o erro persistir, relate para os meus desenvolvedores no meu servidor de ajuda.');
				return;
			};

			if(player.queue.length === 1) {
				try{
					await player.playMusic(message, player.queue);
					message.channel.send(`Achei \`\`${player.queue[0].title} (${player.queue[0].duration})\`\` - Som na Caixa`);
				}
				catch(err) {
					message.channel.send('Não consegui tocar sua música. Por favor, caso o erro persista, relate para os meus desenvolvedores no meu servidor de ajuda.');
					return;
				};
			}
			else{
				music.createListMessage(message, player.queue);
			};
		}
		else{
			message.channel.send('Você precisa estar em um canal de voz para usar esse comando.');
		};
	},
};