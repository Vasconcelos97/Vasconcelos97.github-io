<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cardápio da Pizzaria</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Cardápio da Pizzaria</h1>
        <div id="menu-items">
            <!-- Itens do cardápio serão inseridos aqui via JavaScript -->
        </div>
        <button id="add-item-btn">Adicionar Pizza</button>
    </div>
    
    <!-- Modal para adicionar item -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Adicionar Nova Pizza</h2>
            <form id="add-item-form" action="add_item.php" method="POST" enctype="multipart/form-data">
                <label for="name">Nome da Pizza:</label>
                <input type="text" id="name" name="name" required>
                <label for="price">Preço:</label>
                <input type="number" id="price" name="price" step="0.01" required>
                <label for="description">Descrição:</label>
                <textarea id="description" name="description" required></textarea>
                <label for="image">Imagem:</label>
                <input type="file" id="image" name="image" accept="image/*" required>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
