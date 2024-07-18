<?php

/**
 * routes.php
 * 
 * This script defines the routes for the application.
 * It creates a new Router instance and defines routes for login and User CRUD operations.
 * Each route is associated with a method in the UserController class.
 * 
 * @version: 1.0
 * @since: 2024-04-20 14:00:00
 */

use Config\Router;
use Classes\User\UserController;
use Classes\FeatureFlag\FeatureFlagController;
use Classes\ChoirMember\ChoirMemberController;
use Config\DatabaseConnection;
use Middleware\AuthTokenMiddleware;
use Service\ApiResponder;

$router = new Router();

$database = new DatabaseConnection();
$db = $database->getConnection();

$userController = new UserController($db);
$featureFlagController = new FeatureFlagController($db);
$choirMemberController = new ChoirMemberController($db);

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
$router->addRoute('POST', '/featureflag', [$featureFlagController, 'createOrUpdateFeatureFlag']);
$router->addRoute('PUT', '/featureflag/{id}', [$featureFlagController, 'updateFeatureFlag']);
$router->addRoute('DELETE', '/featureflag/{id}', [$featureFlagController, 'deleteFeatureFlag']);

// User-specific Feature Flag Route
$router->addRoute('GET', '/featureflag/user/{userId}/{flagName}', [$featureFlagController, 'getFeatureFlagForUser']);
$router->addRoute('POST', '/featureflag', [$featureFlagController, 'createOrUpdateFeatureFlag']);

// Choir Member Routes
$router->addRoute('GET', '/choir-members', [$choirMemberController, 'getAllChoirMembers']);
$router->addRoute('GET', '/choir-member/{id}', [$choirMemberController, 'getChoirMember']);
$router->addRoute('POST', '/choir-member', [$choirMemberController, 'createChoirMember']);
$router->addRoute('PUT', '/choir-member/{id}', [$choirMemberController, 'updateChoirMember']);
$router->addRoute('DELETE', '/choir-member/{id}', [$choirMemberController, 'deleteChoirMember']);

// $router->addRoute('PUT', '/choir-member/{id}/display-contact', function($id) use ($db) {
//     if (!AuthTokenMiddleware::isAdmin() && AuthTokenMiddleware::getUserId() != $id) {
//         return ApiResponder::respondUnauthorized("You are not authorized to perform this action.");
//     }
//     $choirMemberController = new ChoirMemberController($db);
//     return $choirMemberController->updateDisplayContact($id);
// });

$router->addRoute('PUT', '/choir-member/{id}/display-contact', [$choirMemberController, 'updateDisplayContact']);

return $router;