document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modal");
    const btn = document.getElementById("add-item-btn");
    const span = document.getElementsByClassName("close")[0];
    const form = document.getElementById("add-item-form");
    const menuItemsContainer = document.getElementById('menu-items');

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

    fetch('menu_items.json')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                addItemToMenu(item);
            });
        });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const newItem = {
            name: form.name.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            image: form.image.value
        };

        addItemToMenu(newItem);

        modal.style.display = "none";
        form.reset();
    });

    function addItemToMenu(item) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
        `;
        menuItemsContainer.appendChild(div);
    }
});
