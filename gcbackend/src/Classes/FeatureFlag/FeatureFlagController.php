<?php

/**
 * FeatureFlagController.php
 * Classes\FeatureFlag\FeatureFlagController.php
 */
namespace Classes\FeatureFlag;

use Classes\FeatureFlag\FeatureFlagDao;
use Service\ApiResponder;

class FeatureFlagController {
    private $featureFlagDao; // Feature Flag Data Access Object
    private $responder; // API Responder

    public function __construct($db)
    {
        $this->featureFlagDao = new FeatureFlagDao($db);
        $this->responder = new ApiResponder();
    }

    // Method to send JSON response
    private function sendJsonResponse($data, $status = 200)
    {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data, JSON_PRETTY_PRINT);
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
        $data = json_decode(file_get_contents('php://input'), true);
        // Here, add validation and sanitation of $data as necessary

        $result = $this->featureFlagDao->createFeatureFlag($data);
        $this->sendJsonResponse($result);
    }

    // Method to update a feature flag
    public function updateFeatureFlag($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);
        error_log("Received data: " . print_r($data, true));
        $flag = $this->featureFlagDao->getFeatureFlagById($id);

        if ($flag) {
            if (isset($data['is_enabled'])) {
                $flag['is_enabled'] = filter_var($data['is_enabled'], FILTER_VALIDATE_BOOLEAN);
                error_log("Updated flag: " . print_r($flag, true));

                $result = $this->featureFlagDao->updateFeatureFlag($id, $flag);

                $this->sendJsonResponse($flag);
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