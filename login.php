<?php
$loginError = "";
$registerError = "";

if (["REQUEST_METHOD"] == "GET" && $_GET["action"] === "signout") {
    $_SESSION = [];
    header("location: login.php");
}

$conn = mysqli_connect("mydb", "dummy", "c3322b", "db3322") or die("Connection died!" . mysqli_connect_error());
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $user = $_POST["user"];
    $password = $_POST["password"];

    if ($_POST['type'] == "login") {

        $sql = "SELECT * FROM `account` WHERE useremail = '$user'";
        $result = mysqli_query($conn, $sql) or die("Query failed" . mysqli_error($conn));

        if (mysqli_num_rows($result) > 0) {
            if ($_POST["password"] == mysqli_fetch_assoc($result)["password"]) {
                session_start();
                $_SESSION["email"] = $_POST["user"];
                $_SESSION["login"] = true;
                header("Location: chat.php");
            } else {
                $loginError = "Incorrect Password!";
            }
        } else {
            $loginError = "Account does not exist!";
        }
    } else if ($_POST['type'] == "register") {
        $sql = "SELECT * FROM `account` WHERE useremail = '$user'";
        $result = mysqli_query($conn, $sql) or die("Query failed" . mysqli_error($conn));

        if (mysqli_num_rows($result) > 0) {
            $loginError = "Failed to register. This email is already registered!";
        } else {
            $sql = 'INSERT INTO `account` (useremail, password) VALUES ("' . $user . '", "' . $password . '")';
            $result = mysqli_query($conn, $sql) or die('Query failed: ' . mysqli_error($conn));
            session_start();
            $_SESSION["email"] = $user;
            $_SESSION["login"] = true;
            header("Location: chat.php");
        }
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="login.css">
</head>

<body>
    <h1>A Simple Chatroom Service</h1>
    <div id="login">
        <h2>Login to Chatroom</h2>
        <div class="form">
            <form id="loginForm" method="POST" action="/login.php">
                <input type="hidden" name="type" value="login">
                <div id="loginEmail">
                    <label for="email">Email: </label>
                    <input id="email" type="email" name="user">
                </div>
                <div id="loginPassword">
                    <label for="password">Password: </label>
                    <input id="password" type="password" name="password">
                </div>
                <div id="loginButton">
                    <input id="loginBtn" type="submit" value="Login">
                </div>
            </form>
            <div id="loginClick">Don't have an account? Click <a href="#" id="registerLink">here<a> to register!</div>
            <div id="loginErrMsg">
                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    echo $loginError;
                }
                ?>
            </div>
        </div>
    </div>
    <div id="register">
        <h2>Register an Account</h2>
        <div class="form">
            <form id="registerForm" method="POST" action="login.php">
                <input type="hidden" name="type" value="register">
                <div id="registerEmail">
                    <label for="regEmail">Email: </label>
                    <input id="regEmail" type="email" name="user">
                </div>
                <div id="registerPassword">
                    <label for="registerPasswordField">Password: </label>
                    <input id="registerPasswordField" type="password" name="password">
                </div>
                <div id="confirmPassword">
                    <label for="confirmPasswordField">Confirm: </label>
                    <input id="confirmPasswordField" type=password>
                </div>
                <div id="registerButton">
                    <input id="registerBtn" type="submit" value="Register">
                </div>
            </form>
            <div id="loginClick">Already have an account? Click <a href="#" id="loginLink">here<a> to login!</div>
            <div id="registerErrMsg">
                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    echo $registerError;
                }
                ?>
            </div>
        </div>
    </div>
    <script src="login.js"></script>
</body>

</html>