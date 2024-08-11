<?php
session_start();

$conn = mysqli_connect("mydb", "dummy", "c3322b", "db3322");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["type"] == "upload") {

        $_SESSION["lastSeen"] = intval($_POST["time"]);
        $sql = "INSERT INTO message (time, message, person) VALUES ('" . intval($_POST["time"]) . "', '" . $_POST["message"] . "', '" .  $_POST["username"] . "')";
        $result = mysqli_query($conn, $sql);
        if (!$result) {
            echo json_encode(["error" => mysqli_error($conn)]);
        } else {
            $sql = "SELECT * FROM message WHERE time > " . (time() - 3600);
            $result = mysqli_query($conn, $sql);
            $messages = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode(["messages" => $messages]);
        }
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM message WHERE time > " . (time() - 3600);
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        echo json_encode(["error" => mysqli_error($conn)]);
    } else {
        $messages = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(["messages" => $messages]);
    }
}
$_SESSION["lastSeen"] = time();
