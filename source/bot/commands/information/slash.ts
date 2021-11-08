import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { client, stripIndents } from "../../index";
import ms from "ms";

/**
 * Ping command
 */
@Discord()
export class PingCommand {
  @Slash("ping", { description: "Sends the bots latency with discord." })
  public async command(
    interaction: CommandInteraction,
    c: typeof client
  ): Promise<void> {
    let embed1 = new MessageEmbed().setDescription("pinging...");
    await interaction.reply({
      embeds: [embed1],
    });

    let embed2 = new MessageEmbed()
      .setDescription(
        stripIndents(`
			> WebSocket: ${ms(c.ws.ping)}
			> DataBase: ~~Soon~~
			> UpTime: ${
        //@ts-ignore
        ms(c.uptime)
      }
      [click me](https://discord.com/api/oauth2/authorize?client_id=883854258112446474&permissions=449629743318&scope=bot%20applications.commands)
			`)
      )
      .setTimestamp()
      .setColor("DARK_BUT_NOT_BLACK")
      .setFooter("...", interaction.user.displayAvatarURL());

    await interaction.editReply({
      embeds: [embed2],
      allowedMentions: { repliedUser: false },
    });
  }
}

/**
 * Stats command
 */
@Discord()
export class StatsCommand {
  @Slash("stats", { description: "Statistics about Taminaru." })
  public async command(interaction: CommandInteraction): Promise<void> {
    const embed = new MessageEmbed().setDescription("coming soon!");
    interaction.reply({ embeds: [embed], ephemeral: false });
  }
}

/**
 * UpVote command
 */
@Discord()
export class UpVoteCommand {
  @Slash("upvote", { description: "Upvote the bot." })
  public async command(interaction: CommandInteraction): Promise<void> {
    const embed = new MessageEmbed().setDescription("coming soon!");
    interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
