module.exports = {
    name: 'avatar',
    nameHelp: '**!avatar <Usários>**: Retorna o avatar do usário',
	description: 'Pega o avatar do usário.',
	aliases: ['icon', 'pfp'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Seu avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username} avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};