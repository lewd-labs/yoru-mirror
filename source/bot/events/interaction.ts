import { Discord, On, ArgsOf } from "discordx";
import { client } from "../index";
@Discord()
export abstract class InteractionEvent {
  @On("interactionCreate")
  public async onMessage(
    [interaction]: ArgsOf<"interactionCreate">,
    c: typeof client
  ) {
    if (!interaction.guildId || !interaction.isCommand()) return;
    await c.executeInteraction(interaction);
  }
}
