CREATE TABLE feature_flags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feature_name VARCHAR(255) UNIQUE NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO feature_flags (feature_name, is_enabled) VALUES ('db_translations', TRUE);