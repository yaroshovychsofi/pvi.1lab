const express = require('express');
const cors = require('cors'); // Додано модуль cors
const app = express();
const PORT = 3001;

app.use(express.json()); // Для обробки JSON тіл запитів
app.use(express.urlencoded({ extended: true })); // Для обробки URL-encoded тіл запитів

// Додано middleware cors
app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    }
));

// Маршрут для обробки POST запитів з форми
app.post('/submit-student', (req, res) => {
    const { group, name, lastname, gender, birthday } = req.body;

    // Перевірка наявності та коректності всіх полів
    if (!group || !name || !lastname || !gender || !birthday) {
        return res.status(400).json({ error: 'All fields are required and must be valid.' });
    }

    // Логіка додавання студента (тут можна додати в базу даних або якусь іншу логіку)
    console.log(`Student added: ${name} ${lastname} from group ${group}, gender: ${gender}, birthday: ${birthday}`);

    // Повернення успішної відповіді
    res.json({ success: 'Student added successfully.' });
});

// Стартування сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
