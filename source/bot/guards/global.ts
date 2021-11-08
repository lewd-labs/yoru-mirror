import { GuardFunction, SimpleCommandMessage, ArgsOf } from "discordx";
import { CommandInteraction, DMChannel, Message } from "discord.js";

export const NotBotInteractionGuard: GuardFunction<
  CommandInteraction | SimpleCommandMessage
> = async (arg, _client, next) => {
  if (arg instanceof SimpleCommandMessage) {
    if (await notBotGuard(arg.message)) {
      await next();
    }
  } else {
    if (!arg?.member?.user?.bot) {
      await next();
    }
  }
};

export async function notBotGuard(
  message: Message | CommandInteraction
): Promise<boolean> {
  return message.channel instanceof DMChannel
    ? false
    : !message?.member?.user?.bot;
}

export function Prefix(text: string, replace: boolean = true) {
  const guard: GuardFunction<ArgsOf<"messageCreate"> | CommandInteraction> =
    async (arg, _client, next) => {
      const argObj = arg instanceof Array ? arg[0] : arg;
      if (argObj instanceof CommandInteraction) {
        await next();
      } else {
        const message = argObj;
        const startWith = message.content.startsWith(text);
        if (replace) {
          message.content = message.content.replace(text, "");
        }
        if (startWith) {
          await next();
        }
      }
    };

  return guard;
}
