<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include './db.php';

$conn = OpenCon();

// update status of row after downlaod complete
function updateStatus($conn, $id){

    $sql = "UPDATE jobs SET status = 1 WHERE id={$id}";
    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

//select job queue for download image/video
$sql = "select * from jobs where status = 0";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {

        $url = $row['url'];

	    $type = $row['type'];
        $category = $row['category'];

        $path = dirname(__FILE__) . '/content/' . $category . '/';
	
	    //check if category directory exits or not
        // if directory not exits create new directory
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
            $return['dir_created'] = true;
        }

        if (isset($url)) {
            $img = 'fb_' . date('m-d-Y_his') . '.jpg';
            if ($type == 'video') {
                $img = 'fb_' . date('m-d-Y_his') . '.mp4';
            }

            $img = dirname(__FILE__) . '/content/' . $category . '/' . $img;

            if (strpos($url,'tiktok.com') !== false) {
                require_once "TikTok-Video-Downloader-PHP/download.php";
                
                $filename = generateRandomString() . ".mp4";
                $img = dirname(__FILE__) . '/content/' . $category . '/' . $filename;
                
                $file = downloadTicTokVideo($url, $img);

                echo "TikTok Video Downlaod Success!!. \n";   
                updateStatus($conn, $row['id']);
            }else{
                
                $success =  file_put_contents($img, file_get_contents($url));
                var_dump($success);
                echo "Image downlaod success!!. \n";   
                updateStatus($conn, $row['id']);
            }
        }
    }
} else {
    echo "0 results";
}



CloseCon($conn);
?>