<?php

// Gestion des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclusion
include __DIR__ . "../../src/Database.php";
include __DIR__ . "../../src/MakingsModel.php";

// Code principals

// Récupération des données envoyées via xmlHttpRequest
$_POST = $_POST["Id"];

// Décodage du Json en tableau associatif (true)
$_POST = json_decode($_POST, true);

var_dump($_POST);