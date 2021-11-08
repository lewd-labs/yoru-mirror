import { Client, SimpleCommandMessage } from "discordx";
import path from "path";
import type { ColorResolvable, ClientOptions, Message } from "discord.js";
import { Intents, Options } from "discord.js";
import type { IconfigType } from "./index";
import {
	Iconfiguration,
	MONGO_URL,
	// MongooseUserProvider,
	// userModelSettings,
} from "./index";
import { Logger } from "@lilywonhalf/pretty-logger";
import mongoose from "mongoose";
const mongo = mongoose.connection;

export class ThatGuyJamalBotCoreClient extends Client {
	// client custom types
	public embedColor: ColorResolvable;
	public ILogger;
	public config: IconfigType;
	public constructor(options?: ClientOptions) {
		super({
			// Discord.js options
			...options,
			allowedMentions: {
				repliedUser: false,
				parse: ["roles", "users", "everyone"],
			},
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				// Intents.FLAGS.GUILD_BANS,
				// Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INTEGRATIONS, // TODO check if necessary
				Intents.FLAGS.GUILD_WEBHOOKS, // TODO check if necessary
				// Intents.FLAGS.GUILD_INVITES,
				// Intents.FLAGS.GUILD_VOICE_STATES,
				// Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_MESSAGES,
				// Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGES,
				// Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
			],
			partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
			shards: "auto",
			shardCount: 1,
			retryLimit: 2,
			rejectOnRateLimit: ["REJECT"],
			makeCache: Options.cacheWithLimits({
				MessageManager: 200, // This is default discord.js
				PresenceManager: 0,
			}),
			http: {
				version: 9,
				api: "https://discord.com/api",
				cdn: "https://cdn.discordapp.com",
				invite: "https://discord.gg",
				template: "https://discord.new",
			},
			// Discord-x options

			//  1: support server
			// ! if no id is passed, all slash commands are global
			botGuilds: process.env.PRODUCTION ? undefined : ["837830514130812970"],
			botId: "883854258112446474",
			simpleCommand: {
				prefix: async (message: Message): Promise<string> => {
					if (message.guild) {
						return process.env.BOT_PREFIX || "s>";
					} else {
						return "s>";
					}
				},
				argSplitter: "",
				responses: {
					notFound: async (command: Message): Promise<void> => {
						command.reply("That is not a valid command, try again!");
					},
					unauthorised: async (
						command: SimpleCommandMessage
					): Promise<void> => {
						this.ILogger.notice(
							`Command: ${command.name} | Was used by unauthorized user.`
						);
					},
				},
			},
			classes: [
				path.join(__dirname, "events", "**/*.{ts,js}"),
				path.join(__dirname, "commands", "**/*.{ts,js}"),
			],
			silent: false,
		});

		this.embedColor = 0x992d22; // default color for message embeds
		this.ILogger = Logger;
		this.config = Iconfiguration;
	}

	/** Starts other client functions */
	private async initializeDataBase(): Promise<void> {
		try {
			await mongoose
				.connect(MONGO_URL, {
					bufferCommands: true,
					autoIndex: true,
					autoCreate: false,
					connectTimeoutMS: 15000,
				})
				.then(async () => {
					/**
					 * Mongoose events
					 */
					await mongo.on("connecting", (): void => {
						this.ILogger.notice(`Connecting to Mongoose Provider...`);
					});
					await mongo.on("connected", (): void => {
						this.ILogger.info(`Mongoose Provider has connected to mongoose.`);
					});
					mongo.on("disconnecting", (): void => {
						this.ILogger.warning(`Mongoose Provider is disconnecting...`);
					});
					mongo.on("disconnected", (): void => {
						this.ILogger.error(`Mongoose Provider has disconnected.`);
					});
				});
			// loading guild models
			// await this.UserSettings.init();
		} catch (err: any) {
			this.ILogger.error(`[66]${err}`);
		}
	}

	// public UserSettings: MongooseUserProvider = new MongooseUserProvider(
	// 	userModelSettings
	// );

	/** Kills all database instances and clients */
	public async destroy(): Promise<void> {
		// kills bot client and mongodb client
		await mongo.close();
		return await super.destroy();
	}

	/**Loads all the start functions for the bot */
	public async init(): Promise<void> {
		await this.initializeDataBase().catch((err: any) => {
			this.ILogger.error(`[1]${err}`);
		});
		try {
			await super.login(process.env.BOT_TOKEN || "");
		} catch (err: any) {
			if (process.env.BOT_TOKEN === undefined || null) {
				throw new Error("Your missing BOT_TOKEN in the .env!");
			} else {
				this.ILogger.error(`[2]${err}`);
				console.error(err);
			}
		}
	}
}

export const client = new ThatGuyJamalBotCoreClient();

client
	.on("error", (err: any | undefined) =>
		client.ILogger.error(`[ CLIENT ERROR ] ${err.message}`)
	)
	.on("warn", (warn: any) => client.ILogger.notice(`[ CLIENT WARN ] ${warn}`));
