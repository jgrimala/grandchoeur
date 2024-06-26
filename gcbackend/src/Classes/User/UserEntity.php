<?php

/**
 * UserEntity.php
 * Classes\User\UserEntity.php
 */

namespace Classes\User;

use Utilities\Entity;
/**
 * UserEntity()
 *
 * This file defines the UserEntity class.
 * The UserEntity class represents a user in the system.
 * It contains properties that correspond to the fields in the User database table,
 * and methods to retrieve and set these properties.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-04-20 12:37:58
 */

class UserEntity extends Entity
{
    protected $id;
    protected $username;
    protected $email;
    protected $full_name;
    protected $is_admin;
    protected $birthdate;
    protected $created_at;
    protected $updated_at;

    public function __construct(array $data = null)
    {
        if ($data) {
            $this->hydrate($data);
        }
    }

   
    // Other methods related to the User entity if needed
}