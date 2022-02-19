import { Interaction, Message } from "discord.js";
import TwokeiClient from "../client/TwokeiClient";

export interface ICommand {

    name: string;
    category?: string;
    description?: string;
    aliases?: string[];

    slash?: boolean;
    ownerOnly?: boolean;
    hidden?: boolean;
    testOnly?: boolean;

    cooldown?: number;

    callback(response: ICommandResponse): any
}

export interface ICommandResponse {
    client: TwokeiClient,
    message?: Message,
    interaction?: Interaction,
    args: string[]
}