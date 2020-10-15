const Discord = require("discord.js");
const music = require("./music");

module.exports = {
    name: 'search',
    nameHelp: '**!search <URL ou nome da música que deseja>**: retorna várias opcões de músicas. Escolha uma e curta.',
    description: 'Diferente do comando play, o search retorna 5 opções de músicas diferentes. Escolha uma dela informando o número correspondendo a música no chat.',
    serverOnly: true,
    args: true,
    usage: "Chika Dance",
    async execute(message, args){
        let argument = args.join('-');
        if(message.member.voice.channel){
            console.log(argument);
            await music.searchVideo(argument, message);
            if(music.ResearchResult.length === 0) return;
            
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor(`#ff6f9c`)
            .setTitle("Lista dos resultados:")
            .setURL('https://discord.js.org/')
            .setDescription('**Escolha o número correspondente a sua pesquisa**')
            .setThumbnail('https://i.pinimg.com/736x/5e/9a/03/5e9a033287e21ebbfe5acd1dace7a519.jpg')
            .addFields(
                { name: `\u200B`, value: `\`${1}\` - [${music.ResearchResult[0].Title}](${music.ResearchResult[0].URL})`},
                { name: `\u200B`, value: `\`${2}\` - [${music.ResearchResult[1].Title}](${music.ResearchResult[1].URL})`},
                { name: `\u200B`, value: `\`${3}\` - [${music.ResearchResult[2].Title}](${music.ResearchResult[2].URL})`},
                { name: `\u200B`, value: `\`${4}\` - [${music.ResearchResult[3].Title}](${music.ResearchResult[3].URL})`},
                { name: `\u200B`, value: `\`${5}\` - [${music.ResearchResult[4].Title}](${music.ResearchResult[4].URL})`},
                )
            .addField(`\u200B`, `Digite \`\`cancelar\`\` caso queira cancelar a pesquisa`);
            await message.channel.send(exampleEmbed).then(async () =>{
                const filter = (response) => {
                    return ['1','2','3','4','5','cancel','cancelar'].some(number => number === response.content) && response.author.id === message.author.id;
                };
                message.channel.awaitMessages(filter, {max: 1, time:20000, errors: ['time']}).then(collected =>{
                    let content = collected.first().content;
                    if(content === 'cancel' || content === 'cancelar'){
                        message.channel.send("Busca cancelada!");
                        music.ResearchResult.length = 0;
                    };
                    if(content === '1'){
                        music.queue.push(music.ResearchResult[0]);
                        music.ResearchResult.length = 0;
                        play();
                    }else if(content === '2'){
                        music.queue.push(music.ResearchResult[1]);
                        music.ResearchResult.length = 0;
                        play();
                    }else if(content === '3'){
                        music.queue.push(music.ResearchResult[2]);
                        music.ResearchResult.length = 0;
                        play();
                    }else if(content === '4'){
                        music.queue.push(music.ResearchResult[3]);
                        music.ResearchResult.length = 0;
                        play();
                    }else if(content === '5'){
                        music.queue.push(music.ResearchResult[4]);
                        music.ResearchResult.length = 0;
                        play();
                    };
                }).catch(collected => {
                    message.channel.send('Acha que estou a sua disposição? O tempo já esgotou! Tente mais tarde, se puder hihihi');
                    music.ResearchResult.length = 0;
                });
            });

            function play(){
                if(music.queue.length === 1){
                    music.playMusic(message, music.queue);
                }else if(music.queue.length === 0){
                    console.log("Busca cancelada");
                }else{
                    music.createListMessage(message, music.queue);
                };
            };
        }else{
            message.channel.send("Você precisa estar em um canal de voz para usar esse comando.")
        };

    },
};





















            //     await embedMessage.react(`1️⃣`);
            //     await embedMessage.react(`2️⃣`);
            //     await embedMessage.react(`3️⃣`);
            //     await embedMessage.react(`4️⃣`);
            //     await embedMessage.react(`5️⃣`);
            //     const filter = (reaction, user)=>{
            //         return [`1️⃣`,`2️⃣`,`3️⃣`,`4️⃣`,`5️⃣`].includes(reaction.emoji.name)
            //         && user.id === message.author.id;
            //     };
            //     let collector = embedMessage.createReactionCollector(filter, {time: 20000});
            //     collector.on(`collect`, async(reaction, reactionCollector)=>{
                // if(reaction.emoji.name === `1️⃣`){
                //     music.queue.push(music.ResearchResult[0]);
                //     music.ResearchResult.length = 0;
                //     play();
                // }else if(reaction.emoji.name === `2️⃣`){
                //     music.queue.push(music.ResearchResult[1]);
                //     music.ResearchResult.length = 0;
                //     play();
                // }else if(reaction.emoji.name === `3️⃣`){
                //     music.queue.push(music.ResearchResult[2]);
                //     music.ResearchResult.length = 0;
                //     play();
                // }else if(reaction.emoji.name === `4️⃣`){
                //     music.queue.push(music.ResearchResult[3]);
                //     music.ResearchResult.length = 0;
                //     play();
                // }else if(reaction.emoji.name === `5️⃣`){
                //     music.queue.push(music.ResearchResult[4]);
                //     music.ResearchResult.length = 0;
                //     play();
                // };
            //     });