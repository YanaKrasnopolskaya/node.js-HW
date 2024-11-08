const express = require('express');
const path = require('path');
const fs = require('fs'); // Используем стандартный fs для синхронных операций

const app = express();

app.use(express.json());

// Путь к файлу с данными
const dataFilePath = path.join(__dirname, 'users.json');

let users = []; // Массив для хранения пользователей
let uniqueID = 0;

// Функция для чтения данных из файла
function readUsersFromFile() {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContent); // Парсим содержимое файла в массив объектов
    } catch (err) {
        if (err.code === 'ENOENT') { // Если файл не существует, создаем пустой массив
            console.log('Файл не найден, создаём новый.');
            return [];
        }
        throw err; // В случае других ошибок бросаем исключение
    }
}

// Функция для записи данных в файл
function writeUsersToFile(users) {
    try {
        const content = JSON.stringify(users, null, 4);
        fs.writeFileSync(dataFilePath, content, 'utf8');
    } catch (err) {
        console.error(`Ошибка записи в файл: ${err}`);
    }
}

// Чтение данных при запуске сервера
try {
    users = readUsersFromFile(); // Заполняем массив users данными из файла
    console.log('Данные успешно загружены:', users);
} catch (err) {
    console.error('Ошибка загрузки данных:', err);
}

// Маршрут для получения всех пользователей
app.get('/users', (req, res) => {
    res.status(200).json({ users });
});

// Маршрут для получения одного пользователя по ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).send({ message: `Пользователь с ID=${id} не найден.` });
    }
    res.status(200).json({ user });
});

// Маршрут для добавления нового пользователя
app.post('/users', (req, res) => {
    uniqueID++;

    users.push({
        id: uniqueID,
        ...req.body
    });

    res.send({
        id: uniqueID,
        ...req.body
    });
    
    writeUsersToFile(users);
});

// Маршрут для обновления пользователя
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;

    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).send({ message: `Пользователь с ID=${id} не найден.` });
    }

    // Обновляем данные пользователя
    users[index] = {
        ...users[index],
        ...updatedUser
    };

    writeUsersToFile(users);
    res.status(200).json({ user: users[index] });
});

// Маршрут для удаления пользователя по ID
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return res.status(404).send({ message: `Пользователь с ID=${id} не найден.` });
    }
    users.splice(index, 1);
    writeUsersToFile(users);
    res.status(204).end(); // Ответ без тела
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});