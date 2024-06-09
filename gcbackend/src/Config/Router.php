<?php

/**
 * Router.php
 * Config\Router.php
 */

namespace Config;  // Adjust the namespace if necessary

/**
 * Router()
 *
 * This script defines the Router class.
 * The Router class is responsible for managing the routes of the application.
 * It provides methods to add routes and dispatch requests to the appropriate handlers.
 * The routes are stored in an associative array, and the base path of the application is defined as a class property.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:40:31
 */

class Router
{
    // Array to store the routes
    private $routes = [];
    // Base path of the application
    private $basePath = '/GrandChoeur/gcbackend/public/index.php';

    // Method to add a new route
    public function addRoute($method, $uri, $callback)
    {
        // Store the callback for the given method and URI
        $this->routes[$method][$uri] = $callback;
    }

    // Method to dispatch the request to the appropriate route
    public function dispatch()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = $this->removeBasePath($uri);
        error_log('Processed URI: ' . $uri);

        if (isset($this->routes[$method])) {
            foreach ($this->routes[$method] as $path => $handler) {
                // Ensure handler is correctly set up with either 2 (controller, method) or 3 (controller, method, middleware) elements
                if (!is_array($handler) || (count($handler) < 2 || count($handler) > 3)) {
                    continue;  // Skip if handler format is incorrect
                }

                // Match the URI to the route pattern
                $pathRegex = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9_]+)', $path);
                if (preg_match("~^$pathRegex$~", $uri, $matches)) {
                    array_shift($matches); // Remove the full match from the matches

                    // Special handling for POST requests to /login
                    if ($method === 'POST' && $path === '/login') {
                        // Decode the JSON body
                        $input = json_decode(file_get_contents('php://input'), true);
                        if ($input && isset($input['username'], $input['password'])) {
                            $matches = [$input['username'], $input['password']];
                        } else {
                            // Respond with an error if username or password is not provided
                            header("HTTP/1.1 400 Bad Request");
                            echo json_encode(['error' => 'Username and password are required']);
                            return;
                        }
                    }

                    // Execute middleware if set
                    // if (isset($handler[2]) && !call_user_func($handler[2], $_SERVER)) {
                    //     header("HTTP/1.1 403 Forbidden");
                    //     echo json_encode(['error' => 'Access denied. Admins only.']);
                    //     return;
                    // }

                    // Execute the controller action
                    call_user_func_array([$handler[0], $handler[1]], $matches);
                    return;
                }
            }
        }

        // No matching route found, respond with 404
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['error' => 'Not Found']);
    }

    // Method to remove the base path from a URI
    private function removeBasePath($uri)
    {
        // If the URI starts with the base path
        if (substr($uri, 0, strlen($this->basePath)) === $this->basePath) {
            // Remove the base path from the URI
            return substr($uri, strlen($this->basePath));
        }
        // If the URI doesn't start with the base path, return it as is
        return $uri;
    }

    // This method sends a 404 Not Found response.
    // It sets the HTTP response header to "404 Not Found" and echoes a message to the body of the response.
    private function sendNotFoundResponse()
    {
        header("HTTP/1.0 404 Not Found");
        echo "404 Not Found";
    }
}
