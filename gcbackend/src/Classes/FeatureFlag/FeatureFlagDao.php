<?php

/**
 * FeatureFlagDao.php
 * Classes\FeatureFlag\FeatureFlagDao.php
 */

namespace Classes\FeatureFlag;

use Classes\FeatureFlag\FeatureFlagEntity;
use Config\DatabaseConnection;

/**
 * FeatureFlagDao()
 *
 * Description of the class
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 14:36:04
 */

class FeatureFlagDao
{
    private $db;

    public function __construct()
    {
        $this->db = new DatabaseConnection();
    }

    public function getAllFeatureFlags()
    {
        $query = "SELECT * FROM feature_flags";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getFeatureFlagById($id)
    {
        $query = "SELECT * FROM feature_flags WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$id]);

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getFeatureFlagForUser($userId, $flagName)
    {
        $query = "SELECT is_enabled FROM feature_flags WHERE user_id = ? AND feature_name = ?";
        $stmt = $this->db->prepare($query);
        $stmt->execute([$userId, $flagName]);

        return $stmt->fetch(\PDO::FETCH_ASSOC)['is_enabled'] ?? false;
    }

    public function createFeatureFlag($data)
    {
        try {
            $query = "INSERT INTO feature_flags (user_id, feature_name, is_enabled, created_at, expiry_date, created_by, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $this->db->prepare($query);

            $stmt->bindParam(1, $data['user_id']);
            $stmt->bindParam(2, $data['feature_name']);
            $stmt->bindParam(3, $data['is_enabled']);
            $stmt->bindParam(4, $data['created_at']);
            $stmt->bindParam(5, $data['expiry_date']);
            $stmt->bindParam(6, $data['created_by']);
            $stmt->bindParam(7, $data['description']);

            $stmt->execute();
            $featureFlagId = $this->db->getConnection()->lastInsertId();

            return $this->getFeatureFlagById($featureFlagId);
        } catch (\PDOException $e) {
            return ['status' => "Feature flag creation failed", 'message' => $e->getMessage()];
        }
    }

    public function updateFeatureFlag($id, $data)
    {
        try {
            $query = "UPDATE feature_flags SET is_enabled = ? WHERE id = ?";
            $stmt = $this->db->prepare($query);

            $isEnabled = filter_var($data['is_enabled'], FILTER_VALIDATE_BOOLEAN);
            error_log("is_enabled value in DAO: " . print_r($isEnabled, true));

            $stmt->bindParam(1, $isEnabled, \PDO::PARAM_BOOL);
            $stmt->bindParam(2, $id);

            $stmt->execute();

            return $this->getFeatureFlagById($id);
        } catch (\PDOException $e) {
            return ['status' => "Feature flag update failed", 'message' => $e->getMessage()];
        }
    }

    public function deleteFeatureFlag($id)
    {
        try {
            $query = "DELETE FROM feature_flags WHERE id = ?";
            $stmt = $this->db->prepare($query);

            $stmt->bindParam(1, $id);
            $stmt->execute();

            return ['status' => 'Feature flag deleted successfully'];
        } catch (\PDOException $e) {
            return ['status' => "Feature flag deletion failed", 'message' => $e->getMessage()];
        }
    }

    public function updateFeatureFlagByUserAndName($userId, $featureName, $data)
    {
        try {
            $query = "UPDATE feature_flags SET is_enabled = ?, created_at = ? WHERE user_id = ? AND feature_name = ?";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(1, $data['is_enabled']);
            $stmt->bindParam(2, $data['created_at']);
            $stmt->bindParam(3, $userId);
            $stmt->bindParam(4, $featureName);

            $stmt->execute();
            return $this->getFeatureFlagForUser($userId, $featureName);
        } catch (\PDOException $e) {
            return ['status' => "Feature flag update failed", 'message' => $e->getMessage()];
        }
    }
}
