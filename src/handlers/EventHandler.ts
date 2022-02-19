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
        for (const [filePath, fileName] of loader(join(dir, 'listeners'))) {
            this.registerEvent(client, filePath, fileName)
        }
    }


    private async registerEvent(client: TwokeiClient, filePath: string, fileName: string) {

        let Event = await import(filePath);

        if (Event.default && Object.keys(Event).length === 1)
            Event = Event.default;

        const { event: eventName, run, onLoad } = new Event() as IDiscordListener;

        console.log('Loading event: ', Event, eventName, run);

        this.client.on(eventName, (...params) => run([
            client,
            ...params
        ]));

        if (onLoad)
            onLoad(client);
    }
}