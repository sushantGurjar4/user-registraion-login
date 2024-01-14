<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <h2>Welcome, <?php echo $_SESSION["username"]; ?>!</h2>
    <p>You can now upload a file.</p>

    <form id="fileUploadForm" enctype="multipart/form-data">
        <label for="file">Choose a file:</label>
        <input type="file" name="file" required>

        <input type="submit" value="Upload">
    </form>

    <p><a href="logout.php">Logout</a></p>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
