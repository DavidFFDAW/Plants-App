<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
$headers = apache_request_headers();

function json(array $array) {
    die(json_encode($array));
}
// include_once ('./Upload.service.php');

$path = dirname(__DIR__).DIRECTORY_SEPARATOR;
// $inp = file_get_contents('php://input');

// json(['path' => $path]);

// Si no hay imagen no pasa na, se sigue y se crea sin imagen
// if (!isset($_FILES) || empty($_FILES)) {
//     json(['error' => 'No file']);
// }

// 83878c91171338902e0fe0fb97a8c47a
if (!isset($headers['Authorization']) || $headers['Authorization'] != md5('p')) {
	json(array(
		'error' => true,
		'message' => 'No autorizado'	
	));
}


// Al mandarlo desde el cliente con FormData, funciona bien de esta manera. (_POST)
json(array(
	'name' => $_POST['name'],
	'description' => $_POST['description'],
	'headers' => $headers,
	'error' => false,
));

$data = array();

if(isset($_FILES['file']))
{

	$extension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

	$new_name = time() . '.' . $extension;

	move_uploaded_file($_FILES['file']['tmp_name'], $path . $new_name);

	$data = array(
		'image_source'		=>	'images/' . $new_name
	);
}

json(['success' => 'File uploaded',
'path' => $path,
'data' => $data ]);