document.getElementById('objectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;

    const code = Math.random(1).toString().substring(2, 15);
    const now = new Date();
    const timestamp = now.toLocaleString();

    const object = {
        name: name,
        quantity: quantity,
        dateTimeRegistered: timestamp,
        dateTimeFinished: 'N/A',
        code: code
    };

    saveObject(object);
    displayObjects();

    document.getElementById('objectForm').reset();
});


// Função para salvar objeto no localStorage
function saveObject(object) {
    let objects = JSON.parse(localStorage.getItem('objects')) || [];
    objects.push(object);
    localStorage.setItem('objects', JSON.stringify(objects));
}

// Função para exibir objetos
function displayObjects() {
    const objects = JSON.parse(localStorage.getItem('objects')) || [];
    const tbody = document.querySelector('#objectsTable tbody');
    tbody.innerHTML = '';

    objects.forEach((object, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${object.name}</td>
            <td><input type="number" value="${object.quantity}" onchange="editQuantity(${index}, this.value)"></td>
            <td>${object.dateTimeRegistered}</td>
            <td class="end-time">${object.dateTimeFinished}</td>
            <td>${object.code}</td>
            <td>
                <button class="delete-btn" onclick="deleteObject(${index})">Deletar</button>
                <button class="end-time-btn" onclick="finishObject(${index})">Registrar Término</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Função para editar a quantidade de um objeto
function editQuantity(index, newQuantity) {
    let objects = JSON.parse(localStorage.getItem('objects'));
    objects[index].quantity = newQuantity;
    localStorage.setItem('objects', JSON.stringify(objects));
    displayObjects();
}

// Função para finalizar objeto
function finishObject(index) {
    let objects = JSON.parse(localStorage.getItem('objects'));
    objects[index].dateTimeFinished = new Date().toLocaleString();
    localStorage.setItem('objects', JSON.stringify(objects));
    displayObjects();
}

// Função para deletar objeto
function deleteObject(index) {
    let objects = JSON.parse(localStorage.getItem('objects'));
    objects.splice(index, 1);
    localStorage.setItem('objects', JSON.stringify(objects));
    displayObjects();
}

// Função para buscar objetos
function searchObjects() {
    const searchInput = document.querySelector('.search-container input').value.toLowerCase();
    const objects = JSON.parse(localStorage.getItem('objects')) || [];
    const filteredObjects = objects.filter(object => object.name.toLowerCase().includes(searchInput));

    const tbody = document.querySelector('#objectsTable tbody');
    tbody.innerHTML = '';

    filteredObjects.forEach((object, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${object.name}</td>
            <td><input type="number" value="${object.quantity}" onchange="editQuantity(${index}, this.value)"></td>
            <td>${object.dateTimeRegistered}</td>
            <td class="end-time">${object.dateTimeFinished}</td>
            <td>${object.code}</td>
            <td>
                <button class="delete-btn" onclick="deleteObject(${index})">Deletar</button>
                <button class="end-time-btn" onclick="finishObject(${index})">Registrar Término</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function logout() {
    window.location.href = "index.html"
}


// Carrega os objetos ao iniciar
document.addEventListener('DOMContentLoaded', displayObjects);

// Adiciona o evento de clique ao botão de busca
document.querySelector('.search-container button').addEventListener('click', searchObjects);
