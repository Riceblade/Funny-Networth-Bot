const { Client } = require("discord.js");
const { exit } = require('process');

const client = new Client({
    intents: ["GUILDS"]
});

client.on("ready", function() {
    client.user.setActivity({
        name: "/networth",
        type: "LISTENING"
    });
    console.log("Logged in as " + client.user.tag);
})

const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('networth')
	.setDescription('Gets a players overall networth')
	.addStringOption(option =>
		option.setName('player')
			.setDescription('The targetted players IGN')
			.setRequired(true))
    .addStringOption(option =>
        option.setName('profile')
            .setDescription('The targetted players profile')
            .setRequired(true));

client.on("interactionCreate", async function(interaction) {
    if (interaction.isCommand()) {
        if (interaction.commandName === "networth") {
            let username = interaction.options.getString("player", true);
            let oldUsername = username;
            let profile = interaction.options.getString("profile");
            username = await minecraftUsernameExists(username);
            if (!profile) {
                profile = randomFruitCapitalized();
            }
            if (!username) {
                return interaction.reply({
                    embeds: [
                        {
                            "title": "Error",
                            "type": "rich",
                            "description": "Code: (**500**)\nReason: The player " + oldUsername + " was not found!",
                            "url": null,
                            "timestamp": null,
                            "color": 16711680,
                            "fields": [],
                            "thumbnail": null,
                            "image": null,
                            "author": null,
                            "footer": {
                                "text": "Created by Riceblades11"
                            }
                        }
                    ]
                })
            }
            if (!["Apple", "Banana", "Cherry", "Grape", "Lemon", "Orange", "Pear", "Pineapple", "Strawberry", "Watermelon"].includes(profile.toLowerCase().toProperCase())) {
                return interaction.reply({
                    embeds: [
                        {
                            "title": "Error",
                            "type": "rich",
                            "description": "No profile by the name of " + profile + " was found for " + username + ".",
                            "url": null,
                            "timestamp": null,
                            "color": 16711680,
                            "fields": [],
                            "thumbnail": null,
                            "image": null,
                            "author": null,
                            "footer": {
                                "text": "Created by Riceblades"
                            }
                        }
                    ]
                })
            }
            return interaction.reply({
                embeds: [
                    networthEmbed(username, profile)
                ]
            })
        }
    }
})

function minecraftUsernameExists(username) {
    return new Promise(function(resolve, reject) {
        const request = require('request');
        request('https://api.mojang.com/users/profiles/minecraft/' + username, function (error, response) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(response.body).name);
            } else {
                resolve(false);
            }
        });
    });
}

function randomFruitCapitalized() {
    const fruits = ["Apple", "Banana", "Cherry", "Grape", "Lemon", "Orange", "Pear", "Pineapple", "Strawberry", "Watermelon"];
    return fruits[Math.floor(Math.random() * fruits.length)].toProperCase();
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function networthEmbed(username, profile) {
    return {
        "title": username,
        "type": "rich",
        "description": username + "'s networth is **$1,327,493,547,317.028** (**1.32T**)",
        "url": "https://sky.shiiyu.moe/" + username,
        "timestamp": Date.now(),
        "color": 14692365,
        "fields": [
            {
                "value": "1.27T",
                "name": "<:piggy_bank:788865657311592469>Purse",
                "inline": true
            },
            {
                "value": "0",
                "name": "<:gold_ingot:764855814912606229>Bank",
                "inline": true
            },
            {
                "value": "72.4M",
                "name": "<:gemstone_sack:890926199470170132>Sack's Value",
                "inline": true
            },
            {
                "value": "Guild H Bow ⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 1.03B\n Guild H Sword ✪✪✪✪✪  <:recombobulator:765257492787101736> **→** 974.9M\n Guild H Helmet  <:recombobulator:765257492787101736> **→** 358.7M\n Guild H Orb   **→** 99.0M\n Guild H Chestplate ✪✪✪✪✪  <:recombobulator:765257492787101736> **→** 61.9M",
                "name": "<:storage:841278629040488448>Storage value - 3.98B",
                "inline": false
            },
            {
                "value": "Guild H Sword ⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 2.62B\n Guild H Bow ⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 1.38B\n Guild H Teleporter  <:recombobulator:765257492787101736> **→** 279.9M\n Guild H Double A Battery  <:recombobulator:765257492787101736> **→** 93.1M\n Guild H Wand   **→** 61.0M",
                "name": "<:plasma_flux:771062704244391936>Inventory value - 4.54B",
                "inline": false
            },
            {
                "value": "Guild H Pickaxe  <:recombobulator:765257492787101736> **→** 1.51B\n Guild H Mask  ✦⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 978.8M\n Guild H Orb  <:recombobulator:765257492787101736> **→** 400.0M\n Guild H Helmet ⍟✪✪✪✪  <:recombobulator:765257492787101736> **→** 396.5M\n Guild H Helmet ✪✪✪✪✪ ✦  <:recombobulator:765257492787101736> **→** 392.8M",
                "name": "<:ender_chest:765553375156633610>Enderchest value - 10.02B",
                "inline": false
            },
            {
                "value": "Guild H Head ✪✪✪✪✪   **→** 551.4M\n Guild H Chestplate ⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 422.1M\n Guild H Leggings ⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 407.9M\n Guild H Boots ⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 403.9M",
                "name": "<:superior_helmet:765553400812797984>Armor value - 1.79B",
                "inline": false
            },
            {
                "value": "Guild H Head ⍟⍟⍟⍟✪   **→** 756.1M\n Guild H Helmet  <:recombobulator:765257492787101736> **→** 694.7M\n Guild H Helmet  ✦⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 647.5M\n Guild H Helmet - Tier XII  ✦⍟⍟⍟⍟✪  <:recombobulator:765257492787101736> **→** 545.5M\n Guild H Mining Mask  <:recombobulator:765257492787101736> **→** 496.6M",
                "name": "<:diamond_chestplate:788870951194460161>Wardrobe value - 18.00B",
                "inline": false
            },
            {
                "value": "[Lvl 100] Waste of fucking money  <:common_foraging_exp_boost:815338944081821707>  **→** 2.55B\n [Lvl 100] Tiger ✦ <:minos_relic:815350534595805214>  **→** 1.53B\n [Lvl 100] Stupid fucking sheep ✦ <:minos_relic:815350534595805214>  **→** 1.53B\n [Lvl 200] Legendary Golden Dragon  <:dwarf_turtle_shelmet:815344171585110017>  **→** 1.50B\n [Lvl 100] Legendary Rock ✦ <:rare_mining_exp_boost:815335511736451122>  **→** 942.7M",
                "name": "<:megalodon_pet:769347926735978516>Pet's value - 23.32B",
                "inline": false
            },
            {
                "value": "Strong Master Skull - Tier 7  <:recombobulator:765257492787101736> **→** 811.2M\n Strong Hegemony Artifact  <:recombobulator:765257492787101736> **→** 443.1M\n Strong Ender Relic  <:recombobulator:765257492787101736> **→** 188.1M\n Strong Golden Jerry Artifact  <:recombobulator:765257492787101736> **→** 134.2M\n Strong Artifact of Power  <:recombobulator:765257492787101736> **→** 134.1M",
                "name": "<:hegemony_artifact:771064617588752444>Talisman's value - 2.59B",
                "inline": false
            }
        ],
        "thumbnail": {
            "url": "https://mc-heads.net/head/" + username,
            "height": 191,
            "width": 180
        },
        "image": null,
        "author": null,
        "footer": {
            "text": "Made By Riceblades11! Profile: " + profile
        }
    }
}

client.login("TOKENHERE")
    .catch(console.error);

process.on("unhandledRejection", console.error)