const fs = require('fs');
const Discord = require("discord.js");
const {prefix, token} = require("./config.json"); 
const ytdl = require('ytdl-core-discord');

const client = new Discord.Client(); 
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //filtra todos os arquivos .js da pasta commands

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();


client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.serverOnly && message.channel.type === "dm"){
    return message.reply("Eu não consigo executar esse comando na DM :(");
  }

  if (command.args && !args.length) {
        let reply = `Você tem que dar um argumento para esse comando, ${message.author}!` 

        if(command.usage){
            reply += `\nUm exemplo: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
  };
  

  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  };

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownsAmount = (command.cooldown || 3) * 1000;

  if(timestamps.has(message.author.id)){
    const experitionTime = timestamps.get(message.author.id) + cooldownsAmount;

    if(now < experitionTime){
      const timeLeft = (experitionTime - now) / 1000;
      return message.reply(`Por favor, espere ${timeLeft.toFixed(1)} segundos antes de usar esse comando novamente`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownsAmount);

  try {
      command.execute(message, args);
  } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
  };

});

client.login(token); 
