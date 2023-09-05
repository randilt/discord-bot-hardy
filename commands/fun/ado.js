const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ado')
		.setDescription('Replyies with a funny message.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Uber cariyada ${interaction.user.username}?, whocaganna thama dagalanne.`);
	},
};