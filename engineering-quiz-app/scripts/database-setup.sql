-- Database setup for Engineering Quiz Application
-- This script creates the necessary tables for PostgreSQL

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(50) NOT NULL CHECK (department IN ('mechanical', 'electrical', 'electronics', 'civil')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 0 AND 3),
    subject VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL CHECK (department IN ('mechanical', 'electrical', 'electronics', 'civil')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz results table
CREATE TABLE quiz_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    answers JSONB NOT NULL,
    questions JSONB NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Remarks table
CREATE TABLE remarks (
    id SERIAL PRIMARY KEY,
    result_id INTEGER REFERENCES quiz_results(id) ON DELETE CASCADE,
    remarks TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_questions_department ON questions(department);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_completed_at ON quiz_results(completed_at);
CREATE INDEX idx_remarks_result_id ON remarks(result_id);
