import { Awaitable, ClientEvents } from "discord.js";
import TwokeiClient from "../client/TwokeiClient";

type RunParams<E extends keyof ClientEvents> = ClientEvents[E];
export interface IDiscordListenerOptions {
    event: string;
    once: boolean;
}
export default abstract class DiscordListener<E extends keyof ClientEvents> {

    public readonly event: string;
    public readonly once: boolean = false;
    public enabled: boolean;

    constructor({ event, once }: IDiscordListenerOptions) {

        if (!event)
            throw new Error(`Event error found, trying to proccess: eventName - ${event}`)

        this.event = event;
        this.once = once;
        this.enabled = true;
    }

    public onLoad(client: TwokeiClient) {
        console.log(`Event ${this.event} loaded.`)
    }
    public onUnload(client: TwokeiClient) {
        console.log(`Event ${this.event} unloaded.`)
    }

    public abstract run(...args: RunParams<E>): void;
}