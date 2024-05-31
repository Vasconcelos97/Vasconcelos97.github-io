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

        const fileInput = form.image;
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const newItem = {
                name: form.name.value,
                price: parseFloat(form.price.value),
                description: form.description.value,
                image: e.target.result // URL da imagem carregada
            };

            addItemToMenu(newItem);

            modal.style.display = "none";
            form.reset();
        };

        reader.readAsDataURL(file);
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
