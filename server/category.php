<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$data = array('Category1', 'Category2', 'Category3');
$data = array();

$content_dir = "content/*";
foreach (glob($content_dir, GLOB_ONLYDIR) as $dirname):
	$data[] = basename( $dirname );
endforeach;

echo json_encode( $data );
exit();
