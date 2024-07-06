<?php

/**
 * FeatureFlagEntity.php
 * Classes\FeatureFlag\FeatureFlagEntity.php
 */

namespace Classes\FeatureFlag;

use Utilities\Entity;


/**
 * FeatureFlagEntity()
 *
 * This class represents a feature flag in the system.
 * It contains properties that correspond to the fields in the feature_flags database table,
 * and relies on the Entity base class to provide automatic getter and setter methods as well as hydration.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-23 19:20:29
 */

class FeatureFlagEntity extends Entity
{
	protected $id;
	protected $feature_name;
	protected $is_enabled;
	protected $created_at;
	protected $expiry_date;
	protected $created_by;
	protected $description;

	public function __construct(array $data = null)
	{
		if ($data) {
			$this->hydrate($data);
		}
	}
}
