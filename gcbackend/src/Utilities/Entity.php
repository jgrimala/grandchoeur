<?php

/**
 * Entity.php
 * Utilities\Entity.php
 */

namespace Utilities;

/**
 * Entity()
 *
 * The Entity class is a base class for all entities in the application.
 * It provides automatic getter and setter methods for entity properties.
 * The getter and setter methods are accessed via magic __call method.
 * It also provides a hydrate method to populate the entity properties from an array.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-21 10:08:02
 */


class Entity
{
	public function __call($method, $arguments)
	{
		// Check if the method starts with 'get' or 'set'
		$prefix = substr($method, 0, 3);
		if ($prefix === 'get' || $prefix === 'set') {
			// Convert the method name to a property name (e.g., getIsAdmin or setIsAdmin becomes is_admin)
			$property = lcfirst(substr($method, 3));
			$property = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $property));

			// If the property exists, handle the get or set operation
			if (property_exists($this, $property)) {
				if ($prefix === 'get') {
					return $this->$property;
				} else {
					$this->$property = $arguments[0];
				}
			}
		}

		// If the method does not start with 'get' or 'set', or the property does not exist, throw an exception
		throw new \Exception("Method $method does not exist");
	}


	public function hydrate(array $data)
	{
		foreach ($data as $key => $value) {
			// If the property exists in the entity, set its value
			if (property_exists($this, $key)) {
				// If the property is a date, convert it to a DateTime object
				if ($key === 'birthdate' && $value !== null) {
					$value = \DateTime::createFromFormat('Y-m-d', $value);
				}

				$this->$key = $value;
			}
		}
	}

	public function toArray()
	{
		$array = [];
		foreach ($this as $key => $value) {
			// Convert the key to snake_case (e.g., fullName becomes full_name)
			$key = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $key));

			// If the value is a DateTime object, convert it to a string
			if ($value instanceof \DateTime) {
				$value = $value->format('Y-m-d');
			}

			$array[$key] = $value;
		}
		unset($array['password_hash']);
		return $array;
	}
}
