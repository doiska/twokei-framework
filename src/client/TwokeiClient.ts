import { Client, ClientOptions } from "discord.js";
import CommandHandler from "../handlers/CommandHandler";
import EventHandler from "../handlers/EventHandler";

export interface ExtendedClientOptions {
    prefix: string,
    baseDirectoryUrl: string
}

export default class TwokeiClient<Ready extends boolean = boolean> extends Client<Ready> {

    public baseDirectoryUrl!: string;
    public prefix!: string;

    public commandHandler!: CommandHandler;
    public eventHandler!: EventHandler;

    constructor(options: ClientOptions) {
        super(options);
        this.prefix = options.prefix;
        this.baseDirectoryUrl = options.baseDirectoryUrl;

        this.commandHandler = new CommandHandler(this, options.baseDirectoryUrl);
        this.eventHandler = new EventHandler(this, options.baseDirectoryUrl);

        this.on('ready', (client) => {
            this.on('messageCreate', (message) => {
                this.commandHandler.performCommand(message)
            });
        })
    }
}

declare module 'discord.js' {
    interface Client {
        baseDirectoryUrl: string,
    }

    interface ClientOptions extends ExtendedClientOptions { }
}