<?php

$content = file_get_contents(__DIR__ . '/example/index.html');

$content = str_replace('../src/assets/', '/src/assets/', $content);
$content = str_replace('example.css', '/example/example.css', $content);

echo $content;
