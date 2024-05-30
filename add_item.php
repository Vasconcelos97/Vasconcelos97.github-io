<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $price = $_POST["price"];
    $description = $_POST["description"];
    $image = $_FILES["image"]["name"];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($image);

    // Verificar e mover o arquivo de imagem
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        // Carregar itens existentes
        $items = json_decode(file_get_contents('menu_items.json'), true);

        // Adicionar novo item
        $items[] = ["name" => $name, "price" => $price, "description" => $description, "image" => $target_file];

        // Salvar de volta no arquivo
        file_put_contents('menu_items.json', json_encode($items));

        // Redirecionar de volta para a página inicial
        header("Location: index.php");
        exit();
    } else {
        echo "Desculpe, houve um erro ao fazer upload da sua imagem.";
    }
}
?>
