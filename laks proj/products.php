<?php
include 'db.php';

$category = isset($_GET['category']) ? $_GET['category'] : 'Men'; // Default category

$sql = "SELECT * FROM products WHERE category = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $category);
$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products); // Return products as JSON
$stmt->close();
$conn->close();
?>
