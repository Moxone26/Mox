<?php

class Database
{
    // Propriétés
    private $pdo;

    // Constructeur
    public function __construct()
    {
        include 'dblogin.php';
        include 'PDOConnection.php';
        $pdoConnection = new PDOconnection($host, $dbname, $user, $password);
        $pdo = $pdoConnection->getConnection();

        // Vérification de la connection à la BDD
        if(is_null($pdo)){
            throw new Exception('Problème de connection PDO');
        }

        $this->pdo = $pdo;
    }

    // Methodes

    public function query($sql, $params = [])
    {
        $query = $this->pdo->prepare($sql);
        $query->execute($params);
        return $query->fetchAll();
    }

    public function insertInto($sql, $params = [])
    {
        $insertInto = $this->pdo->prepare($sql);
        $insertInto->execute($params);
    }

    public function delete($sql, $params = [])
    {
        $delete = $this->pdo->prepare($sql);
        $delete->execute($params);
    }


}