import { Client, ClientEvents, Events } from "discord.js";
import TwokeiClient from "../client/TwokeiClient"

export default abstract class DiscordListener<T extends keyof ClientEvents> {

    client: TwokeiClient;
    eventType: typeof Events;

    constructor(client: TwokeiClient, eventType: typeof Events) {
        this.client = client;
        this.eventType = eventType;
    }

    abstract onInit(): any;
    abstract onExecute(...params: ClientEvents[T]): any
}