"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_hybrid_sharding_1 = __importDefault(require("discord-hybrid-sharding"));
const config_1 = require("../../../config");
const manager = new discord_hybrid_sharding_1.default.Manager(`../../structures/client.bot`, {
  totalShards: "auto",
  shardsPerClusters: 2,
  mode: "process",
  token: config_1.ENV.bot.token,
});
manager.on("clusterCreate", (cluster) => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });
//# sourceMappingURL=shard.js.map

import { Message } from "discord.js";
export declare class IEventLogger {
  private _logger;
  private _logChannelID;
  private _client;
  shardLog(ctx: Message, level: logLevel, message: string): Promise<void>;
  commandLog(ctx: Message, level: logLevel, message: string): Promise<void>;
  blackListLogs(ctx: Message, level: blackListLevel, message: string): Promise<void>;
  joinLogs(ctx: Message, level: guildEventLevel, message: string): Promise<void>;
}
export declare enum logLevel {
  info = "info",
  warn = "warn",
  error = "error",
  debug = "debug"
}
export declare enum guildEventLevel {
  join = "GUILD_CREATE",
  leave = "GUILD_DELETE"
}
export declare enum blackListLevel {
  user = "USER",
  guild = "GUILD"
}
//# sourceMapping

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blackListLevel = exports.guildEventLevel = exports.logLevel = exports.IEventLogger = void 0;
const framework_1 = require("@sapphire/framework");
const config_1 = require("../../../config");
const embed_1 = require("../../util/extensions/embed");
class IEventLogger {
  _logger = framework_1.container.logger;
  _logChannelID = {
    join_leave: config_1.ENV.logger.join_leave_channel,
    shards: config_1.ENV.logger.shard_channel,
    api: config_1.ENV.logger.api_channel,
    blacklisted: config_1.ENV.logger.black_list_channel,
    commands: config_1.ENV.logger.command_channel,
  };
  _client = framework_1.container.client;
  async shardLog(ctx, level, message) {
    let channel = this._client.channels.cache.get(this._logChannelID.shards);
    if (channel && channel.type === "GUILD_TEXT" && ctx.guild) {
      this._logger.info(`[SHARD] ${level} | ${message} was sent to ${channel.name}`);
      switch (level) {
        case logLevel.info:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Shard ${ctx.guild.shard.id}`,
                description: message,
                color: "LIGHT_GREY",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case logLevel.warn:
          var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
          };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UserEvent = void 0;
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Shard ${ctx.guild.shard.id}`,
                description: message,
                color: "YELLOW",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case logLevel.error:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Shard ${ctx.guild.shard.id}`,
                description: message,
                color: "RED",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case logLevel.debug:
          var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
          };
          Object.defineProperty(exports, "__esModule", { value: true });
          exports.UserEvent = void 0;
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Shard ${ctx.guild.shard.id}`,
                description: message,
                color: "DARK_BLUE",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        default:
          break;
      }
    }
  }
  async commandLog(ctx, level, message) {
    let channel = this._client.channels.cache.get(this._logChannelID.commands);
    if (channel && channel.type === "GUILD_TEXT" && ctx.guild) {
      this._logger.info(`[COMMAND] ${level} | ${message} was sent to ${channel.name}`);
      switch (level) {
        case logLevel.info:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Command Info Event`,
                description: message,
                color: "LIGHT_GREY",
                timestamp: new Date(),
              }),
            ],
          });
          { "version": 3, "file": "config.js", "sourceRoot": "", "sources": ["../../../typings/config.ts"], "names": [], "mappings": "" }
          function T(k) {
            return k;
          }
          exports.T = T;
          function FT(k) {
            return k;
          }
          break;
        case logLevel.warn:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Command Warn Event`,
                description: message,
                color: "YELLOW",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case logLevel.error:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Command Error Event`,
                description: message,
                color: "RED",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case logLevel.debug:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Command Debug Event`,
                description: message,
                color: "DARK_BLUE",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        default:
          break;
      }
    }
  }
  async blackListLogs(ctx, level, message) {
    let channel = this._client.channels.cache.get(this._logChannelID.blacklisted);
    if (channel && channel.type === "GUILD_TEXT" && ctx.guild) {
      this._logger.info(`[BLACKLIST] ${level} | ${message} was sent to ${channel.name}`);
      switch (level) {
        case blackListLevel.guild:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `New Blacklisted Guild`,
                description: message,
                color: "DARK_RED",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case blackListLevel.user:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `New Blacklisted User`,
                description: message,
                color: "RED",
                timestamp: new Date(),
              }),
            ],
          });
          function T(k) {
            return k;
          }
          function FT(k) {
            return k;
          }
          function T(k) {
            return k;
          }
          function FT(k) {
            return k;
          }
          break;
        default:
          break;
      }
    }
  }
  async joinLogs(ctx, level, message) {
    let channel = this._client.channels.cache.get(this._logChannelID.join_leave);
    if (channel && channel.type === "GUILD_TEXT" && ctx.guild) {
      this._logger.info(`[JOIN/LEAVE] emitted on level: ${level} | ${ctx.guild.name}`);
      switch (level) {
        case guildEventLevel.join:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Join Event`,
                description: message,
                color: "GREEN",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        case guildEventLevel.leave:
          await channel.send({
            embeds: [
              new embed_1.YoruEmbed({
                title: `Leave Event`,
                description: message,
                color: "RED",
                timestamp: new Date(),
              }),
            ],
          });
          break;
        default:
          break;
      }
    }
  }
}
exports.IEventLogger = IEventLogger;
var logLevel;
(function (logLevel) {
  logLevel["info"] = "info";
  logLevel["warn"] = "warn";
  logLevel["error"] = "error";
  logLevel["debug"] = "debug";
})(logLevel = exports.logLevel || (exports.logLevel = {}));
var guildEventLevel;
(function (guildEventLevel) {
  guildEventLevel["join"] = "GUILD_CREATE";
  guildEventLevel["leave"] = "GUILD_DELETE";
})(guildEventLevel = exports.guildEventLevel || (exports.guildEventLevel = {}));
var blackListLevel;
(function (blackListLevel) {
  blackListLevel["user"] = "USER";
  blackListLevel["guild"] = "GUILD";
})(blackListLevel = exports.blackListLevel || (exports.blackListLevel = {}));
//# sourceMappingURL=logger.js.map

import { container } from "@sapphire/framework";
import { Collection } from "discord.js";
import { YoruClient } from "../../structures/client/bot";
export declare const CommandCountCacheCollection: Collection<string, number>;
export declare class StatisticsHandler {
  client: import("@sapphire/pieces").Container;
  constructor(c: typeof container);
  init(): void;
  private cacheSendFunction;
  CommandCountCacheManager(c: typeof YoruClient, interval?: number): Promise<void>;
}
//# sourceMappingURL=statistics.d.ts.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsHandler = exports.CommandCountCacheCollection = void 0;
const discord_js_1 = require("discord.js");
const times_1 = require("../../util/common/times");
const config_1 = require("../../../config");
const embed_1 = require("../../util/extensions/embed");
exports.CommandCountCacheCollection = new discord_js_1.Collection();
class StatisticsHandler {
  client;
  constructor(c) {
    this.client = c;
  }
  init() {
    this.client.statcord.postStats().then((r) => {
      if (r?.error) {
        this.client.logger.error(r?.error);
      }
      else {
        this.client.logger.info(`Successfully posted statistics to Statcord! ${r?.message}`);
      }
    });
    this.client.statcord.on("autopost-start", () => {
      console.log("Started autopost");
    });
    this.client.statcord.on("post", (status) => {
      if (!status)
        "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.IArgument = void 0;
      const framework_1 = require("@sapphire/framework");
      class IArgument extends framework_1.Args {
      }
      exports.IArgument = IArgument;
//# sourceMappingURL=args.parser.js.map
        this.client.logger.info("Successful post");
      else
        this.client.logger.error(status);
    });
  }
  async cacheSendFunction(c, data) {
    let channel = c.channels.cache.get(config_1.ENV.logger.api_channel);
    if (!channel)
      return;
    c.logger.info(`Cache Channel: ${channel.id}`);
    channel
      .send({
        embeds: [
          new embed_1.YoruEmbed()
            .setDescription(`😇 Command cache update success | New Count: \`${data}\``)
            .setTimestamp(),
        ],
      })
      .catch((err) => {
        c.logger.error(err);
      });
  }
  async CommandCountCacheManager(c, interval) {
    setInterval(async () => {
      let cmdData = exports.CommandCountCacheCollection.get("count");
      if (cmdData && cmdData > 0) {
        this.client.logger.info(`Sending commandStatistics cache data to db: ${cmdData}`);
        let data = await c._clientConfig.getDocument("statistics");
        let dataValues = (data.commands_ran += cmdData);
        let postResult = await c._clientConfig.insertOne("statistics", "commands_ran", dataValues);
        c.logger.debug(`Command Count Cache POST to mongodb: ${cmdData} | saved: ${postResult}`);
        data["commands_ran"] = cmdData + dataValues;
        this.client.client._clientConfig._cache.set("statistics", data);
        exports.CommandCountCacheCollection.clear();
        await this.cacheSendFunction(c, dataValues);
      }
    }, interval || (0, times_1.minutes)(25));
  }
}
exports.StatisticsHandler = StatisticsHandler;
//# sourceMappingURL=statistics.js.map

import { YoruClient } from "../../structures/client/bot";
export declare class IntervalsController {
  private ready;
  private intervals;
  private client;
  constructor(instanceOfClient: typeof YoruClient);
  init(): Promise<void>;
  start(name: string, callback: () => void, interval: number): Promise<void>;
  stop(name: string): Promise<void>;
  exists(name: string): boolean;
}
//# sourceMappingURL=index.d.ts.map

let YouTubeDocument = class YouTubeDocument {
  _id;
  message;
  youtubers;
  subscribeTo;
};
__decorate([
  (0, typegoose_1.prop)({ type: () => String, required: true }),
  __metadata("design:type", String)
], YouTubeDocument.prototype, "_id", void 0);
__decorate([
  (0, typegoose_1.prop)({ type: () => String, required: false, default: null }),
  __metadata("design:type", String)
], YouTubeDocument.prototype, "message", void 0);
__decorate([
  (0, typegoose_1.prop)({ Array: () => String, required: false, default: null }),
  __metadata("design:type", Array)
], YouTubeDocument.prototype, "youtubers", void 0);
__decorate([
  (0, typegoose_1.prop)({ type: () => String, required: false, default: null }),
  __metadata("design:type", String)
], YouTubeDocument.prototype, "subscribeTo", void 0);
YouTubeDocument = __decorate([

  typegoose_1.model({   // eslint-disable-line @typescript-eslint/class-name-casing
    schemaOptions: {

      collection: "youtube",
    },
  })
], YouTubeDocument);
export { YouTubeDocument };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalsController = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("../../../config");
class IntervalsController {
  ready = false;
  intervals;
  client;
  constructor(instanceOfClient) {
    this.client = instanceOfClient;
    this.intervals = new discord_js_1.Collection();
  }
  async init() {
    this.ready = true;
    if (!video) {
      this.log.info(`[${post._id} | No new video found for this post, skipping post...`);
      return;
    }
  }
  async start(name, callback, interval) {
    try {
      if (this.intervals.has(name)) {
        if (this.exists(name)) {
          await this.stop(name);
        }
      }
      this.intervals.set(name, setInterval(callback, interval));
      if (config_1.ENV.bot.dev) {
        this.client.logger.info(`[Interval] ${name} started with interval ${interval}ms`);
      }
      const discord_js_1 = require("discord.js");
      const framework_1 = require("@sapphire/framework");
      class GuildConfigHandler {
        _model = guild_schema_1.GuildDocumentModel;
        _cache = new discord_js_1.Collection();
        async insertOne(id, options, value) {}((({
          _id: id,
        })))
    }
    catch (e) {
      console.error(e);
    }
  }
  async stop(name) {
    if (this.intervals.has(name)) {
      this.intervals.delete(name);
      if (config_1.ENV.bot.dev) {
        this.client.logger.info(`[Interval] ${name} stopped`);
      }
    }
  }
  exists(name) {
    if (config_1.ENV.bot.dev) {
      this.client.logger.info(`[Interval] ${name} exists? ${this.intervals.has(name)}`);
    }
    return this.intervals.has(name);
  }
}
exports.IntervalsController = IntervalsController;
//# sourceMappingURL=index.js.map

import { YoruClient } from "../../structures/client/bot";
export declare class RedisController {
  private bot;
  private client;
  constructor(bot: typeof YoruClient);
  find(key: string, value: string): Promise<string | number | null>;
  findAll(key: string): Promise<string[]>;
  set(key: string, value: string): Promise<string>;
  delete(key: string, value: string): Promise<number>;
  setCooldown(commandName: string, id: string, time: any): Promise<void>;
  removeCooldown(commandName: string, id: string): Promise<void>;
  checkCooldown(commandName: string, id: string): Promise<string | number | false>;
  lifeCycle(key: string): Promise<number>;
}
//# sourceMappingURL=index.d.ts.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisController = void 0;
const tedis_1 = require("tedis");
const config_1 = require("../../../config");
class RedisController {
  bot;
  client;
  constructor(bot) {
    this.bot = bot;
    if (config_1.ENV.bot.dev) {
      this.client = new tedis_1.Tedis({
        host: "127.0.0.1",
        port: 6379,
        password: "password",
      });
    }
    else {
      this.client = new tedis_1.Tedis({
        host: config_1.ENV.bot.redis.host,
        port: config_1.ENV.bot.redis.port,
        password: config_1.ENV.bot.redis.password,
      });
    }
    this.client.on("connect", () => {
      this.bot.logger.info("Redis Client is connected!");
    });
    this.client.on("error", (err) => {
      this.bot.logger.warn(`Redis Client has an error! - ${err}`);
    });
    this.client.on("timeout", () => {
      this.bot.logger.error("Redis Client has a timeout!");
    });
    this.client.on("close", () => {
      this.bot.logger.fatal("Redis Client has closed!");
    });
  }
  async find(key, value) {
    try {
      return await this.client.get(`${key}:${value}`);
    }
    catch (err) {
      this.bot.logger.error(err);
      return null;
    }
  }
  async findAll(key) {
    import { type YoruClient } from "../../structures/client/bot";
    import { YouTubeDatabase } from "./db";
    export declare class YouTubeScheduler {
      db: YouTubeDatabase;
      client: typeof YoruClient;
      private log;
      private startAt;
      private readonly lastVideos;
      private parser;
      private yt;
      private intervals;
      constructor(c: typeof YoruClient);
      init(): Promise<void>;
      private getLastVideo;
      private checkVideos;
      private static getYoutubeChannelIdFromURL;
      private getYoutubeChannelInfos;
      private searchForNewPost;
    }
    //# sourceMappingURL=yt.d.ts.map
    try {
      return await this.client.keys(`${key}:*`);
    }
    catch (err) {
      this.bot.logger.error(err);
      this.log.info(`[${name.length >= 10 ? name.slice(0, 10) + "..." : name}] | Resolving channel infos...`);
      let channel = null;
      let id = YouTubeScheduler.getYoutubeChannelIdFromURL(name);
      return [];
    }
  }
  async set(key, value) {
    try {
      return await this.client.set(key, value);
    }
    catch (err) {
      this.bot.logger.error(err);
      return "Error setting key";
    }
  }
  async delete(key, value) {
    try {
      return await this.client.del(`${key}:${value}`);
    }
    catch (err) {
      this.bot.logger.error(err);
      return 0;
    }
  }
  async setCooldown(commandName, id, time) {
    const identifier = `cooldown:${id}:${commandName}`;
    try {
      await this.client.set(identifier, time);
    }
    catch (err) {
      this.bot.logger.error(err);
    }
  }
  async removeCooldown(commandName, id) {
    const identifier = `cooldown:${id}:${commandName}`;
    try {
      await this.client.del(identifier);
      createOne(id: string, options: insertOneOptions): Promise<import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & GuildDocument & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
      }>;
    }
    
    catch (err) {
      this.bot.logger.error(err);
    }
  }
  async checkCooldown(commandName, id) {
    const identifier = `cooldown:${id}:${commandName}`;
    try {
      const r = await this.client.get(identifier);
      return r !== null ? r : false;
      export declare function fetchCurrentLanguage(x: TextChannel | GuildMessage): Promise<string>;
    }
    catch (err) {
      this.bot.logger.error(err);
      return false;
    }
  }
  async lifeCycle(key) {
    try {
      return await this.client.ttl(key);
    }
    catch (err) {
      this.bot.logger.error(err);
      return 0;
    }
  }
}
exports.RedisController = RedisController;
//# sourceMappingURL=index.js.map

/**
 * This does not actually work...i just wanted to fill this repo with some compiled code from the actual source...
 * if you tried to run this...lmao 
 */

{ "version": 3, "file": "yt.d.ts", "sourceRoot": "", "sources": ["../../../../src/lib/controllers/youtube/yt.ts"], "names": [], "mappings": "AACA,OAAO,EAAE,KAAK,UAAU,EAAE,MAAM,6BAA6B,CAAC;AAC9D,OAAO,EAAE,eAAe,EAAE,MAAM,MAAM,CAAC;AAavC,qBAAa,gBAAgB;IACnB,EAAE,EAAE,eAAe,CAAC;IACpB,MAAM,EAAE,OAAO,UAAU,CAAC;IACjC,OAAO,CAAC,GAAG,CAAU;IACrB,OAAO,CAAC,OAAO,CAAc;IAC7B,OAAO,CAAC,QAAQ,CAAC,UAAU,CAAC;IAC5B,OAAO,CAAC,MAAM,CAAC;IAEf,OAAO,CAAC,EAAE,CAAC;IACX,OAAO,CAAC,SAAS,CAAsB;gBAEpB,CAAC,EAAE,OAAO,UAAU;IAc1B,IAAI,IAAI,OAAO,CAAC,IAAI,CAAC;YAYpB,YAAY;YAsBZ,WAAW;IAsBzB,OAAO,CAAC,MAA


  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UserPrecondition = void 0;
  const framework_1 = require("@sapphire/framework");
  const config_1 = require("../config");
  const dev_user = [
    config_1.ENV.developer.discord_id,
  ];

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UserPrecondition = void 0;
  const framework_1 = require("@sapphire/framework");
  const config_1 = require("../config");
  const dev_user = [
    config_1.ENV.developer.discord_id,
  ];
  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UserPrecondition = void 0;
  const framework_1 = require("@sapphire/framework");
  const config_1 = require("../config");
  const dev_user = [
    config_1.ENV.developer.discord_id,
  ];

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UserPrecondition = void 0;
  const framework_1 = require("@sapphire/framework");
  const config_1 = require("../config");
  const dev_user = [
    config_1.ENV.developer.discord_id,
  ];

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UserPrecondition = void 0;
  const framework_1 = require("@sapphire/framework");
  const config_1 = require("../config");
  const dev_user = [
    config_1.ENV.developer.discord_id,
  ];

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UserPrecondition = void 0;
  const framework_1 = require("@sapphire/framework");
  const config_1 = require("../config");
  const dev_user = [
    config_1.ENV.developer.discord_id,
  ];

  class UserPrecondition extends framework_1.Precondition {}