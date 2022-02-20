import TwokeiClient from "../client/TwokeiClient";
import { join } from 'path';
import loader from "../utils/loader";
import { ClientEvents } from "discord.js";

type RunParams = keyof ClientEvents;
export default class EventHandler {

    private client: TwokeiClient;

    constructor(client: TwokeiClient, dir: string) {
        this.setup(client, dir);
        this.client = client;
    }

    private async setup(client: TwokeiClient, dir: string) {
        for (const [filePath, fileName] of loader(join(dir, 'listeners'))) {
            this.registerEvent(client, filePath, fileName)
        }
    }

    private async registerEvent(client: TwokeiClient, filePath: string, fileName: string) {

        try {
            let Event = (await import(filePath).then((e) => e.default ?? e));

            const { event: eventName, run, onLoad } = new Event({ client: client });

            console.log('Loading event: ', Event, eventName, run);

            if (!eventName) {
                console.error('No EventName found on ', filePath);
                return;
            }

            this.client.on(eventName, (...params) => run(...params));
        } catch (e) {
            console.log(e);
        }
    }
}