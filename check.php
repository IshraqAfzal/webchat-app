<?php
header('Content-Type: application/json');

$useremail = $_GET['email'];
$conn = mysqli_connect("mydb", "dummy", "c3322b", "db3322");

$query = "SELECT * FROM account WHERE useremail = '$useremail'";

$result = mysqli_query($conn, $query) or die();

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["found" => true]);
} else {
    echo json_encode(["found" => false]);
}
