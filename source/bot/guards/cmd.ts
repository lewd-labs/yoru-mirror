import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { GuardFunction } from "discordx";

// A function that checks if a channel is nsfw before running a command.
export const nsfwGuard: GuardFunction<CommandInteraction> = async (
  interaction: CommandInteraction,
  _client,
  next
) => {
  if ((interaction.channel as TextChannel).nsfw) {
    // if the channel is nsfw return true
    await next();
  } else {
    const embed = new MessageEmbed()
      .setDescription("You have to be in a NSFW channel to run this command!")
      .setTimestamp()
      .setColor("DARK_RED");

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  }
};
