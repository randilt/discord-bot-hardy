const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('move-all')
    .setDescription('Move all users currently joined to a voice channel to your channel'),
  async execute(interaction) {
    const member = interaction.member;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      await interaction.reply('You need to be in a voice channel to use this command.');
      return;
    }

    const guild = interaction.guild;

    // Fetch all members in the server who are currently joined to a voice channel
    const voiceChannelMembers = guild.members.cache.filter((user) => user.voice.channel);

    if (voiceChannelMembers.size === 0) {
      await interaction.reply('There are no users currently joined to voice channels in the server.');
      return;
    }

    try {
      // Move each user in a voice channel to your voice channel
      voiceChannelMembers.forEach(async (user) => {
        await user.voice.setChannel(voiceChannel);
      });

      await interaction.reply(`Moved ${voiceChannelMembers.size} users to your channel.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while moving users.');
    }
  },
};
