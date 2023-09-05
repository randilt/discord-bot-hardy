const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the voice channel'),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    const connection = getVoiceConnection(voiceChannel.guild.id);

    if (!connection) {
      await interaction.reply('I am not in a voice channel in this server!');
      return;
    }

    try {
      connection.destroy();
      await interaction.reply('Left the voice channel.');
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while leaving the voice channel.');
    }
  },
};
