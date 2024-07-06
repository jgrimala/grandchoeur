<?php

/**
 * UserController.php
 * Classes\User\UserController.php
 */

namespace Classes\User;

use Classes\User\UserDao;
use \Firebase\JWT\JWT;
use Service\ApiResponder;
use Service\AuthenticationService;
use Middleware\AuthTokenMiddleware;

/**
 * UserController()
 *
 * This class is responsible for handling HTTP requests related to users.
 * It provides methods for various operations such as creating a new user, updating user information, deleting a user, etc.
 * Each method corresponds to a specific HTTP verb (GET, POST, PUT, DELETE) and a specific URL path.
 * The responses are typically formatted in JSON for consumption by a client-side application or API.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:34:16
 */

class UserController
{
	private $userDao; // User Data Access Object
	private $responder; // API Responder
	private $authService;

	public function __construct()
	{
		$this->authService = new AuthenticationService();
		$this->userDao = new UserDao();
	}

	// Method to send JSON response
	private function sendJsonResponse($data)
	{
		// Set header to application/json
		header('Content-Type: application/json');
		// Echo the data as a JSON string
		echo json_encode($data, JSON_PRETTY_PRINT);
	}

	/**
	 * Handle user login, delegate auth to AuthenticationService.
	 *
	 * @param string $username
	 * @param string $password
	 * @return string|null JWT token or null if authentication fails.
	 */
	public function login($username, $password)
	{
		$content = file_get_contents('php://input');
		$data = json_decode($content, true);

		$username = $data['username'] ?? '';
		$password = $data['password'] ?? '';

		if (empty($username) || empty($password)) {
			$this->sendJsonResponse(['error' => 'Username and password are required.'], 400);
			return;
		}

		$token = $this->authService->authenticate($username, $password);
		if (!$token) {
			$this->sendJsonResponse(['error' => 'Invalid username or password'], 401);
			return;
		}

		$response = [
			"success" => true,
			"data" => [
				"user" =>  ['username' => $username], // replace with actual user data
				"token" => $token // replace with actual token
			]
		];

		$this->sendJsonResponse($response);
		// Delegate the authentication process to AuthenticationService

	}

	// Method to get all users
	public function getUsers()
	{
		$o_user = $this->userDao->getAllUsers();
		$this->sendJsonResponse($o_user);
	}

	// Method to get a user by ID
	public function getUser($id)
	{
		$o_user = $this->userDao->getUserById($id);
		$this->sendJsonResponse($o_user);
	}

	// Method to create a new user
	public function createUser()
	{
		$content = file_get_contents('php://input');
		$data = json_decode($content, true);
		// Validate and sanitize $postData here as necessary

		$userId = $this->userDao->createUser($data);
		$this->sendJsonResponse($userId);
	}


	// Method to update a user
	public function updateUser($id)
	{
		// Validate and sanitize the input data
		$data = json_decode(file_get_contents('php://input'), true);
		$user = $this->userDao->getUserById($id);

		// Check if the user exists
		if ($user) {
			// Process the updated user data or return a response
			$this->userDao->updateUser($id, $data);
			$this->getUser($id);
		} else {
			// Return a response indicating that the user does not exist
			$this->sendJsonResponse(['error' => 'User not found']);
		}
	}

	// Method to delete a user
	public function deleteUser($id)
	{
		$user = $this->userDao->getUserById($id);

		// Check if the user exists
		if ($user) {
			$this->userDao->deleteUser($id);
			$this->sendJsonResponse(['success' => 'User with Id ' . $id . ' was deleted successfully']);
		} else {
			$this->sendJsonResponse(['error' => 'User not found']);
		}
	}
}
