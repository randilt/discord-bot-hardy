const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token, guildId } = require('./config.json'); // Assuming you have 'guildId' in your config

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// ... Rest of the code remains the same


client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});


client.on('guildMemberAdd', (member) => {
  const roleIdToAdd = '1148647110842011718'; // Role to add initially
  const roleIdToRemove = '1148670004141760573'; // Role to remove after 2 minutes

  const roleToAdd = member.guild.roles.cache.get(roleIdToAdd);
  if (roleToAdd) {
    member.roles.add(roleToAdd).catch(console.error);
  }

  setTimeout(() => {
    const roleToRemove = member.guild.roles.cache.get(roleIdToAdd);
    const roleToAddAfterDelay = member.guild.roles.cache.get(roleIdToRemove);

    if (roleToRemove && roleToAddAfterDelay) {
      member.roles.remove(roleToRemove).catch(console.error);
      member.roles.add(roleToAddAfterDelay).catch(console.error);
    }
  }, 86400*1000); // 2 minutes
});
