<?php
$host = "localhost"; // Database host
$username = "root"; // Database username
$password = ""; // Database password
$database = "twicee"; // Database name

// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
