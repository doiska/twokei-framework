import { Client, ClientOptions, REST, Routes, SlashCommandBuilder } from "discord.js";
import { CommandHandler } from "../handlers/CommandHandler";
import { EventHandler } from "../handlers/EventHandler";

import glob from 'fast-glob';
import { Command } from "../types/command.types";
import { createEvent, createEventConst } from '../factory/CreateEvent';

declare module 'discord.js' {
	interface ClientOptions {

		/**
		 * CWD
		 * @default process.cwd()
		 */
		currentWorkingDirectory?: string;

		/**
		 * Commands path, supports glob
		 * @default []
		 */
		commandsPath?: string;

		/**
		 * Events path, supports glob
		 * @default []
		 */
		eventsPath?: string;

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
			...twokeiOptions
		});

		this.eventHandler = new EventHandler(this);
		this.commandHandler = new CommandHandler(this);

		if (twokeiOptions.autoload) {
			this.commandHandler.loadCommands().then(() => this.registerSlashCommands());
			this.eventHandler.loadEvents();
		}
	}

	public async getContextValues<T>(path: string): Promise<T[]> {
		const files = await this.getAllFiles(path);

		const values = files.map(file => {
			const command = require(`${this.options.currentWorkingDirectory ?? process.cwd()}/${file}`);
			return Object.values(command);
		});

		return values.flat() as T[];
	}

	public async getAllFiles(path: string) {
		const cwd = this.options.currentWorkingDirectory ?? process.cwd();
		return await glob(path, { cwd, onlyFiles: true });
	}

	public async registerSlashCommands() {

		const cliendId = this.application?.id ?? process.env.CLIENT_ID;

		if (!cliendId|| !process.env.TOKEN) {
			throw new Error('Missing CLIENT_ID, TOKEN or GUILD_ID in .env file.');
		}

		const parsed = Array.from(this.commandHandler.commands.values()).map(command => this.parseCommandToSlashJSON(command));

		const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


		if(process.env.NODE_ENV !== 'production' && process.env.GUILD_ID) {
			await rest.put(
				Routes.applicationGuildCommands(cliendId, process.env.GUILD_ID),
				{ body: parsed }
			);
		} else {
			await rest.put(
				Routes.applicationCommands(cliendId),
				{ body: parsed }
			);
		}
	}

	private parseCommandToSlashJSON(command: Command) {
		const name = command.nameLocales?.['en-US'] ?? command.name;
		const description = command.descriptionLocales?.['en-US'] ?? command.description ?? 'No description provided.';

		if (!name || !description) {
			throw new Error(`Command ${command.name} is missing a name or description for en-US locale.`);
		}

		const previewSlash = new SlashCommandBuilder()
				.setName(name)
				.setDescription(description)
				.setDefaultMemberPermissions(command.permissions as bigint)
				.setNameLocalizations(command.nameLocales || {})
				.setDescriptionLocalizations(command.descriptionLocales || {});

		const slash = command.slash?.(previewSlash) ?? previewSlash;

		return slash.toJSON();
	}
}

export { TwokeiClient }