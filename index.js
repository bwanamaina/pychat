const initialize = () => {
	const domain = document.domain || '127.0.0.1';
	const port = location.port || 5000;
	const socket = io.connect('http://' + domain + ':' + port);
	const button = window.document.getElementById('send');

	socket.on('connect', () => {
		socket.send('new user connected');
	});

	socket.on('message', msg => {
		const messages = window.document.getElementById('messages');
		const message = window.document.createElement('LI');
		message.innerHTML = msg;
		if (messages) messages.appendChild(message);
	});

	if (button)
		button.addEventListener('click', () => {
			const message = window.document.getElementById('message');
			if (message && message.value) socket.send(message.value);
			message.value = '';
		});
};

window.addEventListener('load', initialize);
