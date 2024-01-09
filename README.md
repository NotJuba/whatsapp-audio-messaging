
# WhatsApp Audio Sender

This project utilizes the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library along with Express to create a simple server that allows you to send audio messages on WhatsApp. It uses the [multer](https://github.com/expressjs/multer) middleware for handling file uploads and [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) for displaying the QR code.

## Showcase

[Watch the Video](https://www.youtube.com/watch?v=rvzDz40BHS4)

## Requirements

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

##Install dependencies:

### bash

    npm install

## Usage
```npm start```

The server will be running at http://localhost:3000.

Scan the QR code displayed in the console using your WhatsApp mobile app to authenticate.

Access the web interface at http://localhost:3000 to send audio messages.

## Configuration

    The server uses a local session file (session.json) to store authentication data. Make sure the application has write permissions for the directory where this file is stored.

    Uploaded audio files are saved in the uploads directory.


## Dependencies

    express: Fast, unopinionated, minimalist web framework for Node.js.
    multer: Middleware for handling multipart/form-data.
    whatsapp-web.js: WhatsApp API library "kinda".
    qrcode-terminal: QR code generator for the terminal.


## License

This project is licensed under the MIT License.

