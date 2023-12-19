const writeToFile = require('../utils/write-to-file');
const requestBodyParser = require('../utils/data-parser');

module.exports = async (req, res) => {
    const id = req.url.split('/')[3];

    if (req.url.startsWith('/api/movies')) {
        if (id) {
            try {
                let body = await requestBodyParser(req);
                body = JSON.parse(body); 

                const index = req.movies.findIndex((m) => m.id == id);

                if (index !== -1) {
                    req.movies[index] = { ...req.movies[index], ...body };
                    writeToFile(req.movies);

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(req.movies[index]));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ title: 'Not Found', message: 'Movie Not Found' }));
                }
            } catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    title: "Validation Failed",
                    message: "Request Body is not valid JSON",
                }));
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
