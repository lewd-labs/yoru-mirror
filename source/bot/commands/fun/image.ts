import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import got from "got";
import { client } from "../..";
/**
 * Avatar command
 */
// @Discord()
// export class AvatarCommand {
//   @Slash("avatar", {
//     description: "Reply's with a discord avatar from a member you select.",
//   })
//   public async avatar(
//     @SlashOption("user", {
//       description: "The Discord user or user ID",
//       required: true,
//       type: "USER",
//     })
//     userQuery: GuildMember,
//     interaction: CommandInteraction
//   ): Promise<void> {
//     const url = userQuery.user.displayAvatarURL({
//       format: "png",
//       size: 4096,
//       dynamic: true,
//     });

//     const embed = new MessageEmbed()
//       .setAuthor(`User Profile picture`, interaction.user.displayAvatarURL())
//       .setImage(url)
//       .setDescription(`[link](${url})`)
//       .setTimestamp()
//       .setColor(2895667);
//     await interaction.reply({ embeds: [embed], ephemeral: false });
//   }
// }

/**
 * Meme command
 */
@Discord()
export class DiscordBot {
  @Slash("meme", { description: "The best memes on reddit!" })
  public async command(
    interaction: CommandInteraction,
    c: typeof client
  ): Promise<void> {
    const subreddits = [
      "meme",
      "memes",
      "dankmemes",
      "MemeEconomy",
      "ComedyCemetery",
      "PewdiepieSubmissions",
      "PrequelMemes",
    ];
    const randomSubs =
      subreddits[Math.floor(Math.random() * subreddits.length)];
    try {
      let embed = new MessageEmbed();
      // use the slash input, if it does not exist use default meme reddits
      got(`https://www.reddit.com/r/${randomSubs}/random/.json`).then(
        async (response: any) => {
          let content = JSON.parse(response.body);
          let permalink = content[0].data.children[0].data.permalink;
          let memeUrl = `https://reddit.com${permalink}`;
          let memeImage = content[0].data.children[0].data.url;
          let memeTitle = content[0].data.children[0].data.title;
          let memeUpvotes = content[0].data.children[0].data.ups;
          let memeDownvotes = content[0].data.children[0].data.downs;
          let memeNumComments = content[0].data.children[0].data.num_comments;
          embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
          embed.setImage(memeImage);
          embed.setColor("RANDOM");
          embed.setFooter(
            `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
          );
          embed.setTimestamp();
          await interaction.reply({ embeds: [embed], ephemeral: false });
        }
      );
    } catch (err: any) {
      return c.ILogger.error(`[4]${err}`);
    }
  }
}
