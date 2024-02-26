document.addEventListener('DOMContentLoaded', function () {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("openModal");
    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

document.getElementById('save-button').addEventListener('click', function() {
    let table = document.getElementById('yourTableId');
    let newRow = table.insertRow(-1);

    // Чекбокс
    let cell0 = newRow.insertCell(0);
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    cell0.appendChild(checkbox);

    // Дані
    let group = document.getElementById('group').value;
    let name = document.getElementById('name').value;
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let birthday = document.getElementById('birthday').value;
    let status = document.querySelector('input[name="status"]:checked').value;
    newRow.insertCell(1).innerText = group;
    newRow.insertCell(2).innerText = name;
    newRow.insertCell(3).innerText = gender;
    newRow.insertCell(4).innerText = birthday;
    newRow.insertCell(5).innerHTML = `<span style="display:inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: ${status};"></span>`;

    // Кнопки "видалити" та "редагувати"
    let cellLast = newRow.insertCell(6);
    cellLast.innerHTML = `<button class="move-to-trash"><img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLDJDMTcuNTMsMiAyMiw2LjQ3IDIyLDEyQzIyLDE3LjUzIDE3LjUzLDIyIDEyLDIyQzYuNDcsMjIgMiwxNy41MyAyLDEyQzIsNi40NyA2LjQ3LDIgMTIsMk0xNyw3SDE0LjVMMTMuNSw2SDEwLjVMOS41LDdIN1Y5SDE3VjdNOSwxOEgxNUExLDEgMCAwLDAgMTYsMTdWMTBIOFYxN0ExLDEgMCAwLDAgOSwxOFoiLz48L3N2Zz4=" alt="delete element button"></button>
                       <button class="edit-student-information"><img src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyLDJDNi40NywyIDIsNi40NyAyLDEyQzIsMTcuNTMgNi40NywyMiAxMiwyMkMxNy41MywyMiAyMiwxNy41MyAyMiwxMkMyMiw2LjQ3IDE3LjUzLDIgMTIsMk0xNS4xLDcuMDdDMTUuMjQsNy4wNyAxNS4zOCw3LjEyIDE1LjUsNy4yM0wxNi43Nyw4LjVDMTcsOC43MiAxNyw5LjA3IDE2Ljc3LDkuMjhMMTUuNzcsMTAuMjhMMTMuNzIsOC4yM0wxNC43Miw3LjIzQzE0LjgyLDcuMTIgMTQuOTYsNy4wNyAxNS4xLDcuMDdNMTMuMTMsOC44MUwxNS4xOSwxMC44N0w5LjEzLDE2LjkzSDcuMDdWMTQuODdMMTMuMTMsOC44MVoiLz48L3N2Zz4=" alt="edit button"></button>`;


    document.getElementById('group').value = '';
    document.getElementById('name').value = '';
    document.querySelectorAll('input[name="gender"]').forEach(radio => radio.checked = false);
    document.getElementById('birthday').value = '';
    document.querySelectorAll('input[name="status"]').forEach(radio => radio.checked = false);



    // Закриття модального вікна
    let modal = document.getElementById("myModal");
    modal.style.display = "none";

});
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('move-to-trash') || e.target.parentNode.classList.contains('move-to-trash')) {
        let row = e.target.closest('tr');
        if (row) row.parentNode.removeChild(row);
    }
});
