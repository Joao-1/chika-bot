const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const google = require('googleapis').google;
const youtube = google.youtube('v3');
require('dotenv/config');

const players = {};

function getPlayer(server) {
	if (!players[server]) players[server] = new Player();
	return players[server];
};

class Player {
	constructor() {
		this.queue = [];
	};
	addQueue(queue) {
		this.queue.push(queue);
	};
	async searchSongs(args, max, message) {
		const songs = [];
		let searchID = '';
		let details = {};
		let results = {};
		try {
			results = await youtube.search.list({
				key: process.env.KEY_GOOGLE,
				part: 'snippet',
				q: args + ', music',
				type: 'video',
				maxResults: max,
			});
			if (results.data.items.length === 0) {
				throw 'Music not found';
			};
			results = results.data.items;
			for (let i = 0; i <= max - 1; i++) {
				searchID += `${results[i].id.videoId},`;
			};
			details = await youtube.videos.list({
				id: searchID,
				key: process.env.KEY_GOOGLE,
				part: ['contentDetails', 'statistics'],
				safeSearch: 'strict',
				order: 'relevance',
			});
			for (let i = 0; i <= max - 1; i++) {
				songs.push({
					url: `https://youtube.com/watch?v=${results[i].id.videoId}`,
					title: results[i].snippet.title,
					channel: results[i].snippet.channelTitle,
					thumbnail: results[i].snippet.thumbnails.medium.url,
					duration: details.data.items[i].contentDetails.duration.slice(2).toLocaleLowerCase(),
					views: details.data.items[i].statistics.viewCount,
					memberReq: message.author.tag,
				});
			};
			return songs;
		}
		catch (err) {
			throw new Error(err);
		};
	};
	async playMusic(message, queue) {
		try {
			const voiceChannel = message.member.voice.channel;
			const connection = await voiceChannel.join();
			const stream = ytdl(queue[0].url, { filter: 'audioonly', highWaterMark: 1 << 25 });
			const dispatcher = await connection.play(stream);
			this.playing = dispatcher;
			dispatcher.on('finish', () => {
				queue.shift();
				if (queue.length >= 1) {
					this.playMusic(message, queue);
				}
				else {
					connection.disconnect();
				};
			});
		}
		catch (err) {
			throw new Error(err);
		};
	};
	pauseMusic() {
		if (this.playing) {
			if (!this.playing.paused) {
				this.playing.pause();
				return 0;
			}
			else {
				return 1;
			};
		}
		else {
			return 2;
		};
	};
	resumeMusic() {
		if (this.playing) {
			if (this.playing.paused) {
				this.playing.resume();
				return 0;
			}
			else {
				return 1;
			};
		}
		else {
			return 2;
		};
	};
	skipMusic() {
		if (this.playing) {
			if (this.queue.length > 1) {
				this.playing.end();
			}
			else {
				return 0;
			};
		}
		else {
			return 1;
		};
	};
	endMusic(message) {
		if (this.playing) {
			this.playing.end();
			this.queue.length = 0;
			message.member.voice.channel.leave();
			return 0;
		}
		else {
			return 1;
		};
	};
	listSongs(arg, player) {
		const args = parseInt(arg);
		let playingNow = 'Não estou tocando nada no momento!';
		let inQueue = 'Nada na fila';
		this.somethingInTheQueue = false;
		this.numberOfPages = 0;
		this.grup = 0;
		this.pageNow = 1;
		this.result = [[], [], []];
		separateSongs(player, 5);
		if (this.queue.length >= 1) {
			playingNow = `[${this.queue[0].title}](${'https://' + this.queue[0].url}) - ${player.queue[0].duration} | Requisitado por: ${this.queue[0].memberReq}`;
		};

		if (this.somethingInTheQueue === true) {
			if (isNaN(args)) {
				inQueue = this.result[0];
			}
			else {
				if (args - 1 > this.grup) {
					inQueue = this.result[0];
				}
				else {
					inQueue = this.result[args - 1];
					this.pageNow = args;
				};
			};
		};
		const pageNow = this.pageNow;
		const numberOfPages = this.grup + 1 + this.numberOfPages;
		return {
			playingNow,
			inQueue,
			pageNow,
			numberOfPages,
		};
	};
};

class SaveSearch {
	constructor(data, user, player) {
		this.player = player;
		this.user = user;
		this.data = data;
	};
};

function createListMessage(message, queue) {
	const Embed = new Discord.MessageEmbed()
		.setAuthor('Adicionado a fila', message.author.avatarURL())
		.setColor('#221297')
		.setTitle(queue[queue.length - 1].title)
		.setURL(queue[queue.length - 1].url)
		.setThumbnail(queue[queue.length - 1].thumbnail, { width: 120, height: 90 })
		.addFields(
			{ name: 'Canal', value: `${queue[queue.length - 1].channel}`, inline: true },
			{ name: 'Duração', value: `${queue[queue.length - 1].duration}`, inline: true },
			{ name: 'Visualizações', value: `${parseInt((queue[queue.length - 1].views)).toLocaleString('pt-br')}`, inline: true },
			{ name: 'Posição na fila de espera', value: `${queue.length - 1}` },
		);
	message.channel.send(Embed);
};

function separateSongs(player, maximo) {
	if (player.queue.length === 1 || player.queue.length === 0) return;
	player.somethingInTheQueue = true;
	let i = 1;
	while (i < player.queue.length) {
		if (i === player.queue.length) {
			return;
		};
		if (player.queue[i] === undefined) {
			return;
		};
		player.result[player.grup].push(`\`${i}\` - [${player.queue[i].title}](${player.queue[i].url}) - ${player.queue[i].duration} | Requisitado por: ${player.queue[i].memberReq} \n`);
		if (i % maximo === 0) {
			player.grup++;
		};
		if (i === player.queue.length && player.result[player.grup] == undefined) player.numberOfPages--;
		i++;
	};
};

module.exports = {
	Player,
	SaveSearch,
	getPlayer,
	separateSongs,
	createListMessage,
};
