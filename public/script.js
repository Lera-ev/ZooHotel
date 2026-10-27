document.addEventListener('DOMContentLoaded', () => {
    const roomsGrid = document.getElementById('roomsGrid');
    const bookingForm = document.getElementById('bookingForm');

    fetch('/api/rooms')
        .then(res => res.json())
        .then(rooms => {
            if (roomsGrid) {
                roomsGrid.innerHTML = '';
                rooms.forEach(room => {
                    const card = document.createElement('div');
                    
                    // Используем новые автономные классы
                    if (room.status === 'free') {
                        card.className = 'room-free';
                    } else {
                        card.className = 'room-occupied';
                    }
                    
                    card.innerHTML = `
                        <h3 class="room-title">${room.room_number}</h3>
                        <p class="room-desc">${room.type}</p>
                        <p class="room-price">${room.price} ₽/сут</p>
                    `;
                    roomsGrid.appendChild(card);
                });
            }
        });

    if (bookingForm) {
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
    }
});