import { CommandInteraction, MessageEmbed } from "discord.js";
import { DApplicationCommand, Discord, MetadataStorage, Slash } from "discordx";
import { client } from "../../";
import { Pagination } from "@discordx/utilities";
/**
 * Help command
 */
@Discord()
export abstract class SlashHelp {
  // example: pagination for all slash command
  @Slash("help", { description: "Information for all the commands." })
  async help(interaction: CommandInteraction, c: typeof client): Promise<void> {
    const commands = MetadataStorage.instance.applicationCommands.map(
      (cmd: DApplicationCommand) => {
        return {
          name: cmd.name,
          description: cmd.description,
        };
      }
    );
    const pages: MessageEmbed[] = commands.map(
      (cmd: commandStruct, i: number) => {
        return new MessageEmbed()
          .setFooter(
            `Page ${i + 1} of ${commands.length}`,
            interaction.user.displayAvatarURL()
          )
          .setTitle("**Command List**")
          .addField("Name", cmd.name)
          .addField("Description", cmd.description)
          .setTimestamp()
          .setColor(c.embedColor);
      }
    );

    await new Pagination(interaction, pages).send();
  }
}

type commandStruct = {
  name: string;
  description: string;
};
