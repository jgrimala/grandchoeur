<?php
// src/Config/DatabaseConnection.php

namespace Config;

use PDO;
use PDOException;

class DatabaseConnection
{
    private $host;
    private $username;
    private $password;
    private $database;
    private $conn;

    public function __construct()
    {
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->username = $_ENV['DB_USERNAME'] ?? 'root';
        $this->password = $_ENV['DB_PASSWORD'] ?? '';
        $this->database = $_ENV['DB_NAME'] ?? 'grand_choeur';

        $this->connect();
    }

    private function connect()
    {
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->database}";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function prepare($query)
    {
        return $this->conn->prepare($query);
    }

    public function getConnection()
    {
        return $this->conn;
    }
}
