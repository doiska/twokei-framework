import TwokeiClient from "../client/TwokeiClient";
import { join } from 'path';
import loader from "../utils/loader";

export default class EventHandler {

    private client: TwokeiClient;

    constructor(client: TwokeiClient, dir: string) {
        this.setup(client, dir);
        this.client = client;
    }

    private async setup(client: TwokeiClient, dir: string) {
        for (const [file, fileName] of loader(join(__dirname, 'listeners'))) {

        }
    }
}