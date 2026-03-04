const schoolForm = document.querySelector('.school-selection-form');

schoolForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const school = document.getElementById('school').value;

    if (school) {
        localStorage.setItem('selectedSchool', school);
        window.location.href = 'guard_dashboard.html';
    } else {
        alert('Please select a school');
    }
});