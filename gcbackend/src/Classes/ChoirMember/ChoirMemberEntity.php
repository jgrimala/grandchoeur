<?php

/**
 * ChoirMemberEntity.php
 * Classes\ChoirMember\ChoirMemberEntity.php
 */

namespace Classes\ChoirMember;

use Utilities\Entity;

/**
 * ChoirMemberEntity()
 *
 * This class represents a choir member in the system.
 * It contains properties that correspond to the fields in the choir_members database table,
 * and relies on the Entity base class to provide automatic getter and setter methods as well as hydration.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-07-20
 */

class ChoirMemberEntity extends Entity
{
	protected $id;
    protected $user_id;
    protected $name;
    protected $email;
    protected $phone;
    protected $join_date;
    protected $pupitre;
    protected $title;
    protected $display_contact;
    protected $created_at;

    public function __construct(array $data = null)
    {
        if ($data) {
            $this->hydrate($data);
        }
    }
}
?>
