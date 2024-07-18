<?php

/**
 * ApiResponder.php
 * Service\ApiResponder.php
 */

namespace Service;

class ApiResponder
{
	/**
	 * The ApiResponder class is responsible for sending JSON responses with appropriate HTTP status codes.
	 * It provides methods to respond with success, error, and unauthorized status.
	 * Respond with a successful HTTP response.
	 * Sets the HTTP status code and sends a JSON response with a success status and the provided data.
	 *
	 * @param mixed $data The data to include in the response.
	 * @param int $statusCode The HTTP status code to set. Defaults to 200.
	 */
	public function respondWithSuccess($data, $statusCode = 200)
	{
		// Set the HTTP status code
		http_response_code($statusCode);
		// Set the Content-Type header to application/json
		header('Content-Type: application/json');
		// Send a JSON response with a success status and the provided data
		echo json_encode(['success' => true, 'data' => $data]);
		exit;
	}

	/**
	 * Respond with an error HTTP response.
	 * Sets the HTTP status code and sends a JSON response with an error status and the provided message.
	 *
	 * @param string $message The error message to include in the response.
	 * @param int $statusCode The HTTP status code to set. Defaults to 400.
	 */
	public function respondWithError($message, $statusCode = 400)
	{
		// Set the HTTP status code
		http_response_code($statusCode);
		// Set the Content-Type header to application/json
		header('Content-Type: application/json');
		// Send a JSON response with an error status and the provided message
		echo json_encode(['success' => false, 'error' => $message]);
		exit;
	}

	/**
	 * Respond with an unauthorized HTTP response.
	 * Calls the respondWithError method with a 401 status code and the provided message.
	 *
	 * @param string $message The error message to include in the response. Defaults to 'Unauthorized'.
	 */
    public static function respondUnauthorized($message = "Unauthorized")
    {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['error' => $message]);
        exit();
    }
}
