import { Command } from "../types/command.types";
import { APIEmbed, GuildMember, Interaction, InteractionType } from "discord.js";
import { TwokeiClient } from "../structures/TwokeiClient";
import { MessageBuilder } from '../structures/MessageBuilder';

class CommandHandler {

	private readonly client: TwokeiClient;

	public commands = new Map<string, Command>;

	constructor(client: TwokeiClient) {
		this.client = client;
		this.client.on('interactionCreate', (interaction) => this.handleCommand(interaction));
	}

	public async loadCommands() {
		if (!this.client?.options?.commandsPath) {
			return;
		}

		const commands = await this.client.getContextValues<Command>(this.client.options.commandsPath);
		this.commands = new Map(commands.map(command => [command.name, command]));
	}

	public async handleCommand(interaction: Interaction) {
		if (interaction.type !== InteractionType.ApplicationCommand) {
			return;
		}

		if(!this.commands) {
			return;
		}

		const command = this.commands.get(interaction.commandName);

		if (!command) {
			return;
		}


		await interaction.deferReply();

		const response = await command.execute({
			command: interaction.commandName,
			input: interaction.options.data.reduce((acc, option) => ({ ...acc, [option.name]: option.value }), {}),
			guild: interaction.guild,
			user: interaction.user,
			channel: interaction?.channel,
			member: interaction?.member as GuildMember,
			interaction: interaction,
		});

		if(!response) {
			await interaction.deleteReply();
			return;
		}

		const isObject = typeof response === "object";

		if(response instanceof MessageBuilder) {
			await response?.followUp(interaction);
		} else {
			await interaction.editReply(isObject ? { embeds: [response as APIEmbed] } : response);
		}
	}
}

export { CommandHandler };