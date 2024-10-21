<?php
include 'db.php';
session_start();

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    $stmt = $conn->prepare("SELECT * FROM cart_items WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $cart_items = [];
    while ($row = $result->fetch_assoc()) {
        $cart_items[] = $row;
    }
    
    echo json_encode($cart_items);
    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
}

$conn->close();
?>
