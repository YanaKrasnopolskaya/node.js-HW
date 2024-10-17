const http = require('http');

let homePageCount = 0;
let aboutPageCount = 0;

const server = http.createServer((req, res) => {
    console.log('запрос получен');

    if (req.url === '/') {
        homePageCount++;

        const homePage = `
            <h1>Главная страница</h1>
            <a href="/">Главная</a>
            <a href="/about">Обо мне</a>
            <h2>Посещений страницы: ${homePageCount}</h2>
        `;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(homePage);
    } else if (req.url === '/about') {
        aboutPageCount++;

        const aboutPage = `
            <h1>Страница обо мне</h1>
            <a href="/about">Обо мне</a>
            <a href="/">Главная</a>
            <h2>Посещений страницы: ${aboutPageCount}</h2>
        `;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(aboutPage);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>404 страница не найдена</h1>')
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});