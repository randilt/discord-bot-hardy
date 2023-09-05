const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('assignment')
    .setDescription('Create a new assignment')
    .addStringOption(option =>
      option.setName('subject')
        .setDescription('Name of the subject for the assignment')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('group')
        .setDescription('Role of the group for the assignment')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('due_date')
        .setDescription('Due date for the assignment')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('brief')
        .setDescription('Assignment brief')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Check if the user who issued the command is an admin
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      await interaction.reply('Only admins can use this command.');
      return;
    }

    // Your command logic goes here
    const subject = interaction.options.getString('subject');
    const group = interaction.options.getString('group');
    const dueDate = interaction.options.getString('due_date');
    const brief = interaction.options.getString('brief');

    // Get the channel by ID
    const channelId = '1146122607226278003'; // Replace with your channel ID
    const channel = interaction.client.channels.cache.get(channelId);

    if (!channel) {
      await interaction.reply('Channel not found. Please check the channel ID.');
      return;
    }

    // Perform actions based on the command data
    // For example, send a message to the specified channel
    const message = `📢 New Assignment Alert!\n\n`
      + `**Subject**: ${subject}\n`
      + `**Group**: ${group}\n`
      + `**Due Date**: ${dueDate}\n`
      + `**Assignment Brief**: ${brief}\n`;

    await channel.send(message);

    // Respond to the user in the interaction
    await interaction.reply(`Assignment announcement sent to <#${channelId}>.`);
  },
};
