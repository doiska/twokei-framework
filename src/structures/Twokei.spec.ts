import {describe, expect, it} from "vitest";
import {TwokeiClient} from "./TwokeiClient";

describe('Twokei Client', function () {

	let client = new TwokeiClient({
		intents: ['AutoModerationConfiguration'],
		commandsPaths: [
			'./src/commands/**/*.ts'
		],
		eventsPaths: [
			'./src/events/**/*.ts'
		],
		autoload: true
	});

	it('should start the client and return Twokei instance', async function () {
		client.on('ready', client => {
			expect(client.options.commandsPaths).toBeDefined();
			expect(client).toBeInstanceOf(TwokeiClient);
		});

		await client.login('MTA0NTM4MjIwMTE0NTA1MzMzNA.GasZIO.F26A1JrbyKBUQH6ZB7C7Uw7qQHHJKcl5GrIRhc');
	});
});