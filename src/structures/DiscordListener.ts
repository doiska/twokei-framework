import { ClientEvents } from "discord.js";
import TwokeiClient from "../client/TwokeiClient";

export interface IDiscordListener {

    enabled: boolean;
    readonly event: string | symbol;
    readonly once: boolean;

    onLoad(client: TwokeiClient): any;
    onUnload(client: TwokeiClient): any;
    run(...params: any[]): any;
}

export interface IDiscordListenerOptions {
    event: string;
    once: boolean;
}

type RunParams<E extends keyof ClientEvents> = TwokeiClient & E extends keyof ClientEvents ? ClientEvents[E] : unknown[]

export abstract class DiscordListener<E extends keyof ClientEvents> implements IDiscordListener {

    public readonly event: string;
    public readonly once: boolean;
    public enabled;

    public constructor({ event, once }: IDiscordListenerOptions) {
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

    public abstract run(...args: RunParams<E>): unknown;
}