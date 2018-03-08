<?php
// Gestion des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclusion
include __DIR__ . "../../src/Database.php";
include __DIR__ . "../../src/MakingsModel.php";

// Code Principal
$makingsModel = new MakingsModel(); // Instanciation de MakingModel
$makings = $makingsModel->getMakings(); // Appel de la méthode getMakings, récupération des contenus dans la bdd
//var_dump($makings);

// Affichage
include __DIR__ . "/views/admin.phtml";