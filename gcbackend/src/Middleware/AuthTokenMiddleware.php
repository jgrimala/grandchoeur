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
    private $secretKey;

    public function __construct()
    {
        $this->secretKey = $_ENV['JWT_SECRET_KEY'];
    }

    public function handle($request, $next)
    {
        $token = $this->getTokenFromHeader();
        if (!$token) {
            return $this->respondUnauthorized("No token provided.");
        }

        try {
            $decodedToken = JWT::decode($token, new Key($this->secretKey, 'HS512'));
            if ($decodedToken->data->is_admin) {
                return $next($request);
            } else {
                return $this->respondUnauthorized("Access denied.");
            }
        } catch (\Exception $e) {
            return $this->respondUnauthorized("Invalid or expired token.");
        }
    }

    private function respondUnauthorized($message)
    {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['error' => $message]);
        exit;
    }

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

    public static function getUserId()
    {
        $token = self::getTokenFromHeader();
        if (!$token) {
            error_log("No token found.");
            return null; 
        }

        try {
            $secretKey = $_ENV['JWT_SECRET_KEY'];
            $decoded = JWT::decode($token, new Key($secretKey, 'HS512'));
            $userId = $decoded->data->userId ?? null;
            error_log("UserId check: " . var_export($userId, true));
            return $userId;
        } catch (\Exception $e) {
            error_log("JWT decoding failed: " . $e->getMessage());
            return null;
        }
    }
}
