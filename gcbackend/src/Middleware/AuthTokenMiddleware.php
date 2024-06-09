<?php

/**
 * AuthTokenMiddleware.php
 * Middleware\AuthTokenMiddleware.php
 */

namespace Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


/**
 * AuthTokenMiddleware()
 *
 * This script defines the AuthTokenMiddleware class.
 * The AuthTokenMiddleware class is responsible for handling authentication tokens in the application.
 * It provides methods to validate tokens, extract user information from tokens, and handle token-related errors.
 * This middleware is used to protect routes that require authentication.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:53:44
 */

 class AuthTokenMiddleware {

    /**
     * This method is used to authenticate the provided JWT token.
     * It decodes the token using the secret key and returns the data contained in the token.
     * If the token is invalid or expired, it catches the exception and returns null.
     *
     * @param string $token The JWT token to authenticate.
     * @return object|null The data contained in the token, or null if the token is invalid or expired.
     */
    public static function authenticateToken($token) {
        try {
            // Get the secret key from environment variables
            $secretKey = $_ENV['JWT_SECRET_KEY'];
            // Decode the token using the secret key
            $decoded = JWT::decode($token, new Key($secretKey, 'HS512'));
            // Return the data in the token
            return $decoded->data;
        } catch (\Exception $e) {
            // If the token is invalid or expired, catch the exception and return null
            return null;
        }
    }

    /**
     * Extracts the JWT token from the Authorization header of the request.
     * 
     * @param mixed $request The request object. 
     * @return string|null The JWT token if found, null otherwise.
     */
    private static function getTokenFromHeader() {
        $headers = apache_request_headers();
        $authorization = $headers['Authorization'] ?? null;
        if ($authorization && preg_match('/Bearer\s(\S+)/', $authorization, $matches)) {
            return $matches[1];
        }
        return null;
    }


    /**
     * Check if the authenticated user is an admin.
     * 
     * @param string $token The JWT token to authenticate.
     * @return bool True if user is admin, false otherwise.
     */
    public static function isAdmin() {
        $token = self::getTokenFromHeader();
        if (!$token) {
            return false;
        }

        try {
            $secretKey = $_ENV['JWT_SECRET_KEY'];
            $decoded = JWT::decode($token, new Key($secretKey, 'HS512'));
            // Check the isAdmin flag in the decoded token
            return isset($decoded->data->isAdmin) && $decoded->data->isAdmin;
        } catch (\Exception $e) {
            // If the token is invalid or expired, catch the exception and return false
            return false;
        }
    }
}