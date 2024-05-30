document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modal");
    const btn = document.getElementById("add-item-btn");
    const span = document.getElementsByClassName("close")[0];

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
            const menuItemsContainer = document.getElementById('menu-items');
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'menu-item';
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><strong>Preço:</strong> R$ ${item.price.toFixed(2)}</p>
                `;
                menuItemsContainer.appendChild(div);
            });
        });
});
