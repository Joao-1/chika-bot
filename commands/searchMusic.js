/* eslint-disable max-len */
const music = require('./music');
const Discord = require('discord.js');

module.exports = {
	name: 'search',
	aliases: ['procurar'],
	description: 'Diferente do comando play, o search retorna 5 opções de músicas diferentes. Escolha uma dela informando o número correspondendo a música no chat.',
	serverOnly: true,
	args: true,
	usage: 'r!procurar <nome da música que deseja procurar>',
	async execute(message, args) {
		if (message.member.voice.channel) {
			let saveSearch;
			const props = args.join('-');
			const player = music.getPlayer(message.guild.id);

			try {
				saveSearch = new music.SaveSearch(await player.searchSongs(props, 5, message), message.author, player);
			}
			catch (err) {
				console.log(err);
				message.channel.send('Alguma coisa errada aconteceu. Por favor, caso o erro persista, relate para os meus desenvolvedores no meu servidor de ajuda.');
				return;
			};
			const Embed = new Discord.MessageEmbed()
				.setColor('#221297')
				.setTitle('Lista dos resultados:')
				.setURL('https://discord.js.org/')
				.setDescription('**Escolha o número correspondente a sua pesquisa**')
				.setThumbnail('https://i.pinimg.com/originals/6a/bc/6d/6abc6db70d3a8a720739d81b572213d5.png')
				.addFields(
					{ name: '\u200B', value: `\`${1}\` - [${saveSearch.data[0].title}](${saveSearch.data[0].url}) - (${saveSearch.data[0].duration})` },
					{ name: '\u200B', value: `\`${2}\` - [${saveSearch.data[1].title}](${saveSearch.data[1].url}) - (${saveSearch.data[1].duration})` },
					{ name: '\u200B', value: `\`${3}\` - [${saveSearch.data[2].title}](${saveSearch.data[2].url}) - (${saveSearch.data[2].duration})` },
					{ name: '\u200B', value: `\`${4}\` - [${saveSearch.data[3].title}](${saveSearch.data[3].url}) - (${saveSearch.data[3].duration})` },
					{ name: '\u200B', value: `\`${5}\` - [${saveSearch.data[4].title}](${saveSearch.data[4].url}) - (${saveSearch.data[4].duration})` },
				)
				.addField('\u200B', 'Digite ``cancelar`` caso queira cancelar a pesquisa');

			await message.channel.send(Embed);
			const filter = (response) =>{
				return ['1', '2', '3', '4', '5', 'cancel', 'cancelar'].some((number) => number === response.content) && response.author.id === message.author.id;
			};
			const collector = await message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] }).then((collected) =>{
				const content = collected.first().content;
				if (content === 'cancel' || content === 'cancelar') {
					message.channel.send('Busca cancelada');
					return false;
				};
				if (content === '1') {
					player.addQueue(saveSearch.data[0]);
				}
				else if (content === '2') {
					player.addQueue(saveSearch.data[1]);
				}
				else if (content === '3') {
					player.addQueue(saveSearch.data[2]);
				}
				else if (content === '4') {
					player.addQueue(saveSearch.data[3]);
				}
				else if (content === '5') {
					player.addQueue(saveSearch.data[4]);
				};
			}).catch((err)=>{
				message.channel.send('Acha que estou a sua disposição? O tempo já esgotou!');
				return false;
			});

			if (collector === false) return;

			if (player.queue.length === 1) {
				try {
					await player.playMusic(message, player.queue);
					message.channel.send(`Bora tocar \`\`${player.queue[0].title} (${player.queue[0].duration})\`\` - Som na Caixa`);
				}
				catch (err) {
					message.channel.send('Não consegui tocar sua música. Por favor, caso o erro persista, relate para os meus desenvolvedores no meu servidor de ajuda.');
				};
			}
			else {
				music.createListMessage(message, player.queue);
			};
		}
		else {
			message.channel.send('Você precisa estar em um canal de voz para usar esse comando.');
		};
	},
};