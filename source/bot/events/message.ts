import { Discord, On, ArgsOf, Guard } from "discordx";
import { client as Client, notBotGuard } from "../index";

@Discord()
@Guard(notBotGuard)
export abstract class AppDiscord {
  @On("messageCreate")
  public async onMessage(
    [ctx]: ArgsOf<"messageCreate">, // Type message automatically
    client: typeof Client // Client instance injected here,
  ) {
    console.table([
      {
        guild: ctx.guild!.name,
        author: ctx.author?.username,
        content: ctx.content,
      },
    ]);

    // executes message commands
    await client.executeCommand(ctx, { caseSensitive: true });
  }
  @On("messageDelete")
  public async onDelete([ctx]: ArgsOf<"messageDelete">) {
    if (!ctx.guild) return;
    console.table([
      {
        guild: ctx.guild!.name,
        author: ctx.author?.username,
        content: ctx.content,
      },
    ]);
  }
}
