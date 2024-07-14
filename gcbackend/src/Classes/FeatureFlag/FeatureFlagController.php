<?php

/**
 * FeatureFlagController.php
 * Classes\FeatureFlag\FeatureFlagController.php
 */

namespace Classes\FeatureFlag;

use Classes\FeatureFlag\FeatureFlagDao;
use Service\ApiResponder;
use Middleware\AuthTokenMiddleware;
use Service\AuthenticationService;

class FeatureFlagController
{
	private $featureFlagDao; // Feature Flag Data Access Object
	private $responder; // API Responder
	private $authService;

	public function __construct($db)
	{
		$this->featureFlagDao = new FeatureFlagDao($db);
		$this->responder = new ApiResponder();
		$this->authService = new AuthenticationService();
	}

	// Method to send JSON response
	private function sendJsonResponse($data, $status = 200)
	{
		error_log("Sending response data: " . print_r($data, true));  // Log the actual data being sent
		header('Content-Type: application/json');
		http_response_code($status);
		echo json_encode($data);
	}

	// Method to get all feature flags
	public function getFeatureFlags()
	{
		$flags = $this->featureFlagDao->getAllFeatureFlags();
		$this->sendJsonResponse($flags);
	}

	// Method to get a feature flag by ID
	public function getFeatureFlag($id)
	{
		$flag = $this->featureFlagDao->getFeatureFlagById($id);
		if ($flag) {
			$this->sendJsonResponse($flag);
		} else {
			$this->sendJsonResponse(['error' => 'Feature flag not found'], 404);
		}
	}

	// Method to get a user-specific feature flag by feature name
	public function getFeatureFlagForUser($userId, $flagName)
	{
		$flagValue = $this->featureFlagDao->getFeatureFlagForUser($userId, $flagName);
		$this->sendJsonResponse(['flag_value' => $flagValue]);
	}

	// Method to create a new feature flag
	public function createFeatureFlag()
	{
		if (!AuthTokenMiddleware::isAdmin()) {
			return $this->responder->respondUnauthorized();
		}

		$data = json_decode(file_get_contents('php://input'), true);
		// Here, add validation and sanitation of $data as necessary

		$result = $this->featureFlagDao->createFeatureFlag($data);
		$this->sendJsonResponse($result);
	}

	// Method to update a feature flag
	public function updateFeatureFlag($id)
	{
		if (!AuthTokenMiddleware::isAdmin()) {
			return $this->responder->respondUnauthorized("Access denied.");
		}
	
		$data = json_decode(file_get_contents('php://input'), true);
		$flag = $this->featureFlagDao->getFeatureFlagById($id);
	
		if ($flag) {
			if (isset($data['is_enabled'])) {
				$flag['is_enabled'] = filter_var($data['is_enabled'], FILTER_VALIDATE_BOOLEAN);
				$result = $this->featureFlagDao->updateFeatureFlag($id, $flag);
				$this->sendJsonResponse($result);
			} else {
				$this->sendJsonResponse(['error' => 'No update data provided for is_enabled property'], 400);
			}
		} else {
			$this->sendJsonResponse(['error' => 'Feature flag not found'], 404);
		}
	}

	// Method to delete a feature flag
	public function deleteFeatureFlag($id)
	{
		if (!AuthTokenMiddleware::isAdmin()) {
			return $this->responder->respondUnauthorized();
		}

		$flag = $this->featureFlagDao->getFeatureFlagById($id);

		if ($flag) {
			$this->featureFlagDao->deleteFeatureFlag($id);
			$this->sendJsonResponse(['success' => 'Feature flag with Id ' . $id . ' was deleted successfully']);
		} else {
			$this->sendJsonResponse(['error' => 'Feature flag not found'], 404);
		}
	}

	public function createOrUpdateFeatureFlag()
	{
		if (!AuthTokenMiddleware::isAdmin()) {
			return $this->responder->respondUnauthorized();
		}

		$data = json_decode(file_get_contents('php://input'), true);
		if (isset($data['user_id'], $data['feature_name'])) {
			$existingFlag = $this->featureFlagDao->getFeatureFlagForUser($data['user_id'], $data['feature_name']);
			if ($existingFlag !== null) {
				// Update existing feature flag
				$result = $this->featureFlagDao->updateFeatureFlagByUserAndName($data['user_id'], $data['feature_name'], $data);
			} else {
				// Create new feature flag
				$result = $this->featureFlagDao->createFeatureFlag($data);
			}
			$this->sendJsonResponse($result);
		} else {
			$this->sendJsonResponse(['error' => 'Invalid data'], 400);
		}
	}
}
