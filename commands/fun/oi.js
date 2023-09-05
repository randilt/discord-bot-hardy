const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oi')
    .setDescription('Send a custom "Oi" message to a user')
    .addUserOption((option) =>
      option.setName('username')
        .setDescription('Mention a user')
        .setRequired(true)
    ),
  async execute(interaction) {
    const mentionedUser = interaction.options.getUser('username');
    
    if (!mentionedUser) {
      await interaction.reply('You need to mention a user to use this command.');
      return;
    }

    const responseMessage = `Oi pissekda hutto ${mentionedUser.toString()}`;
    
    await interaction.reply(responseMessage);
  },
};
