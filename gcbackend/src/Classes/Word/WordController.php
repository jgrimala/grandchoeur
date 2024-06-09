<?php
namespace Classes\Word;

use Config\Database; // Make sure this matches exactly

class WordController {
    public function getAntonym($word) {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT antonym FROM Word WHERE word = :word LIMIT 1");
        $stmt->execute(['word' => $word]);
        $result = $stmt->fetch();

        if ($result) {
            echo json_encode(['word' => $word, 'antonym' => $result['antonym']]);
        } else {
            echo json_encode(['error' => "Antonym not found for word: $word"]);
        }
    }
}