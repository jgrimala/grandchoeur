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
		if (!$token) {
			return $this->responder->respondUnauthorized("No token provided.");
		}

		try {
			$decodedToken = JWT::decode($token, new Key($this->secretKey, 'HS512'));
			if ($decodedToken->data->is_admin) {
				return $next($request);
			} else {
				return $this->responder->respondUnauthorized("Access denied.");
			}
		} catch (\Exception $e) {
			return $this->responder->respondUnauthorized("Invalid or expired token.");
		}
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
			$isAdmin = isset($decoded->data->is_admin) && $decoded->data->is_admin;
			error_log("isAdmin check: " . var_export($isAdmin, true));
			return $isAdmin;
		} catch (\Exception $e) {
			error_log("JWT decoding failed: " . $e->getMessage());
			return false;
		}
	}
}
