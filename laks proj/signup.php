<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Signup successful!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error during signup: ' . $stmt->error]);
    }

    $stmt->close();
}
$conn->close();
?>
