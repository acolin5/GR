let currentMonth = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateMonthDisplay() {
    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
}

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function generateCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    calendarGrid.innerHTML = ''; // Clear existing calendar
    let daysCount = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    for (let day = 1; day <= daysCount; day++) {
        let dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;
        dayDiv.dataset.day = day;
        calendarGrid.appendChild(dayDiv);

        dayDiv.addEventListener('click', function() {
            // Open modal and set the day
            let modal = document.getElementById('noteModal');
            modal.style.display = 'block';
            document.querySelector('.modal-content h2').textContent = `Add/View Note for Day ${this.dataset.day}, ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
        });
    }
}


document.getElementById('generateBarcode').addEventListener('click', function() {
    // Generate a random number for demonstration purposes
    let randomId = Math.floor(Math.random() * 1000000000);

    // Generate and display the barcode
    JsBarcode("#barcode", randomId.toString(), {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 30,
        displayValue: true
    });

    // Display the barcode container
    document.getElementById('barcodeContainer').style.display = 'block';
});


document.getElementById('prevMonth').addEventListener('click', function() {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    updateMonthDisplay();
    generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    updateMonthDisplay();
    generateCalendar();
});

// Close modal logic
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('noteModal').style.display = 'none';
});

// Initial setup
updateMonthDisplay();
generateCalendar();
