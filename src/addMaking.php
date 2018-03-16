<?php

// Gestion des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Inclusion
include __DIR__ . "../../src/Database.php";
include __DIR__ . "../../src/MakingsModel.php";

// Code principals
try
{
    if(array_key_exists("form", $_POST))
    {
        // Récupération des données envoyées via xmlHttpRequest
        $_POST = $_POST["form"];

        // Décodage du Json en tableau associatif (true)
        $_POST = json_decode($_POST, true);

        // Instanciation de MakingModel
        $makingsModel = new MakingsModel();

        //Ajout d'un nouveau contenu
        $makingsModel->addMakings();

        // Recupération du dernier enregistrement (id le plus élevé)
        $last = $makingsModel->getLastMakings();
        $last = $last[0];
        
        // On renvoi le titre du Post ajouter
        echo json_encode($last);
    }

}

catch (Exception $e)
{

    echo 'Erreur : ' . $e->getMessage();
}

