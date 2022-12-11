import { Command, CommandExecution } from "../types/command.types";
import { Optional } from "../types/utils.type";

export const createCommand = (command: Optional<Command, 'execute'>, execute?: CommandExecution) => {
	if (!command.name) {
		throw Error('Trying to register a command without an name.');
	}

	if (!command.execute && !execute) {
		throw Error(`No execute function specified for command: ${command.name}`)
	}

	return {
		execute: execute,
		...command,
	}
}