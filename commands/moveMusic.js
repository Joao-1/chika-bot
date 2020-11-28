const music = require("./music");

module.exports = {
    name: 'move',
    aliases: ['mover','m'],
    descripiton: "Move uma música para a posição desejada.",
    serverOnly: true,
    args: true,
    usage: "&mover <Posição atual da música> [Posição nova da música]",
    execute(message, args){
        let player = music.getPlayer(message.guild.id);
        if(!args[1]) args.push(1);
        if(player.playing && player.queue.length > 1){
            if(!isNaN(args[0]) && !isNaN(args[1])){
                if(args.length >= 2){
                    arrayMove(player.queue,args[0],args[1])
                };
            }else{
                message.channel.send("Não entendi seu comando. Use: &mover <Posição atual da música> [Posição nova da música]");
            };
    
            function arrayMove(arr, oldIndex, newIndex){
                if (newIndex > arr.length - 1|| oldIndex > arr.length - 1 || newIndex == 0 || oldIndex == 0){
                    message.channel.send("Não consigo mover uma música que não está na fila ou para alguma posição que não exista.");
                    return;
                };
                arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
                message.channel.send(`A música ${player.queue[args[1]].Title} foi movida para a posição ${args[1]}`);
            };
        }else{
            message.channel.send("É necessário que tenha algo na fila para que eu consiga mudar a posição.")
        };
    },
};