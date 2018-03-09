<?php

class MakingsModel
{
    // Propriétés
    protected $db;

    // Constructeur
    public function __construct()
    {
        try {
            $this->db = new Database;
        }
        catch (Exception $exception){
            echo '<p>' . $e->getMessage() . '</p>';
        }
    }

    // Methodes

    public function getMakings()
    {
        $sql = 'SELECT *
                FROM makings
                ORDER BY Id DESC';
        $makings = $this->db->query($sql);
        return $makings;
    }

    public function addMakings()
    {
        $sql = 'INSERT INTO Makings (Name, Created, Description, Link, Languages, Image)
                VALUES (:Name, :Created, :Description, :Link, :Languages, :Image)';
        $params = array(
                "Name" => $_POST["Name"],
                "Created" => $_POST["Created"],
                "Description" => $_POST["Description"],
                "Link" => $_POST["Link"],
                "Languages" => $_POST["Languages"],
                "Image" => $_POST["Image"]
        );
        $this->db->insertInto($sql, $params);
    }

    public function  deleteMaking()
    {
        $sql = 'DELETE *
                FROM makings
                WHERE Id = ?';

        $params = array($_POST['Id']);
        $this->db->delete($sql, $params);
    }
}

