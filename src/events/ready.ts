import { createEvent } from "../factory/CreateEvent";

export const readyEvent = createEvent("ready", (client) => {
	console.log(`Logged in as ${client.user?.tag}!`);
})