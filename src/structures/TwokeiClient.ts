import { Client, ClientOptions } from "discord.js";
import { CommandHandler } from "../handlers/CommandHandler";
import { EventHandler } from "../handlers/EventHandler";

import glob from 'fast-glob';

declare module 'discord.js' {
	interface ClientOptions {
		/**
		 * Commands path, supports glob
		 * @default []
		 */
		commandsPaths?: string[];

		/**
		 * Events path, supports glob
		 * @default []
		 */
		eventsPaths?: string[];

		/**
		 * Disable autoload events and commands
		 * If disabled, use loadEvents and loadCommands
		 * @default true
		 */
		autoload?: boolean;
	}
}

class TwokeiClient extends Client {

	public commandHandler: CommandHandler;
	public eventHandler: EventHandler;

	/**
	 * @param twokeiOptions
	 */
	constructor(twokeiOptions: ClientOptions) {
		super({
			autoload: true,
			eventsPaths: [],
			commandsPaths: [],
			...twokeiOptions
		});

		this.eventHandler = new EventHandler(this);
		this.commandHandler = new CommandHandler(this);

		if (twokeiOptions.autoload) {
			this.commandHandler.loadCommands().then(() => console.log(`Loaded ${this.commandHandler.commands.size} commands`));
			this.eventHandler.loadEvents().then(() => console.log(`Loaded ${this.eventHandler.events.size} events`));
		}
	}

	public async getContextValues<T>(paths: string[]) {
		const files = await this.getAllFiles(paths);
		const promises = files.map(file => import(file));
		const imported = await Promise.all(promises);

		return imported.map(value => Object.values(value)).flat() as T[];
	}

	private async getAllFiles(paths: string[]) {
		const promises = paths.map(path => glob(path, { onlyFiles: true, cwd: process.cwd() }));
		const files = await Promise.all(promises);
		return files.flat();
	}
}

export { TwokeiClient }