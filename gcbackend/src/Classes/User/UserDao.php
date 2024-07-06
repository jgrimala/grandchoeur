<?php

/**
 * UserDao.php
 * Classes\User\UserDao.php
 */

namespace Classes\User;

use Classes\User\UserEntity;
use Config\DatabaseConnection; // Replace with your actual database connection class

/**
 * UserDao()
 *
 * This file is part of the User Management module of the application.
 * It contains the UserDao class, which provides methods for interacting with the user data in the database.
 * This includes actions like authenticating a user, retrieving all users, retrieving a user by ID, and creating a new user.
 * The methods in this class use PDO to interact with the database, and they return the results in an associative array format.
 * This class handles all interactions with the User database table.
 * It provides methods to create, read, update, and delete User records.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:36:59
 */

class UserDao
{
	private $db;

	public function __construct()
	{
		$this->db = new DatabaseConnection();
	}
	public function authenticateUser($username, $password)
	{
		// Query database for user
		$stmt = $this->db->prepare("SELECT * FROM user WHERE username = ?");
		$stmt->bindParam(1, $username);
		$stmt->execute(); // This is necessary to actually run the query

		$user = $stmt->fetch(\PDO::FETCH_ASSOC);  // Fetches the next row from the result set as an array
		error_log("User data: " . print_r($user, true));
		if ($user && password_verify($password, $user['password_hash'])) {
			$userEntity = new UserEntity($user);

			// Return the UserEntity
			return $userEntity;
		} else {
			return null;
		}
	}


	public function getAllUsers()
	{
		// $query = "SELECT * FROM user";
		// $stmt = $this->db->prepare($query);
		// $stmt->execute();

		// return $stmt->fetchAll();

		$query = "SELECT * FROM user";
		$stmt = $this->db->prepare($query);
		$stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_ASSOC);
	}


	public function getUserById($id)
	{
		$query = "SELECT * FROM user WHERE id = ?";
		$stmt = $this->db->prepare($query);
		$stmt->execute([$id]);

		return $stmt->fetch(\PDO::FETCH_ASSOC);
	}

	public function createUser($data)
	{

		// Extract the necessary data from the $data array (e.g., name, email, password)
		try {
			// Hash the password (you should never store passwords in plaintext)
			$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

			// Prepare the SQL query
			$query = "INSERT INTO user (username, email, password_hash, full_name, is_admin) VALUES (?, ?, ?, ?, ?)";
			$stmt = $this->db->prepare($query);

			// Bind parameters
			$stmt->bindParam(1, $data['username']);
			$stmt->bindParam(2, $data['email']);
			$stmt->bindParam(3, $hashedPassword);
			$stmt->bindParam(4, $data['full_name']);
			$stmt->bindParam(5, $data['is_admin']);

			// Execute the query
			$stmt->execute();
			$userId = $this->db->getConnection()->lastInsertId();

			// Fetch the user data
			$user = $this->getUserById($userId);

			// Return the user data in the JSON response
			return ['status' => 'User created successfully', 'user' => $user];
		} catch (\PDOException $e) {
			// Handle the exception (log, display an error, etc.)
			// echo "User creation failed: " . $e->getMessage();
			return ['status' => "User creation failed", 'message' => $e->getMessage()];
		}
		// Create a new User entity
		// $user = new User($name, $email, $password);

		// Persist the user entity to the database using your database connection

		// Return the ID of the created user
	}

	public function updateUser($id, $data)
	{
		try {
			// Prepare the SQL query
			$query = "UPDATE user SET username = ?, email = ?, full_name = ?, is_admin = ? WHERE id = ?";
			$stmt = $this->db->prepare($query);

			// Bind parameters
			$stmt->bindParam(1, $data['username']);
			$stmt->bindParam(2, $data['email']);
			$stmt->bindParam(3, $data['full_name']);
			$stmt->bindParam(4, $data['is_admin']);
			$stmt->bindParam(5, $id);

			// Execute the query
			$stmt->execute();

			// Fetch the updated user data
			$user = $this->getUserById($id);

			// Return the user data in the JSON response
			return ['status' => 'User updated successfully', 'user' => $user];
		} catch (\PDOException $e) {
			// Handle the exception (log, display an error, etc.)
			return ['status' => "User update failed", 'message' => $e->getMessage()];
		}
	}
	public function deleteUser($id)
	{
		try {
			// Prepare the SQL query
			$query = "DELETE FROM user WHERE id = ?";
			$stmt = $this->db->prepare($query);

			// Bind parameters
			$stmt->bindParam(1, $id);

			// Execute the query
			$stmt->execute();

			// Return the status in the JSON response
			return ['status' => 'User deleted successfully'];
		} catch (\PDOException $e) {
			// Handle the exception (log, display an error, etc.)
			return ['status' => "User deletion failed", 'message' => $e->getMessage()];
		} // Delete the corresponding user record from the database using your database connection
	}
}
