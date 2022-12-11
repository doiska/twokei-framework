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

		await client.login(process.env.TOKEN);
	});
});
