import { ClientEvents } from "discord.js";
import { TwokeiClient } from "../structures/TwokeiClient";

export type EventCreation<T extends keyof ClientEvents> = {
	name: T;
	once: boolean;
	execute: (client: TwokeiClient, ...args: ClientEvents[T]) => void;
}

export const createEvent = <T extends keyof ClientEvents>(name: T, execute: (client: TwokeiClient, ...args: ClientEvents[T]) => void, once = false): EventCreation<T> => {
	return {
		name,
		once,
		execute,
	};
};