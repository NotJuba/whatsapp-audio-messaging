#!/usr/bin/node

const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let localAuth;
if (fs.existsSync(SESSION_FILE_PATH)) {
    const sessionData = require(SESSION_FILE_PATH);
    if (sessionData) {
        localAuth = new LocalAuth({ sessionData, clientName: 'your-client-name' });
    } else {
        console.error('Session data is invalid. Unable to authenticate.');
    }
}

// Create a new WhatsApp client with LocalAuth strategy
const client = new Client({
    authStrategy: localAuth
});

// Event handler for QR code generation
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Event handler for when the client is authenticated
client.on('authenticated', (session) => {
    if (session) {
        console.log('Authenticated. Session:', session);

        // Save session values to the file upon successful auth
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error('Error saving session:', err);
            } else {
                console.log('Session saved!');
            }
        });
    } else {
        console.error('Session is undefined. Unable to save.');
    }
});

// Event handler for when the client is ready
client.on('ready', () => {
    console.log('Client is ready!');
});

// Event handler for incoming messages
client.on('message', async (message) => {
    console.log('Received message:', message.body);

    if (message.body === 'bro') {
        await message.reply('yeah bro it is working');
    }
});

// Initialize the client
client.initialize();

