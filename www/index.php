<?php
// Gestion des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclusion
include __DIR__ . "../../src/Database.php";
include __DIR__ . "../../src/MakingsModel.php";

// Code principals
$makingsModel = new MakingsModel();
$makings = $makingsModel->getMakings();
//var_dump($makings);


// Affichage
include __DIR__ . "/views/index.phtml";