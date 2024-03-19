let currentlyEditingIndex = null; // Глобальна змінна для зберігання індексу редагованого рядка

function initializeModal() {
    const myModalAdd = new bootstrap.Modal(document.getElementById('myModalAdd'), { keyboard: false });

    document.getElementById("modalAdd").addEventListener('click', function() {
        clearFormFields(); // Очищення форми перед кожним відкриттям для додавання нового запису
        currentlyEditingIndex = null; // Скидання індексу при відкритті модального вікна для додавання
        myModalAdd.show();
    });

    document.querySelectorAll("[data-bs-dismiss='modal']").forEach(btn => {
        btn.addEventListener('click', () => myModalAdd.hide());
    });

    document.getElementById('myModalAdd').addEventListener('click', function(event) {
        if (event.target === this) myModalAdd.hide();
    });
}

function addNewRow() {
    document.getElementById('save-button').addEventListener('click', function() {
        const tableBody = document.querySelector('.table tbody');
        let newRow;

        if (currentlyEditingIndex !== null) {
            newRow = tableBody.rows[currentlyEditingIndex];
        } else {
            newRow = tableBody.insertRow();
        }

        fillRowWithData(newRow);

        clearFormFields(); // Очищення полів форми і закриття модального вікна
        currentlyEditingIndex = null; // Скидання індексу після збереження змін
    });
}

function fillRowWithData(newRow) {
    // Очистка newRow якщо це редагування
    while (newRow.cells.length > 0) {
        newRow.deleteCell(0);
    }

    let cellCheckbox = newRow.insertCell(0);
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    cellCheckbox.appendChild(checkbox);

    let groupValue = document.getElementById('group').value;
    let nameValue = document.getElementById('name').value;
    let lastNameValue = document.getElementById('lastname').value;
    let genderSelect = document.getElementById('gender');
    let genderValue = genderSelect.options[genderSelect.selectedIndex].text;
    let birthdayValue = document.getElementById('birthday').value;

    newRow.insertCell(1).innerText = groupValue;
    newRow.insertCell(2).innerText = `${nameValue} ${lastNameValue}`;
    newRow.insertCell(3).innerText = genderValue;
    newRow.insertCell(4).innerText = birthdayValue;
    newRow.insertCell(5).innerText = '+';

    let cellOptions = newRow.insertCell(6);
    cellOptions.innerHTML = `<button class="btn btn-outline-secondary btn-sm btn-edit" data-index="${newRow.rowIndex - 1}">✏️</button>
                             <button class="btn btn-outline-secondary btn-sm btn-delete">🗑️</button>`;
    setupEditRowButtons(); // Перенастроювання кнопок редагування після додавання нового рядка
    setupDeleteRowButtons(); // Налаштування кнопок видалення
}

function clearFormFields() {
    document.getElementById('group').selectedIndex = 0;
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('gender').selectedIndex = 0;
    document.getElementById('birthday').value = '';

    let myModalAdd = bootstrap.Modal.getInstance(document.getElementById('myModalAdd'));
    myModalAdd.hide();
}

function setupEditRowButtons() {
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.removeEventListener('click', editButtonHandler); // Видалення існуючого обробника, щоб уникнути подвійного виклику
        button.addEventListener('click', editButtonHandler);
    });
}

function setupDeleteRowButtons() {
    document.querySelector('.table').addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-delete')) {
            const row = e.target.closest('tr'); // Знаходження батьківського рядка кнопки
            row.remove(); // Видалення цього рядка
        }
    });
}

function editButtonHandler() {
    const rowIndex = this.getAttribute('data-index');
    openEditModal(rowIndex);
}

function openEditModal(rowIndex) {
    const table = document.querySelector('.table tbody');
    const row = table.rows[rowIndex];
    const group = row.cells[1].innerText;
    const fullName = row.cells[2].innerText.split(" ");
    const name = fullName[0];
    const lastName = fullName[1] || ""; // Додано захист від відсутності прізвища
    const gender = row.cells[3].innerText;
    const birthday = row.cells[4].innerText;

    document.getElementById('group').value = group;
    document.getElementById('name').value = name;
    document.getElementById('lastname').value = lastName;
    selectGender(gender);
    document.getElementById('birthday').value = birthday;

    currentlyEditingIndex = rowIndex; // Збереження індексу для оновлення

    let myModalAdd = bootstrap.Modal.getInstance(document.getElementById('myModalAdd'));
    myModalAdd.show();
}

function selectGender(gender) {
    const genderSelect = document.getElementById('gender');
    for (let option of genderSelect.options) {
        if (option.text === gender) {
            option.selected = true;
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeModal();
    addNewRow();
    setupEditRowButtons(); // Первинне налаштування кнопок редагування
    setupDeleteRowButtons(); // Налаштування кнопок видалення
});
