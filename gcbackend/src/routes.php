<?php

/**
 * routes.php
 * 
 * This script defines the routes for the application.
 * It creates a new Router instance and defines routes for login and User CRUD operations.
 * Each route is associated with a method in the UserController class.
 * 
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 14:00:00
 */

use Config\Router;
use Classes\User\UserController;
use Classes\FeatureFlag\FeatureFlagController;
use Config\DatabaseConnection;
use Middleware\AuthTokenMiddleware;

// Create a new Router instance
$router = new Router();

// Create a new DatabaseConnection instance and get the database connection
$database = new DatabaseConnection();
$db = $database->getConnection();

// Create a new UserController instance with the database connection
$userController = new UserController($db);
$featureFlagController = new FeatureFlagController($db);

// User Routes
$router->addRoute('POST', '/login', [$userController, 'login']);
$router->addRoute('GET', '/users', [$userController, 'getUsers']);
$router->addRoute('GET', '/user/{id}', [$userController, 'getUser']);
$router->addRoute('POST', '/user', [$userController, 'createUser']);
$router->addRoute('PUT', '/user/{id}', [$userController, 'updateUser']);
$router->addRoute('DELETE', '/user/{id}', [$userController, 'deleteUser']);

// Feature Flags Routes
$router->addRoute('GET', '/featureflags', [$featureFlagController, 'getFeatureFlags']);
$router->addRoute('GET', '/featureflag/{id}', [$featureFlagController, 'getFeatureFlag']);
$router->addRoute('POST', '/featureflag', [$featureFlagController, 'createFeatureFlag']);
$router->addRoute('PUT', '/featureflag/{id}', [$featureFlagController, 'updateFeatureFlag']);
$router->addRoute('DELETE', '/featureflag/{id}', [$featureFlagController, 'deleteFeatureFlag']);

return $router;