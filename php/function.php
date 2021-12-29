<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>function</title>
</head>
<body>
    <h1>function</h1>
    <?php 
        $str = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempore culpa quo earum esse.
        Veniam molestias minus officiis iure. 
        Blanditiis earum maiores dolorum debitis quae eum vero quam perspiciatis suscipit.";

        echo $str;
    ?>

    <h2>strlen()</h2>
    <?php 
        echo strlen($str);
    ?>

    <h2>nl2br</h2>
    <?php 
        echo nl2br($str);
    ?>
</body>
</html>