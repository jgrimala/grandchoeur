<?php

/**
 * AuthenticationService.php
 * Service\AuthenticationService.php
 */

namespace Service;

use Firebase\JWT\JWT;
use Classes\User\UserDao;
use Service\ApiResponder;

/**
 * AuthenticationService()
 *
 * This script defines the AuthenticationService class.
 * The AuthenticationService class is responsible for handling user authentication in the application.
 * It provides methods to login a user, logout a user, and check if a user is authenticated.
 * This service is used to protect routes that require authentication and manage user sessions.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:59:54
 */

class AuthenticationService
{
    private $userDao;
    private $secretKey;
    private $responder; // API Responder
    /**
     * Constructor for the AuthenticationService class.
     * Initializes a new instance of the UserDao class and gets the JWT secret key from environment variables.
     */
    public function __construct()
    {
        // Initialize a new instance of the UserDao class
        $this->userDao = new UserDao();
        // Get the JWT secret key from environment variables
        $this->secretKey = $_ENV['JWT_SECRET_KEY'];
        $this->responder = new ApiResponder();
    }

    /**
     * Authenticate a user with the provided username and password.
     * If the user is authenticated, generates a JWT token for the user and returns it.
     *
     * @param string $username The username of the user.
     * @param string $password The password of the user.
     * @return string|null The JWT token for the user, or null if the user is not authenticated.
     */
    public function authenticate($username, $password)
    {
        // Authenticate the user
        $user = $this->userDao->authenticateUser($username, $password);
        if (!$user) {
            // Return null or throw an exception
            return null;
        }
        // If authentication is successful, generate a JWT token
        $token = $this->generateToken($user);

        return $token;
    }

    /**
     * Generate a JWT token for the provided user.
     * The token contains the user's ID and username, and is signed with the secret key.
     *
     * @param User $user The user for which to generate the token.
     * @return string The JWT token for the user.
     */
    private function generateToken($user)
    {
        // Generate a random token ID
        $tokenId    = base64_encode(random_bytes(16));
        // Get the current time
        $issuedAt   = new \DateTimeImmutable();
        // Set the token to expire in 6 hours
        $expire     = $issuedAt->modify('+6 hours')->getTimestamp();
        // Set the issuer of the token
        $serverName = "localhost";

        // The data to include in the token
        $data = [
            'iat'  => $issuedAt->getTimestamp(), // Issued at
            'jti'  => $tokenId, // Token ID
            'iss'  => $serverName, // Issuer
            'nbf'  => $issuedAt->getTimestamp(), // Not before
            'exp'  => $expire, // Expiration time
            'data' => [ // Data
                'userId'   => $user->getId(), // User ID
                'userName' => $user->getUsername(), // Username
                'isAdmin'     => $user->getIsAdmin() // Role
            ]
        ];

        $secretKey = $_ENV['JWT_SECRET_KEY'];            // Retrieve from a secure location
        $jwt = JWT::encode($data, $secretKey, 'HS512');
        // Encode the data into a JWT token and return it
        return $jwt;
    }
}
