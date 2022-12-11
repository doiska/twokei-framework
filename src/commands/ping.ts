import {createCommand} from "../factory/CreateCommand";

const pingCommand = createCommand({
	name: 'Ping',
	execute: (context) => 'Pong!'
})

const replyCommand = createCommand({
	name: 'reply',
	execute: () => 'Hi!'
})

export {replyCommand, pingCommand};