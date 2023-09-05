const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kickuser')
    .setDescription('Kick a user from the server')
    .addUserOption((option) =>
      option.setName('username')
        .setDescription('Select the user to kick')
        .setRequired(true)
    ),
  async execute(interaction) {
    const userToKick = interaction.options.getUser('username');
    const member = interaction.member;

    if (!member.permissions.has('KICK_MEMBERS')) {
      await interaction.reply('You do not have permission to kick users.');
      return;
    }

    try {
      await interaction.guild.members.kick(userToKick);
      await interaction.reply(`Successfully kicked ${userToKick.tag} from the server.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while trying to kick the user.');
    }
  },
};
