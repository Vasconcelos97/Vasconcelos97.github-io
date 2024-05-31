document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modal");
    const btn = document.getElementById("add-item-btn");
    const span = document.getElementsByClassName("close")[0];
    const form = document.getElementById("add-item-form");
    const menuItemsContainer = document.getElementById('menu-items');


    function addItemToMenu(item, index) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
            <button class="delete-btn" data-index="${index}">Excluir</button>
        `;
        menuItemsContainer.appendChild(div);
    }


    function loadMenuItems() {
        const items = JSON.parse(localStorage.getItem('menuItems')) || [];
        items.forEach((item, index) => addItemToMenu(item, index));
    }

    function saveMenuItem(item) {
        const items = JSON.parse(localStorage.getItem('menuItems')) || [];
        items.push(item);
        localStorage.setItem('menuItems', JSON.stringify(items));
        return items.length - 1;
    }

    function deleteMenuItem(index) {
        let items = JSON.parse(localStorage.getItem('menuItems')) || [];
        items.splice(index, 1);
        localStorage.setItem('menuItems', JSON.stringify(items));
        renderMenuItems();
    }


    function renderMenuItems() {
        menuItemsContainer.innerHTML = '';
        loadMenuItems();
    }

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fileInput = form.image;
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const newItem = {
                name: form.name.value,
                price: parseFloat(form.price.value),
                description: form.description.value,
                image: e.target.result
            };

            const newIndex = saveMenuItem(newItem);
            addItemToMenu(newItem, newIndex);

            modal.style.display = "none";
            form.reset();
        };

        reader.readAsDataURL(file);
    });

    menuItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            deleteMenuItem(index);
        }
    });


    renderMenuItems();
});
