const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Display information about a user')
    .addUserOption((option) =>
      option.setName('username')
        .setDescription('Select the user')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('username');
    await interaction.reply(`User Name: ${user.username}\nUser ID: ${user.id}`);
  },
};
