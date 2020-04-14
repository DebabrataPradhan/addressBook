<?php
$ab = new addressBook();
$ab->{$_POST["askTo"]}($_POST);

class addressBook {
  function insertAddress($data) {
    try {
      $qStr = "INSERT INTO person_address (name,firstname,email,street,zip,citycode) VALUES ('".$data['name']."','".$data['firstname']."','".$data['email']."','".$data['street']."','".$data['zip']."',".$data['city'].")";
      $db = DBUtils::connectDB();
      $db->exec("USE address_book;");
      $db->exec($qStr);
      echo json_encode(array("msg"=>'success',"q"=>$qStr));
    }
    catch(PDOException $e) {
      echo json_encode(array("msg"=>$e->getMessage(),"q"=>$qStr));
    }
  }
  
  function updateAddress($data) {
    try {
      $qStr = "UPDATE person_address SET name='".$data['name']."',firstname='".$data['firstname']."',email='".$data['email']."',street='".$data['street']."',zip=".$data['zip'].",citycode=".$data['city']." WHERE id=".$data['id'];
      $db = DBUtils::connectDB();
      $db->exec("USE address_book;");
      $db->exec($qStr);
      echo json_encode(array("msg"=>'success',"q"=>$qStr));
    }
    catch(PDOException $e) {
      echo json_encode(array("msg"=>$e->getMessage(),"q"=>$qStr));
    }
  }

  function refreshDatabase(){
    echo json_encode(DBUtils::runDBScript(file_get_contents("../init/seedData.sql")));
  }

  function deleteAddress($data){
    $qStr = "DELETE FROM person_address WHERE id=".$data['id'].";";
    $db = DBUtils::connectDB();
    $db->exec("USE address_book;");
	$sth = $db->prepare($qStr);
    if ($sth->execute())
      echo json_encode("Success");
    else 
      echo json_encode("Fail");  }
  
  function getCities(){
    $db = DBUtils::connectDB();
    $db->exec("USE address_book;");
	$sth = $db->prepare("SELECT citycode, name FROM cities;");
    $sth->execute();
	$result = $sth->fetchAll();
    echo json_encode($result);
  }
  
  function getAddresses(){
    $db = DBUtils::connectDB();
    $db->exec("USE address_book;");
	$sth = $db->prepare("SELECT a.id,a.name,a.firstname,a.email,a.street,a.zip,c.name as city,c.citycode FROM person_address a JOIN cities c ON a.citycode=c.citycode;");
    $sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_CLASS);
    echo json_encode($result);
  }
}

class DBUtils {

  function runDBScript($query) {
    $db = self::connectDB();

    $stmt = $db->prepare($query);

    if ($stmt->execute())
      return "Success";
    else 
      return "Fail";
  }
  
  function connectDB(){
    //TBD move to config.php
    $host = "localhost";
    //$database = "mysql"; //"address_book"; //TBD how do I connect to a DB which does not exist
    $user = "root";
    $password = "";
	$db = new PDO("mysql:host=$host;", $user, $password);
    return $db;
  }
}
?>