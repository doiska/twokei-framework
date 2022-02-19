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
        for (const [filePath, fileName] of loader(join(dir, 'commands'))) {
            await this.registerCommand(client, filePath, fileName);
        }
    }

    private async registerCommand(client: TwokeiClient, filePath: string, fileName: string) {

        let Command = await import(filePath);

        if (Command.default && Object.keys(Command).length === 1)
            Command = Command.default;


        Command = new Command();

        const {
            name,
            callback
        } = Command as ICommand;

        if (!callback)
            throw new Error(`No callback found on "${fileName}".`)

        console.log('Loading command: ', fileName)
        super.set(name ?? fileName, Command);
    }

    private unRegisterCommand(name: string): boolean {
        return super.delete(name);
    }

    public performCommand(message: Message) {

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
            console.log(`Couldn't perform command ${message.content}.`)
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