import {
	CommandInteraction, EmbedBuilder, EmbedData, Guild, GuildMember,
	LocalizationMap,
	PermissionResolvable,
	SlashCommandBuilder,
	TextBasedChannel, User
} from "discord.js";
import { TwokeiClient } from "../structures/TwokeiClient";
import { MessageBuilder } from '../structures/MessageBuilder';

export type CommandResponse = void | string | EmbedData | EmbedBuilder | MessageBuilder;

export type CommandContext<T = any> = {

	/**
	 * Command name
	 */
	command: string;

	/**
	 * Who typed the command
	 */
	user: User;

	/**
	 * Guild - undefined if the command was called outside a guild
	 */
	guild?: Guild | null;

	/**
	 * Guild member - undefined if the command was called outside a guild
	 */
	member?: GuildMember | null;

	/**
	 * Text channel where it was typed
	 */
	channel?: TextBasedChannel | null;

	/**
	 * Input informed by the user
	 */
	input: T;
	/**
	 * Base discord.js command interaction
	 */
	interaction: CommandInteraction;

}

export type CommandExecution = (context: CommandContext) => CommandResponse | Promise<CommandResponse>;

export type Command = {
	name: string;
	description?: string;
	aliases?: string[];
	usage?: string;
	category?: string;
	cooldown?: number;
	ownerOnly?: boolean;
	guildOnly?: boolean;
	nsfw?: boolean;
	permissions?: PermissionResolvable;
	examples?: string[];
	active?: boolean;
	nameLocales?: LocalizationMap;
	descriptionLocales?: LocalizationMap;
	slash?: (builder: SlashCommandBuilder) => SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
	execute: CommandExecution;
}