<?php

// Gestion des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclusion
include __DIR__ . "../../src/Database.php";
include __DIR__ . "../../src/MakingsModel.php";

// Code principals

try {
    if ($_POST["Id"] > 0){
        // Instanciation de MakingModel
        $makingsModel = new MakingsModel();

        //Suppression d'un nouveau contenu
        $makingsModel->deleteMaking();

        echo $_POST["Id"];
    }
}

catch (Exception $e){

    echo 'Erreur : ' . $e->getMessage();
}

