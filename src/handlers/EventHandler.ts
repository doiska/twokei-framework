import { InteractionType } from "discord.js";
import { TwokeiClient } from "../structures/TwokeiClient";
import { EventCreation } from "../factory/CreateEvent";

class EventHandler {

	private readonly client: TwokeiClient;
	public readonly events: Set<EventCreation<any>>;

	constructor(client: TwokeiClient) {
		this.client = client;
		this.events = new Set<EventCreation<any>>();
	}

	public async loadEvents() {
		if (!this.client?.options?.eventsPath) {
			console.log(`No events path provided.`);
			return;
		}

		const events = await this.client.getContextValues<EventCreation<any>>(this.client.options.eventsPath);

		console.log(`Loading ${events.length} events...`);

		events.forEach(event => {
			this.events.add(event);

			if(event.once) {
				this.client.once(event.name, event.execute);
			} else {
				this.client.on(event.name, event.execute);
			}

			console.log(`Loaded event ${event.name}`);
		});

		console.log(`Loaded ${events.length} events.`);
	}
}

export { EventHandler };