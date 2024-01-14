<?php

include("db_connection.php");
    
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = htmlspecialchars($_POST["username"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    
    $query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $username, $email, $password);
    
    if ($stmt->execute()) {
        session_start();
        $_SESSION["user_id"] = $stmt->insert_id;
        $_SESSION["username"] = $username;
        $stmt->close();
        $conn->close();
        
        // Debugging information
        echo "User registered successfully. Redirecting to dashboard.php...";
        
        // Explicitly set the Location header for redirection
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Error occurred during registration";
    }
}

$conn->close();
?>
