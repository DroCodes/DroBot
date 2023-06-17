import {
    ActionRowBuilder,
    Events,
    Interaction,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js'

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;


       if (interaction.commandName === 'add-role-message') {
           const modal = new ModalBuilder()
               .setCustomId('reactionRoleMessage')
               .setTitle('Reaction Role message')

           const channelIdInput = new TextInputBuilder()
               .setCustomId('channelId')
               .setLabel('What Channel do you want the message sent in')
               .setStyle(TextInputStyle.Short)
               .setRequired(true)

           const messageInput = new TextInputBuilder()
               .setCustomId('messageInput')
               .setLabel('Message Text')
               .setStyle(TextInputStyle.Paragraph)
               .setRequired(true)

           const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(channelIdInput);
           const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(messageInput);

           modal.addComponents(firstActionRow, secondActionRow);

           // Show the modal to the user
           await interaction.showModal(modal);
       }
    }
}