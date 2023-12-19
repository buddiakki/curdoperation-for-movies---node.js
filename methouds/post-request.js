const writeToFile = require('../utils/write-to-file');
const requestBodyParser = require('../utils/data-parser');

module.exports = async (req, res) => {
    if (req.url === "/api/movies") {
        try {
            let body = await requestBodyParser(req);
            body = JSON.parse(body);  // Parse the body string into a JSON object

            const existingIds = req.movies
                .map(movie => movie.id)
                .filter(id => typeof id === 'number' && !isNaN(id));

            body.id = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.movies));
        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                title: "Validation Failed",
                message: "Request Body is not valid JSON",
            }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not Found', message: 'Route Not Found' }));
    }
};
