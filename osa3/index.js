const http = require('http');

let persons = [
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
    const url = new URL(request.url, `http://${request.headers.host}`);
    
    if (url.pathname === '/info' && request.method === 'GET') {
        const contactCount = persons.length;
        const currentTime = new Date().toLocaleString()
        const infoResponse = `Phonebook has info for ${contactCount} people\n${currentTime}`;
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(infoResponse);
    } else if (url.pathname === '/api/persons' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(persons));
    } else if (url.pathname.startsWith('/api/persons/') && request.method === 'GET') {
        const id = parseInt(url.pathname.substring(13));
        const contact = persons.find(person => person.id === id);
        if (contact) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(contact));
        } else {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Contact not found');
        }
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not Found');
    }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);