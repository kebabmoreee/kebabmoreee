const Discord = require('discord.js');
const client = new Discord.Client();

// CFG GET
const config = require('./config.json');

// MAIN CONST
const prefix = config.prefix;
const game = "cry & kebab coding xd";
const activity = "Progress.... WL";

const permission =  config.permission;
const token = config.token;


// CMD CONST
const cmd_formular = config.command_formular;
const cmd_whitelist = config.command_wl;
const cmd_prijat = config.command_potvrdit;
const cmd_zrusit = config.command_zrusit;

// MESSAGE CONST
const message_formular = config.message_formular;
const message_wl = config.message_wl;
const message_error_wl = config.message_error_wl;
const message_error_commnd_wl = config.message_error_commnd_wl;

// ROOMS CONST
const room_wl = config.roomka_wl;
const room_formular = config.roomka_formular;

const adminroom_formular = config.adminroomka_formular;


//ROLES

const role_wl = config.role_wl;
const role_pohovor = config.role_pohovor;
const role_pohovor_zam = config.role_pohovor_zam;
const role_cekawl = config.role_cekawl;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('online')
    client.user.setActivity(game, { type: "STREAMING", url: "https://www.twitch.tv/cryzysek" })
});




//Cannot read property 'content' of undefined


//  DEBUG :  
//client.channels.get(adminroom_formular).send(message_wl);


//
// !wl ----> Přidá roli + Odešle DM s instrukce o formuláři




// CHYBA NEMÁME DEFINOVANOU CHANNEL!!!!!

client.on('message', msg => {
    if (msg.channel.id === room_wl){
        const guildMember = msg.member;
        if (msg.content === prefix + cmd_whitelist){
            if(guildMember.roles.find(role => role.id === role_cekawl)) {
                guildMember.send(message_error_wl);
                msg.delete(10);
            }else {
                guildMember.send(message_wl);
                guildMember.addRole(role_cekawl);
            }
        }else if(msg.content != prefix + cmd_whitelist){ // Cannot read property 'send' of null
            msg.delete(10);
        }
    }else{
        if (msg.content === prefix + cmd_whitelist){
            msg.delete(5000)
            client.channels.get(msg.channel.id).send(`Musíš psát do roomky <#${room_wl}>`);
        }
    }
});



//FORMULAR

client.on('message', msg => {
    if (msg.channel.id === room_formular){
        const guildMember = msg.member;

        if(msg.content.startsWith(prefix + cmd_formular)){
            if(guildMember.roles.find(role => role.id === role_cekawl)){
                const args = msg.content.slice(prefix.length + cmd_formular.length).split(/ +/g);
                client.channels.get(adminroom_formular).send("**Žádost o WL**\nHráč: **" + guildMember + "**\nŽádost: \n" + args);
            }
        }else{
            msg.delete(100);
            guildMember.send(`Chyba, zkus !formular [odpoved]`)

        }
    }
});





// Přijmání Pohovor
client.on('message', (msg) => {
    if (msg.channel.id === adminroom_formular){
        const guildMember = msg.member;
        if (msg.content.startsWith(prefix + cmd_prijat)){
            if(guildMember.roles.find(role => role.id === permission)){
                let user = msg.mentions.users.first()
                let member = msg.mentions.members.first()

                if(msg.mentions.users.first()){
                    client.channels.get(msg.channel.id).send(`Admin: ` + guildMember + "\n Schválil WL hráči: " + user);
                    const embed = new Discord.RichEmbed()
                    .setTitle("Přihláška Přijata")
                    .setThumbnail("http://www.proj3ctx.eu/projectX.png")
                    .setColor("#4db849")
                    .setTimestamp()
                    .addField("Zdravíme tě, " + user.username,
                    "\nGratulujeme ti k postupu k ústnímu pohovoru.\nTvá přihláška byla **schválena**,\nbyla ti přidělena role a teď můžeš jít do čekárny na pohovor.\nNyní vyčkej do 18:00 - 20:00 kdy se dělají pohovory.\n\nDržíme ti palce,\n**ProjectX**")
                    
                    user.send({embed});
                    member.addRole(role_pohovor);
                    member.removeRole(role_cekawl);
                }
            }else{
                msg.delete(100)
                guildMember.send(`Nemáš dostatečné oprávnění k použití tohoto příkazu: ` + prefix + cmd_prijat);
            }
        }
        if (msg.content.startsWith(prefix + cmd_zrusit)){
            if(guildMember.roles.find(role => role.id === permission)){
                let user = msg.mentions.users.first()
                let member = msg.mentions.members.first()
                const args = msg.content.slice(prefix.length + cmd_zrusit.length).split(/ +/g);
                var reason = "";
                var i;

                for(i = 0; i < args.length; i++){
                    if (i === 0){
                        i++
                    }else{
                        reason += args[i] + " ";
                    }
                }

                if(msg.mentions.users.first()){
                    client.channels.get(msg.channel.id).send(`Admin: ` + guildMember + "\n Zamítl WL hráči: " + user);
                    const embed = new Discord.RichEmbed()
                    .setTitle("Přihláška Zamítnuta")
                    .setThumbnail("http://www.proj3ctx.eu/projectX.png")
                    .setColor("#d32a2f")
                    .setTimestamp()
                    .addField("Zdravíme tě, " + user.username,
                    "\nTva přihláška byla zamítnuta z následujícího důvodu: \n**"+ reason +"**\n\nDalší žádost můžeš odeslat za **2 dny**\n**ProjectX**")
                    
                    user.send({embed});
                    member.addRole(role_pohovor_zam);
                    member.removeRole(role_pohovor);
                    member.removeRole(role_cekawl);
                }
            }else{
                msg.delete(100)
                guildMember.send(`Nemáš dostatečné oprávnění k použití tohoto příkazu: ` + prefix + cmd_zrusit);
            }
        }
    }
});























































































client.login(token);

// AHOJKYYY, JAK SE MATE KLUCII?? Ja se mam docela v pohode a vubec nevim jak mam pomoct s botem, kdyz prakticky vim asi tak jednu velkou picu o tom jak to funguje :(
// JOJO ja umim picu - Aephoz 2020 - Kandiduje na presidenta projectu IKS 
// Direct Message()
