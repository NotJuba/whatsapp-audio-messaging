#!/usr/bin/node

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const app = express();
const port = 3000;

const SESSION_FILE_PATH = './session.json';

const client = new Client({
    authStrategy: new LocalAuth(),
});

// Function to start the Express server
function startServer() {
    // Set up static files (CSS, images, etc.)
    app.use(express.static(__dirname));

    // Set up multer for handling file uploads
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, 'uploads')); // Specify the directory where you want to save the files
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname); // Specify the filename
        },
    });

    const upload = multer({ storage: storage });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.post('/upload', upload.single('audio'), (req, res) => {
        const number = req.body.number;
        const audioFilePath = req.file.path;

        console.log('Number:', number);
        console.log('Audio File Path:', audioFilePath);

        sendAudio(number, audioFilePath);

        res.sendFile(path.join(__dirname, 'ok.html'));
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}


// Initialize the WhatsApp client
client.initialize();


// webjs code
client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});



client.on('authenticated', () => {
    console.log('AUTHENTICATED');
    client.on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
            if (err) {
                console.error(err);
            }
        });
    })
});


client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});


client.on('ready', () => {
    console.log('READY');
    try {
        startServer(); // Start the server after successful authentication
    } catch (error) {
    }
});




// Function to send audio
async function sendAudio(number, audioFilePath) {
    try {
        const recipientNumber = `${number}@c.us`;
        const voice = MessageMedia.fromFilePath(audioFilePath);
        await client.sendMessage(recipientNumber, voice, { sendAudioAsVoice: true });
        console.log('Audio sent successfully');
    } catch (error) {
        console.error('Error sending audio:', error);
    }
}
