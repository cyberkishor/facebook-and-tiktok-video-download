<?php
    function OpenCon()
    {
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "Qqk!B!TeVkN3_V";
        $db = "portfolio_cron_job";
        
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n" . $conn->error);
        return $conn;
    }
    function CloseCon($conn)
    {
        $conn->close();
    }
?>