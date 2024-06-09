<?php

/**
 * FeatureFlagController.php
 * Classes\FeatureFlag\FeatureFlagController.php
 */

namespace Classes\FeatureFlag;

use Classes\FeatureFlag\FeatureFlagDao;
use Service\ApiResponder; 

/**
 * FeatureFlagController()
 *
 * Description of the class
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 14:36:39
 */

class FeatureFlagController {
    private $featureFlagDao; // Feature Flag Data Access Object
    private $responder; // API Responder

    public function __construct()
    {
        $this->featureFlagDao = new FeatureFlagDao();
        $this->responder = new ApiResponder();
    }

    // Method to send JSON response
    private function sendJsonResponse($data, $status = 200)
    {
        header('Content-Type: application/json');
        http_response_code($status); // Set the HTTP response code
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
        $flag = $this->featureFlagDao->getFeatureFlagById($id);
    
        if ($flag) {
            // Update the 'is_enabled' property only if it's included in the input data
            if (isset($data['is_enabled'])) {
                $flag['is_enabled'] = filter_var($data['is_enabled'], FILTER_VALIDATE_BOOLEAN); // Ensure the value is treated as a boolean
    
                // Save the updated feature flag
                $result = $this->featureFlagDao->updateFeatureFlag($id, $flag);
                
                // Return the updated feature flag data
                $this->sendJsonResponse($flag);
            } else {
                // No relevant data to update
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
}