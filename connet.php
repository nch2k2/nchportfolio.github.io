<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $conn = new mysqli('sql12.freesqldatabase.com','sql12659436','CbhnR6zZQx','sql12659436');
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connect_error);
    }
    else{
        $stmt = $conn->prepare("insert into contactme(name, email, message) values(?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $message);
        $stmt.execute();
        echo "Thank You for your message";
        $stmt->close();
        $conn->close();
    }
?>