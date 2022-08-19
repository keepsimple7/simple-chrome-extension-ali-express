<?php

    //ENTER YOUR DATABASE CONNECTION INFO BELOW:
    $hostname="localhost";
    $database="scrap_db";
    $username="root";
    $password="";

    //DO NOT EDIT BELOW THIS LINE
    $connexion = mysqli_connect($hostname, $username, $password);
    mysqli_select_db($connexion, $database) or die('Could not select database');
?>
