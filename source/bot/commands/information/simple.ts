import { Discord, SimpleCommand, SimpleCommandMessage } from "discordx";
import { client } from "../../index";
import { Iconfiguration } from "../../index";

@Discord()
export class messageCommand {
  /** Ping command */
  @SimpleCommand("ping", {
    aliases: ["pong"],
    description: "Sends the bot latency!",
    directMessage: true,
  })
  async ping(ctx: SimpleCommandMessage, c: typeof client) {
    ctx.message.reply(
      `Hello :) ${ctx.message.author.username}, my ping is \`${c.ws.ping}ms\``
    );
  }
  /**Invite command */
  @SimpleCommand("invite", {
    description: "Sends the bot latency!",
    directMessage: true,
  })
  async invite(ctx: SimpleCommandMessage) {
    await ctx.message.reply(
      `Click this link to invite me, **${Iconfiguration.urls.discord_invite}**`
    );
  }
}
