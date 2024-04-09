let currentlyEditingIndex = null;
let idNumber = 0;

function initializeModal() {
    const myModalAdd = new bootstrap.Modal(document.getElementById('myModalAdd'), { keyboard: false });

    document.getElementById("modalAdd").addEventListener('click', function() {
        clearFormFields();
        currentlyEditingIndex = null;
        myModalAdd.show();
    });

    document.querySelectorAll("[data-bs-dismiss='modal']").forEach(btn => {
        btn.addEventListener('click', () => {
            clearFormValidation();
            myModalAdd.hide();
        });
    });

    document.getElementById('myModalAdd').addEventListener('click', function(event) {
        if (event.target === this) {
            clearFormValidation();
            myModalAdd.hide();
        }
    });
}


function addNewRow() {
    document.getElementById('save-button').addEventListener('click', function(event) {
        if (!validateForm()) {
            event.preventDefault();
            shakeInvalidInputs();
            return;
        }

        const groupValue = document.getElementById('group').value;
        const nameValue = document.getElementById('name').value;
        const lastNameValue = document.getElementById('lastname').value;
        const genderSelect = document.getElementById('gender');
        const genderValue = genderSelect.options[genderSelect.selectedIndex].value;
        const birthdayValue = document.getElementById('birthday').value;

        const studentInfo = {
            id: currentlyEditingIndex !== null ? currentlyEditingIndex + 1 : idNumber + 1, // Зберігаємо або інкрементуємо ID
            group: groupValue,
            name: nameValue,
            lastName: lastNameValue,
            gender: genderValue,
            birthday: birthdayValue
        };



        // const params = new URLSearchParams(studentInfo).toString();
        // const url = "url-сервера😩" + params;
        // const xhr = new XMLHttpRequest();
        // xhr.open("GET", url, true);
        // xhr.send();
        // console.log(url);



        fetch('/submit-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentInfo),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                const tableBody = document.querySelector('.table tbody');
                let newRow = currentlyEditingIndex !== null ? tableBody.rows[currentlyEditingIndex] : tableBody.insertRow();

                fillRowWithData(newRow, studentInfo);
                clearFormFields();
                currentlyEditingIndex = null;
                bootstrap.Modal.getInstance(document.getElementById('myModalAdd')).hide();
            })
            .catch((error) => {
                console.error('Error:', error);
                // Відображення помилки, якщо вона виникла
            });

    });
}

function fillRowWithData(newRow) {
    while (newRow.cells.length > 0) {
        newRow.deleteCell(0);
    }

    let hiddenIdCell = newRow.insertCell(-1);
    hiddenIdCell.innerHTML = `<input type="hidden" name="idNumber" value="${idNumber}">`;
    hiddenIdCell.style.display = "none";

    let cellCheckbox = newRow.insertCell(-1);
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    cellCheckbox.appendChild(checkbox);

    // Збір даних з форми
    const groupValue = document.getElementById('group').value;
    const nameValue = document.getElementById('name').value;
    const lastNameValue = document.getElementById('lastname').value;
    const genderSelect = document.getElementById('gender');
    const genderValue = genderSelect.options[genderSelect.selectedIndex].text;
    const birthdayValue = document.getElementById('birthday').value;

    // Додавання даних до рядка
    newRow.insertCell(-1).innerText = groupValue;
    newRow.insertCell(-1).innerText = `${nameValue} ${lastNameValue}`;
    newRow.insertCell(-1).innerText = genderValue;
    newRow.insertCell(-1).innerText = birthdayValue;
    newRow.insertCell(-1).innerText = '+';

    // Додавання кнопок редагування і видалення
    let cellOptions = newRow.insertCell(-1);
    cellOptions.innerHTML = `<button class="btn btn-outline-secondary btn-sm btn-edit" data-index="${newRow.rowIndex - 1}">✏️</button>
                             <button class="btn btn-outline-secondary btn-sm btn-delete">🗑️</button>`;

    setupEditRowButtons();
    setupDeleteRowButtons();
}

function clearFormFields() {
    document.getElementById('group').selectedIndex = 0;
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('gender').selectedIndex = 0;
    document.getElementById('birthday').value = '';
}

function validateForm() {
    const fields = document.querySelectorAll('#myModalAdd .modal-body .form-control');
    let isValid = true;
    const nameRegex = /^[A-Za-zА-Яа-яЄє'’-]+(?:\s[A-Za-zА-Яа-яЄє'’-]+)*$/;

    fields.forEach(field => {
        if (!field.value) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            if (field.id === 'name' || field.id === 'lastname') {
                if (!nameRegex.test(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            } else {
                field.classList.remove('is-invalid');
            }
        }
    });

    return isValid;
}


function clearFormValidation() {
    const fields = document.querySelectorAll('#myModalAdd .modal-body .form-control');
    fields.forEach(field => {
        field.classList.remove('is-invalid');
    });
}

function shakeInvalidInputs() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
        field.classList.add('shake');
        setTimeout(() => {
            field.classList.remove('shake');
        }, 500);
    });
}

function setupEditRowButtons() {
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.removeEventListener('click', editButtonHandler);
        button.addEventListener('click', editButtonHandler);
    });
}

function editButtonHandler() {
    const rowIndex = parseInt(this.getAttribute('data-index'), 10);
    currentlyEditingIndex = rowIndex;
    const row = document.querySelector('.table tbody').rows[rowIndex];

    // Отримання ID з прихованого поля в рядку
    const id = row.querySelector('input[type="hidden"][name="idNumber"]').value;

    const group = row.cells[2].innerText;
    const fullName = row.cells[3].innerText.split(' ');
    const name = fullName[0];
    const lastName = fullName.slice(1).join(' ');
    const gender = row.cells[4].innerText;
    const birthday = row.cells[5].innerText;
    document.getElementById('group').value = group;
    document.getElementById('name').value = name;
    document.getElementById('lastname').value = lastName;

    selectGender(gender);
    document.getElementById('birthday').value = birthday;

    bootstrap.Modal.getInstance(document.getElementById('myModalAdd')).show();
}


function selectGender(gender) {
    const genderSelect = document.getElementById('gender');
    [...genderSelect.options].forEach(option => {
        if (option.text === gender) {
            option.selected = true;
        }
    });
}

function setupDeleteRowButtons() {
    document.querySelector('.table').addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete')) {
            const shouldDelete = confirm('Are you sure you want to delete this row?');
            if (shouldDelete) {
                const row = e.target.closest('tr');
                row.remove();
            }
        }
    });
}

document.getElementById('selections').addEventListener('change', function(e) {
    const isChecked = e.target.checked;
    document.querySelectorAll('.table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initializeModal();
    addNewRow();
    setupEditRowButtons();
    setupDeleteRowButtons();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {

            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {

            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
