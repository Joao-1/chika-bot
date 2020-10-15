const fs = require('fs');
const Discord = require("discord.js");
require('dotenv/config');

const client = new Discord.Client(); 
client.commands = new Discord.Collection();

client.on('ready', () => {
  console.log(`O bot está online - ${client.user.tag}!`);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //filtra todos os arquivos .js da pasta commands

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
};

const cooldowns = new Discord.Collection();


client.on('message', message =>{
  if(!message.content.startsWith(process.env.APP_PREFIX) || message.author.bot) return;
  
  const args = message.content.slice(process.env.APP_PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || 
  client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.serverOnly && message.channel.type === "dm"){
    return message.reply("Eu não consigo executar esse comando na DM :(");
  }

  if (command.args && !args.length) {
        let reply = `Acho melhor melhorar este argumento, ${message.author}, otaku fedido!` 

        if(command.usage){
            reply += `\nUm exemplo: \`${process.env.APP_PREFIX}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
  };
  

  // if(!cooldowns.has(command.name)){
  //   cooldowns.set(command.name, new Discord.Collection());
  // };

  // const now = Date.now();
  // const timestamps = cooldowns.get(command.name);
  // const cooldownsAmount = (command.cooldown || 3) * 1000;

  // if(timestamps.has(message.author.id)){
  //   const experitionTime = timestamps.get(message.author.id) + cooldownsAmount;

  //   if(now < experitionTime){
  //     const timeLeft = (experitionTime - now) / 1000;
  //     return message.reply(`Por favor, espere ${timeLeft.toFixed(1)} segundos antes de usar esse comando novamente`);
  //   }
  // }

  // timestamps.set(message.author.id, now);
  // setTimeout(() => timestamps.delete(message.author.id), cooldownsAmount);

  try {
      command.execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply('Algo de errado aconteceu comigo :( Por favor, se o erro persistir chame meu criador na DM: JoãoVitor#5252');
  };

});

client.login(process.env.DISCORD_TOKEN); 
