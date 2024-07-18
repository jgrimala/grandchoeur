<?php

/**
 * ChoirMemberController.php
 * Classes\ChoirMember\ChoirMemberController.php
 */

namespace Classes\ChoirMember;

use Classes\ChoirMember\ChoirMemberDao;
use Service\ApiResponder;
use Middleware\AuthTokenMiddleware;

/**
 * ChoirMemberController
 *
 * This class handles the HTTP requests for ChoirMember operations.
 * It interacts with the ChoirMemberDao to perform CRUD operations and uses ApiResponder to send JSON responses.
 *
 * @author: Julie Grimala
 * @version: 1.0
 * @since: 2024-07-20
 */

class ChoirMemberController
{
	private $choirMemberDao;
	private $responder;

	public function __construct($db)
	{
		$this->choirMemberDao = new ChoirMemberDao($db);
		$this->responder = new ApiResponder();
	}

	private function sendJsonResponse($data, $status = 200)
	{
		header('Content-Type: application/json');
		http_response_code($status);
		echo json_encode($data);
	}

    public function getAllChoirMembers()
    {
        error_log("getAllChoirMembers method called");
        $members = $this->choirMemberDao->getAllChoirMembers();
        $this->sendJsonResponse($members);
    }


	public function getChoirMember($id)
	{
		$member = $this->choirMemberDao->getChoirMemberById($id);
		if ($member) {
			$this->sendJsonResponse($member);
		} else {
			$this->sendJsonResponse(['error' => 'Choir member not found'], 404);
		}
	}

	public function createChoirMember($data)
	{
		try {
			$query = "INSERT INTO choir_members (user_id, name, email, phone, join_date, pupitre, title, display_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			$stmt = $this->db->prepare($query);

			$stmt->bindParam(1, $data['user_id']);
			$stmt->bindParam(2, $data['name']);
			$stmt->bindParam(3, $data['email']);
			$stmt->bindParam(4, $data['phone']);
			$stmt->bindParam(5, $data['join_date']);
			$stmt->bindParam(6, $data['pupitre']);
			$stmt->bindParam(7, $data['title']);
			$stmt->bindParam(8, $data['display_contact']);

			$stmt->execute();

			return ['status' => 'Choir member created successfully'];
		} catch (\PDOException $e) {
			return ['status' => 'Choir member creation failed', 'message' => $e->getMessage()];
		}
	}

	public function updateChoirMember($id)
	{
		if (!AuthTokenMiddleware::isAdmin()) {
			return $this->responder->respondUnauthorized();
		}

		$data = json_decode(file_get_contents('php://input'), true);
		$result = $this->choirMemberDao->updateChoirMember($id, $data);
		$this->sendJsonResponse($result);
	}

	public function deleteChoirMember($id)
	{
		if (!AuthTokenMiddleware::isAdmin()) {
			return $this->responder->respondUnauthorized();
		}

		$result = $this->choirMemberDao->deleteChoirMember($id);
		$this->sendJsonResponse(['success' => 'Choir member deleted successfully']);
	}

	public function updateDisplayContact($id)
	{
		$data = json_decode(file_get_contents('php://input'), true);
		if (!isset($data['display_contact'])) {
			return $this->sendJsonResponse(['error' => 'Invalid data'], 400);
		}
		
		$result = $this->choirMemberDao->updateDisplayContact($id, $data['display_contact']);
		return $this->sendJsonResponse($result);
	}
}
