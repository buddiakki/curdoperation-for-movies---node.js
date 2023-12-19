const writeToFile = require('../utils/write-to-file');
module.exports = (req, res) => {
    const id = req.url.split('/')[3];

    if (req.url.startsWith('/api/movies')) {
        if (id) {
            const index = req.movies.findIndex((m) => m.id == id);
            if (index !== -1) {
                req.movies.splice(index, 1);
                writeToFile(req.movies);
                res.statusCode = 204; 
                res.end(JSON.stringify(req.movies));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Movie Not Found' }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ title: 'Bad Request', message: 'ID parameter is required' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not Found', message: 'Route Not Found' }));
    }
};
