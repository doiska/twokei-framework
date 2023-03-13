import { ClientEvents } from "discord.js";

export type EventCreation<T extends keyof ClientEvents> = {
	name: T;
	once: boolean;
	execute: (...args: ClientEvents[T]) => void;
}

export function createEvent<T extends keyof ClientEvents>(name: T, execute: (...args: ClientEvents[T]) => void, once = false): EventCreation<T> {
	return { name, once, execute };
}

export const createEventConst = <T extends keyof ClientEvents>(name: T, execute: (...args: ClientEvents[T]) => void, once = false): EventCreation<T> => {
	return { name, once, execute,
	};
};