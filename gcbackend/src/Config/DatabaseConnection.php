<?php

/**
 * DatabaseConnection.php
 * Config\DatabaseConnection.php
 */

namespace Config;

use PDO;
use PDOException;
use Dotenv\Dotenv;

/**
 * DatabaseConnection()
 *
 * This script defines the DatabaseConnection class.
 * The DatabaseConnection class is responsible for managing the connection to the database.
 * It provides methods to establish a connection, execute queries, and close the connection.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:38:45
 */

 class DatabaseConnection
 {
    
     private $host; // Database host
     private $username; // Database username
     private $password; // Database password
     private $database; // Database name
     private $conn; // PDO connection object
 
     // Constructor
     public function __construct()
     {
         // Load environment variables
         $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
         $dotenv->load();
 
         // Set database parameters
         $this->host = $_ENV['DB_HOST'] ?? 'localhost';
         $this->username = $_ENV['DB_USERNAME'] ?? 'root';
         $this->password = $_ENV['DB_PASSWORD'] ?? '';
         $this->database = $_ENV['DB_NAME'] ?? 'grand_choeur';
 
         // Connect to the database
         $this->connect();
     }
 
     // Connect to the database
     private function connect()
     {
         try {
             // Create a new PDO connection
             $dsn = "mysql:host={$this->host};dbname={$this->database}";
             $this->conn = new PDO($dsn, $this->username, $this->password);
             // Set the PDO error mode to exception
             $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         } catch (PDOException $e) {
             // If the connection fails, output the error message
             echo "Connection failed: " . $e->getMessage();
         }
     }
 
     // Prepare a SQL statement
     public function prepare($query)
     {
         return $this->conn->prepare($query);
     }
 
     // Get the PDO connection object
     public function getConnection()
     {
         return $this->conn;
     }
 }