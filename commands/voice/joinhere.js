const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joinhere')
    .setDescription('Join the voice channel you are currently in'),
  async execute(interaction) {
    const member = interaction.member;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      await interaction.reply('You are not in a voice channel!');
      return;
    }

    const connection = getVoiceConnection(voiceChannel.guild.id);

    if (connection) {
      await interaction.reply('I am already in a voice channel in this server!');
    } else {
      try {
        // Attempt to join the voice channel without self-muting and self-deafening
        const newConnection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
          selfDeaf: false, // Bot won't deafen itself
          selfMute: false, // Bot won't mute itself
        });

        await interaction.reply(`Joined the voice channel: ${voiceChannel.name}`);
      } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while joining the voice channel.');
      }
    }
  },
};
