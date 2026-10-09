document.addEventListener('DOMContentLoaded', () => {
    const roomsGrid = document.getElementById('roomsGrid');
    const bookingForm = document.getElementById('bookingForm');

    // Загрузка комнат
    fetch('/api/rooms')
        .then(res => res.json())
        .then(rooms => {
            rooms.forEach(room => {
                const card = document.createElement('div');
                card.className = `room-card ${room.status}`;
                card.innerHTML = `
                    <h3>${room.room_number}</h3>
                    <p>${room.type}</p>
                    <p>${room.price} ₽</p>
                `;
                roomsGrid.appendChild(card);
            });
        });

    // Обработка отправки формы
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            clientName: document.getElementById('clientName').value,
            petName: document.getElementById('petName').value,
            roomId: document.getElementById('roomSelect').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value
        };

        fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            alert(result.message);
            bookingForm.reset();
        });
    });
});