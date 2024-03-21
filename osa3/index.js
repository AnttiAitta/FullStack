const http = require('http');

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

const app = http.createServer((request, response) => {
    if (request.url === '/info' && request.method === 'GET') {
        const contactCount = notes.length;

        const currentTime = new Date().toLocaleString()

        const infoResponse = `Phonebook has info for ${contactCount} people\n${currentTime}`;

        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(infoResponse);
    } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(notes));
    }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);