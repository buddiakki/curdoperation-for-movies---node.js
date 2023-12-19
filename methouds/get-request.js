module.exports = (req, res) => {
    let id = req.url.split('/')[3];
    console.log(id,'this is id')
    if (req.url.startsWith('/api/movies')) {
        if (id) {
            const movie = req.movies.find((m) => m.id == id);
            if (movie) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(movie));
                res.end();
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ title: 'Not Found', message: 'Movie Not Found' }));
            }
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(req.movies));
            res.end();
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ title: 'Not Found', message: 'Route Not Found' }));
    }
};
