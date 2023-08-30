<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');

include './db.php';

$conn = OpenCon();

// update status of row after downlaod complete
function insertQueue($conn, $data){
    $sql = "INSERT INTO jobs (`type`, `category`, `url`) VALUES ('". $data["type"] ."', '". $data['category']."', '". $data['url']."')";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}


// Function to write image into file
//file_put_contents($img, file_get_contents($url));
$_POST = json_decode(file_get_contents("php://input"), true);

$url = $_POST['url'];
$type = $_POST['type'];
$category = $_POST['category'];
$new_category = $_POST['new_category'];

if( isset( $new_category ) && !empty( $new_category) ) {
    $category = $new_category;
}
if( !empty($url) ) {
$data = array(
    'type' => $type,
    'category' => $category,
    'url' => $url
);

$result = insertQueue( $conn, $data );

if( $result ){
    http_response_code(200);

    echo json_encode(array('message' => 'Success'));
    exit;
}else{
    http_response_code(401);
    echo json_encode(array('message' => 'Fail'));
}
}
CloseCon($conn);
