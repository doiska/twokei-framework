import { Command } from "../types/command.types";
import { APIEmbed, Collection, CommandInteraction, GuildMember, Interaction, InteractionType } from "discord.js";
import { TwokeiClient } from "../structures/TwokeiClient";

class CommandHandler {

	private readonly client: TwokeiClient;
	readonly commands: Collection<string, Command>;

	constructor(client: TwokeiClient) {
		this.client = client;
		this.commands = new Collection<string, Command>();

		this.client.on('interactionCreate', this.handleCommand);
	}

	public async loadCommands() {
		if (!this.client?.options?.commandsPaths) {
			return;
		}

		const commands = await this.client.getContextValues<Command>(this.client.options.commandsPaths);
		commands.forEach(command => this.commands.set(command.name, command));
	}

	public async handleCommand(interaction: Interaction) {
		if (interaction.type !== InteractionType.ApplicationCommand) {
			return;
		}

		const command = this.commands.get(interaction.commandName);

		if (!command) {
			return;
		}

		const translator = (key: string, args?: Record<string, string>) => {
			console.log(`Translating ${key} for ${interaction.locale}`, args);
			return key;
		}

		await interaction.deferReply();

		try {
			const response = await command.execute({
				client: this.client,
				command: interaction.commandName,
				input: interaction.options.data.reduce((acc, option) => ({ ...acc, [option.name]: option.value }), {}),
				guild: interaction.guild,
				user: interaction.user,
				channel: interaction?.channel,
				member: interaction?.member as GuildMember,
				interaction: interaction,
				t: translator
			});

			if (response) {
				const isObject = typeof response === "object";
				await interaction.editReply(isObject ? { embeds: [response as APIEmbed] } : response);
			} else {
				await interaction.deleteReply();
			}

		} catch (e) {
			await interaction.editReply(`An error occurred. Please try again later.`);
		}
	}
}

export { CommandHandler };