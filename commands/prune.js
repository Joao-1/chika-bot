module.exports = {
	name: 'prune',
	nameHelp: '**!prune <número de mensagens a apagar>**: Apaga uma certa quantia de mensagens (mínimo 1, máximo 99)',
	description: 'Use esse comando para apagar várias mensagens!\n O mínimo é 1 e o máximo 2',
	serverOnly: true,
	cooldown: 5,
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Você precisa usar um número válido como argumento.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('Você precisa usar um número entre 1 e 99.');
		}

		message.channel.bulkDelete(amount, true).then(()=>{
			message.reply("mensagens deletadas com sucesso!");
		}).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};