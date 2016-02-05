<?php
include('classes/upload.php');
include('classes/smart_resize.php');
// You need to add server side validation and better error handling here
$data = array();

if(isset($_POST['submit']))
{  
	$max_size = 1000; //this is the max width for your uploaded images
	$filetype = $_POST['filetype'];
	$description = $_POST['description'];
    //upload file
	$file_uploader = new uploader('files_uploaded/'); //this is the directory where your files will be stored
	if($filetype=="image")
	{
		$file_uploader->addAllowedFileType(array('.jpeg', '.jpg', '.gif', '.png'));
	}
	else
	{
		$file_uploader->addAllowedFileType(array('.doc', '.docx', '.pdf', '.xls', '.xlsx', '.txt', '.rtf', '.zip'));
	}
    
    try 
    {
	    $filename = $file_uploader -> uploadFile('image');
	    if($filename)
        {
        	list($name_file, $ext) = split('[.]', $filename);

	        //resize if its an image
	        if($ext == 'jpeg' || $ext == 'jpg' || $ext == 'gif' || $ext == 'png')
	        {
	            $image_src = "files_uploaded/" . stripslashes($filename);
	            $image_size = getimagesize($image_src);
	            if($image_size[0]>$max_size)
	            {
	                smart_resize_image($image_src, $image_src, $max_size, 0, true, 'file', false, false);
	            }
	        }
	  		$http_server = "http://scaredrabbit.net/jot/"; //full URL - http://yourwebsite.com/
	        $file_path = $http_server."files_uploaded/".$filename; 

	        $data = array('new_file' => $file_path, 'file_description' => $description, 'file_type' => $filetype, 'error_msg' => '');
        }
        else
        {
        	$data = array('error_msg' => 'No file found.');
        }
	    
	} 
	catch (Exception $e) 
	{
	    $data = array('error_msg' => $e->getMessage());
	}
}
else
{
	$data = array('error_msg' => 'Upload error occurred. Try again.');
}
echo json_encode($data);
?>