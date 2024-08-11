<?php
session_start();
?>

<!DOCTYPE html>
<html>

<head>
    <title>Simple Chatroom Service - Chat Page</title>
    <link rel="stylesheet" type="text/css" href="chat.css">
</head>

<body>
    <header>
        <h1>A Simple Chatroom Service</h1>
    </header>
    <div id="chatContainer">
        <div id="logoutButtonContainer">
            <button id="logoutButton">Logout</button>
        </div>
        <div id="msgWindow"></div>
        <div id="typeBox">
            <input type="text" id="msg">
            <input type="submit" id="sendBtn" value="Send">
        </div>
    </div>
    <script src="chat.js">
    </script>
    <script>
        var username;
        username = "<?php echo substr($_SESSION['email'], 0, strlen($_SESSION['email']) - 15) ?>";
    </script>
</body>

</html>