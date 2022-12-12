import type { Command, CommandExecution } from "../types/command.types";
import type { Optional } from "../types/utils.type";

type CommandWithoutExecute = Optional<Command, 'execute'>;

export const createCommand = (command: CommandWithoutExecute, execute?: CommandExecution) => {
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