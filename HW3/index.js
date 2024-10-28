const express = require('express');
const fs = require('fs');

const app = express();

// Функция получения данных из файла и увеличения счетчика просмотров
function incrementCounterAndGetData(file, counterKey, callback) {
    // Чтение файла
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            callback(undefined);
        } else {
            try {
                const counters = JSON.parse(data);
                counters[counterKey]++; // Увеличение счётчика
                
                // Запись в файл обновлённых данных
                fs.writeFile(file, JSON.stringify(counters), (writeErr) => {
                    if (writeErr) {
                        console.error(writeErr);
                        callback(undefined);
                    } else {
                        callback(counters);
                    }
                });
            } catch (parseError) {
                console.error(parseError);
                callback(undefined);
            }
        }
    });
}

app.get('/', (req, res) => {
    incrementCounterAndGetData('./counterViews.json', 'main', (counters) => {
        if (counters && counters.main !== undefined) {
            const mainPage = `
                <h1>Главная страница</h1>
                <a href="/about">Обо мне</a>
                <h2>Просмотров: ${counters.main}</h2>
            `;

            res.send(mainPage);
        } else {
            res.send("Не удалось получить количество просмотров.");
        }
    });
});

app.get('/about', (req, res) => {
    incrementCounterAndGetData('./counterViews.json', 'about', (counters) => {
        if (counters && counters.about !== undefined) {
            const aboutPage = `
                <h1>Обо мне</h1>
                <a href="/">Главная</a>
                <h2>Просмотров: ${counters.about}</h2>
            `;

            res.send(aboutPage);
        } else {
            res.send("Не удалось получить количество просмотров.");
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));