module.exports = {
    name: 'entrar',
    aliases:['e','join'],
    description: 'Entra no canal de voz que o membro que solicitou se encontra.',
    serveOnly: true,
    usage: '&entrar',
    execute(message){
        if(message.member.voice.channel){
            message.member.voice.channel.join();
            message.channel.send("Com sua licença, obrigada!")
        }else{
            message.channel.send("Você precisa estar em um canal de voz para que eu consiga entrar.");
        };
    },
};