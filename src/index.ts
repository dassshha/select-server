import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

interface SelectOption {
    name: string;
    value: string;
}

interface PostRequest {
    value: string;
}

app.get('/options/for/select', (req: Request, res: Response) => {
    try {
        const options: SelectOption[] = Array.from({ length: 10 }, (_, i) => ({
            name: `${i + 1}`,
            value: `${i + 1}`
        }));

        // Логика обработки "неверных данных" или пустого массива
        // res.json(null); // Пример отправки null
        // res.json([]);   // Пример отправки пустого массива

        res.json(options);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/selected/option', (req: Request<{}, {}, PostRequest>, res: Response) => {
    const { value } = req.body;
    if (!value) {
        return res.status(400).json({ message: "Ошибка: значение не получено." });
    }

    res.json({
        message: `Выбранная опция ${value} успешно принята.`
    });
});

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📍 GET  /options/for/select`);
    console.log(`📍 POST /selected/option`);
});
