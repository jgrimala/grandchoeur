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

class AuthTokenMiddleware
{
	private $authService;
	private $responder;

	public function __construct($authService, $responder)
	{
		$this->authService = $authService;
		$this->responder = $responder;
	}

	public function handle($request, $next)
	{
		$token = $request->getHeader('Authorization');
		$user = $this->authService->getUserFromToken($token);

		if ($user) {
			error_log("User is_admin: " . $user->is_admin); // Log the user's admin status

			if ($user->is_admin) {
				return $next($request);
			}
		}

		return $this->responder->unauthorized();
	}

	/**
	 * This method is used to authenticate the provided JWT token.
	 * It decodes the token using the secret key and returns the data contained in the token.
	 * If the token is invalid or expired, it catches the exception and returns null.
	 *
	 * @param string $token The JWT token to authenticate.
	 * @return object|null The data contained in the token, or null if the token is invalid or expired.
	 */
	public static function authenticateToken($token)
	{
		try {
			$secretKey = $_ENV['JWT_SECRET_KEY'];
			$decoded = JWT::decode($token, new Key($secretKey, 'HS512'));
			return $decoded->data;
		} catch (\Exception $e) {
			return null;
		}
	}

	/**
	 * Extracts the JWT token from the Authorization header of the request.
	 * 
	 * @param mixed $request The request object. 
	 * @return string|null The JWT token if found, null otherwise.
	 */
	private static function getTokenFromHeader()
	{
		$headers = apache_request_headers();
		$authorization = $headers['Authorization'] ?? null;
		if ($authorization && preg_match('/Bearer\s(\S+)/', $authorization, $matches)) {
			error_log("Token received: " . $matches[1]); // Log the token to verify it's received
			return $matches[1];
		}
		error_log("No Authorization token found");
		return null;
	}


	/**
	 * Check if the authenticated user is an admin.
	 * 
	 * @param string $token The JWT token to authenticate.
	 * @return bool True if user is admin, false otherwise.
	 */
	public static function isAdmin()
	{
		$token = self::getTokenFromHeader();
		if (!$token) {
			error_log("No token found.");
			return false;
		}

		try {
			$secretKey = $_ENV['JWT_SECRET_KEY'];
			$decoded = JWT::decode($token, new Key($secretKey, 'HS512'));

			// Ensure you are accessing the nested data correctly.
			$isAdmin = $decoded->data->is_admin ?? false; // Using null coalescing operator to handle undefined index.

			error_log("isAdmin: " . var_export($isAdmin, true)); // Log the is_admin value to help with debugging.
			return $isAdmin;
		} catch (\Exception $e) {
			error_log("JWT decoding failed: " . $e->getMessage()); // Log any exceptions during JWT decoding.
			return false;
		}
	}
}
