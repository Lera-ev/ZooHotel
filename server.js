require ('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const mockRooms = [
    {room_id: 1, room_number: 'K-101', type: 'Эко-бокс', status: 'free', price: 1200},
    {room_id: 2, room_number: 'K-102', type: 'Эко-бокс', status: 'free', price: 1200},
    {room_id: 3, room_number: 'L-201', type: 'Люкс с выгулом', status: 'free', price: 3500},
    {room_id: 4, room_number: 'L-202', type: 'Люкс с выгулом', status: 'free', price: 3500}
];

app.get('/api/rooms', (req, res) => {
    res.json(mockRooms);
});

app.post('/api/bookings', (req, res) => {
    try {
        console.log("Получено тело запроса:", req.body);

        const clientName = req.body.clientName || "Не указано";
        const petName = req.body.petName || "Не указано";
        const roomId = req.body.roomId || "Не указано";
        
        console.log(`Успешно обработано: Клиент ${clientName}, Питомец ${petName}, Комната ID ${roomId}`);
        
        return res.status(201).json({ 
            success: true, 
            message: 'Бронирование успешно внесено в систему Зооотеля!' 
        });
    } catch (error) {
        console.error("Критическая ошибка на сервере:", error);
        return res.status(500).json({ 
            success: false, 
            message: 'Внутренняя ошибка сервера при бронировании' 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер Зооотеля запущен на http://localhost:${PORT}`);
});