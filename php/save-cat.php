<?php 
   global $connexion;
   $json = file_get_contents('php://input');
   $obj = json_decode($json,true);
 
   //Database Connection
   require_once 'db.php';
 
   /* insert data into DB */
   $item = $obj["cats"];

   $result = mysqli_query($connexion, "SELECT * FROM `scrapecaturl` WHERE url = '".$item['url']."'");

   if (mysqli_num_rows($result) == 0) {
      mysqli_query($connexion, "INSERT INTO `scrapecaturl` (cat, url) 
      VALUES ('".$item['cat']."', '".$item['url']."')");
   }
 
   //database connection close
 
   mysqli_close($connexion);
   // echo "OK";
   echo "<br>HTTP request successfully";
 
   //}
?>