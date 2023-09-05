const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Clear a specified number of messages from the channel')
    .addIntegerOption((option) =>
      option.setName('amount')
        .setDescription('Number of messages to clear')
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const member = interaction.member;

    if (!member.permissions.has('ADMINISTRATOR')) {
      await interaction.reply('You must have administrator permissions to use this command.');
      return;
    }

    if (amount <= 0 || amount > 100) {
      await interaction.reply('Please specify a valid number of messages to clear (1-100).');
      return;
    }

    // Fetch and delete messages
    const messages = await interaction.channel.messages.fetch({ limit: amount + 1 });
    await interaction.channel.bulkDelete(messages);
    await interaction.reply(`Cleared ${amount} messages.`);
  },
};
