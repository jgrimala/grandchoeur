<?php

/**
 * ChoirMemberDao.php
 * Classes\ChoirMember\ChoirMemberDao.php
 */

namespace Classes\ChoirMember;

use Config\DatabaseConnection;
use PDO;
/**
 * ChoirMemberDao()
 *
 * This class handles database operations for the ChoirMemberEntity.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-07-20
 */

 class ChoirMemberDao
 {
	 private $db;
 
	 public function __construct(PDO $db)
	 {
		 $this->db = $db;
	 }
 
	 private function userExists($userId)
	 {
		 $query = "SELECT COUNT(*) FROM user WHERE id = ?";
		 $stmt = $this->db->prepare($query);
		 $stmt->execute([$userId]);
 
		 return $stmt->fetchColumn() > 0;
	 }

	 private function getUserInfo($userId)
	 {
		 $query = "SELECT full_name, email FROM user WHERE id = ?";
		 $stmt = $this->db->prepare($query);
		 $stmt->execute([$userId]);
 
		 return $stmt->fetch(\PDO::FETCH_ASSOC);
	 }

 
	 public function createChoirMember(array $data)
	 {
		 try {
			 $query = "INSERT INTO choir_members (user_id, name, email, phone, join_date, pupitre, title, display_contact) VALUES (:user_id, :name, :email, :phone, :join_date, :pupitre, :title, :display_contact)";
			 $stmt = $this->db->prepare($query);
 
			 $stmt->bindParam(':user_id', $data['user_id']);
			 $stmt->bindParam(':name', $data['name']);
			 $stmt->bindParam(':email', $data['email']);
			 $stmt->bindParam(':phone', $data['phone']); // Note: phone is optional
			 $stmt->bindParam(':join_date', $data['join_date']);
			 $stmt->bindParam(':pupitre', $data['pupitre']);
			 $stmt->bindParam(':title', $data['title']);
			 $stmt->bindParam(':display_contact', $data['display_contact']);
 
			 $stmt->execute();
			 return ['status' => 'Choir member created successfully'];
		 } catch (\PDOException $e) {
			 return ['status' => "Choir member creation failed", 'message' => $e->getMessage()];
		 }
	 }
 
	 public function getChoirMemberById($id)
	 {
		 $query = "SELECT * FROM choir_members WHERE id = ?";
		 $stmt = $this->db->prepare($query);
		 $stmt->execute([$id]);
 
		 $result = $stmt->fetch(\PDO::FETCH_ASSOC);
 
		 if ($result) {
			 return new ChoirMemberEntity($result);
		 }
 
		 return null;
	 }
 
	 public function updateChoirMember($id, $data)
	 {
		 $query = "UPDATE choir_members SET user_id = ?, name = ?, email = ?, phone = ?, join_date = ?, pupitre = ?, title = ?, display_contact = ? WHERE id = ?";
		 $stmt = $this->db->prepare($query);
		 $stmt->execute([
			 $data['user_id'],
			 $data['name'],
			 $data['email'],
			 $data['phone'],
			 $data['join_date'],
			 $data['pupitre'],
			 $data['title'],
			 $data['display_contact'],
			 $id
		 ]);
 
		 return $stmt->rowCount();
	 }
 
	 public function deleteChoirMember($id)
	 {
		 $query = "DELETE FROM choir_members WHERE id = ?";
		 $stmt = $this->db->prepare($query);
		 $stmt->execute([$id]);
 
		 return $stmt->rowCount();
	 }
 
	 public function getAllChoirMembers()
	 {
		 $query = "SELECT * FROM choir_members";
		 $stmt = $this->db->prepare($query);
		 $stmt->execute();
 
		 return $stmt->fetchAll(PDO::FETCH_ASSOC);
	 }

	 public function updateDisplayContact($id, $displayContact)
	 {
		 $query = "UPDATE choir_members SET display_contact = ? WHERE id = ?";
		 $stmt = $this->db->prepare($query);
		 return $stmt->execute([$displayContact, $id]);
	 }
 }