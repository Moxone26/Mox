<?php


class PDOConnection
{
    //Propriétés
    protected $pdo = null;

    // Constructeur
    public function __construct($host, $dbname, $user, $password)
    {
        $dsn = 'mysql:host=' . $host . ';dbname=' . $dbname;

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];

        try {
                $pdo = new PDO($dsn, $user, $password, $options);
                $pdo->exec('SET NAMES UTF8');
                $this->pdo = $pdo;
            }

        catch(PDOException $e)
            {
                echo '<p>' . $e->getMessage() . '</p>';
            }
    }

    public function getConnection()
    {
            return $this->pdo;
    }
}