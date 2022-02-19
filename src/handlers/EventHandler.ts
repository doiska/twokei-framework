import TwokeiClient from "../client/TwokeiClient";
import { join } from 'path';
import loader from "../utils/loader";
import { IDiscordListener } from "../structures/DiscordListener";

export default class EventHandler {

    private client: TwokeiClient;

    constructor(client: TwokeiClient, dir: string) {
        this.setup(client, dir);
        this.client = client;
    }

    private async setup(client: TwokeiClient, dir: string) {
        for (const [file, fileName] of loader(join(__dirname, 'listeners'))) {
            this.registerEvent(client, file, fileName)
        }
    }


    private async registerEvent(client: TwokeiClient, file: string, fileName: string) {

        let event = await import(file);

        if (event.default && Object.keys(event).length === 1)
            event = event.default;

        const { event: eventName, run } = event as IDiscordListener;

        this.client.on(eventName, (...params) => run(client, params));
    }
}