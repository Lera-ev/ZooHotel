require ('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
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
    const { clientName, petName, roomID, checkIN, checkOut } = req.body;
    console.log(`Новое бронирование: Клиент ${clientName}, Питомец ${petName}, Комната ID ${roomId}`);
    res.status(201).json({
        success: true,
        message: 'Бронирование успешно внесено в систему Зооотеля!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер Зооотеля запущен на http://localhost:${PORT}`);
});