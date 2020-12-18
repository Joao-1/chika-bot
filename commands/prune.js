/* eslint-disable linebreak-style */
/* eslint-disable max-len */
module.exports = {
	name: 'apagar',
	aliases: ['prune'],
	description: 'Use esse comando para apagar várias mensagens!\n O mínimo é 1 e o máximo 99',
	serverOnly: true,
	cooldown: 5,
	usage: 'r!apagar <número de mensagens entre 1 e 99 que deseja apagar>',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Você precisa usar um número válido como argumento.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('Você precisa usar um número entre 1 e 99.');
		}

		message.channel.bulkDelete(amount, true).then(()=>{
			message.reply('mensagens deletadas com sucesso!');
		}).catch((err) => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};