import { Discord, On, ArgsOf } from "discordx";
import { client as Client } from "../index";

@Discord()
export abstract class AppDiscord {
  @On("ready")
  public onReady([]: ArgsOf<"ready">, client: typeof Client): void {
    // sets bot display status
    client.user?.setPresence({
      afk: false,
      /**
       * The content displayed to users
       * @param activities array of interface PresenceData
       * @description  Options: 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' | 'CUSTOM_STATUS' | 'COMPETING';
       */
      activities: [{ name: "the meta verse?", type: "PLAYING" }],
      /**
       * @param String status 'invisible' | 'dnd' | 'offline' | 'online' | 'idle'
       * Options for status
       */
      status: "online",
    });
    // clears app commands
    // client.clearApplicationCommands()
    // loading commands
    // init all applicaiton commands
    client.initApplicationCommands({
      guild: { log: true },
      global: { log: true },
    });

    // init permissions; enabled log to see changes
    client.initApplicationPermissions(true);

    client.ILogger.info(
      `${client.user?.username} is connected to the discord servers!`
    );
  }
  @On("rateLimit")
  public async onRate([limit]: ArgsOf<"rateLimit">) {
    await Client.ILogger.info(
      `RATELIMITED:\n\n${JSON.stringify(limit, null, 4)}`
    );
  }
  catch(err: any) {
    Client.ILogger.error(`[5]${err}`);
  }
  @On("debug")
  public async onDebug([debug]: ArgsOf<"debug">) {
    if (process.env.PRODUCTION || false === false) {
      Client.ILogger.info(debug);
    }
  }
}
