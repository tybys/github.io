<?php

include_once "/conf/database.php";

$date = $_POST["date"];
$graph = $_POST["graph"];
$graph_array = explode(",", $graph);
$lku = $_POST["lku"];
$lkf = $_POST["lkf"];
$rb = $_POST["rb"];
$sc = $_POST["sc"];
$pp = $_POST["pp"];
$rest = $_POST["rest"];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn -> connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

//$i_sql = "INSERT INTO 'report' (date, graph, lku, lkf, rb, showcase, pp, rest) VALUES ('1', '2', '3', '4', '5', '6', '7', '8')";
// mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')');
//$i_sql = "INSERT INTO  'news' (title, slug, text) VALUES ('title','slug','text')";
$i_sql = "INSERT INTO 'report' (date, graph, lku, lkf, rb, showcase, pp, rest) VALUES ('1','2','3','4','5','6','7','8')";

if ($conn->query($i_sql) === TRUE)
{
    echo "New record created successfully";
}
else
{
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();