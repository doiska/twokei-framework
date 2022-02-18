import { Collection, Guild, Message } from "discord.js";
import { ICommand } from "../structures/DiscordCommand";
import { join } from 'path';
import loader from '../utils/loader';
import TwokeiClient from "../client/TwokeiClient";

export default class CommandHandler extends Collection<String, ICommand> {

    private client: TwokeiClient;

    constructor(client: TwokeiClient, dir: string) {
        super();
        this.setup(client, dir);
        this.client = client;
    }

    private async setup(client: TwokeiClient, dir: string) {
        for (const [file, fileName] of loader(join(__dirname, 'commands')))
            await this.registerCommand(client, file, fileName);
    }

    private async registerCommand(client: TwokeiClient, file: string, fileName: string) {

        let command = await import(file);

        if (command.default && Object.keys(command).length === 1)
            command = command.default;

        const {
            name,
            callback
        } = command as ICommand;

        if (!callback)
            throw new Error(`No callback found on "${fileName}".`)

        super.set(name ?? fileName, command);
    }

    private unRegisterCommand(name: string): boolean {
        return super.delete(name);
    }

    public performCommand(commandName: string, message: Message) {

        const filteredMessage = this.filterMessage('2!', message);

        if (!filteredMessage)
            return;

        const { command } = filteredMessage;

        try {
            const response = command.callback({ client: this.client, message, args: [] });

            if (!response)
                return;

            if (typeof response === 'string') {
                message.reply({ content: response })
            } else if (typeof response === 'object') {
                if (response.custom) {
                    message.reply(response);
                }
                else {
                    const embeds = Array.isArray(response) ? response : [response];
                    message.reply({ embeds })
                }
            }
        } catch (e) {
            console.log(`Couldn't perform command ${commandName}.`)
        }
    }

    private filterMessage(prefix: string, message: Message) {
        let content: string = message.content;

        if (!content.toLowerCase().startsWith(prefix))
            return;

        if (message.author.bot)
            return;

        content = content.substring(prefix.length);

        const args = content.split(/[ ]+/g);

        const first = args.shift();
        if (!first)
            return;

        const commandName = first.toLowerCase();
        const command = this.get(commandName);

        if (!command)
            return;

        //TODO: slash check

        return {
            prefix: prefix,
            name: commandName,
            command: command
        }
    }
}