# Learning Management System
## Step 1 Project Set up
### Create a new directory for your project and navigate into it.
mkdir lms-app
cd lms-app

### intialization of node js project
npm init -y

### Installing depenencies
npm install express mysql ejs bcryptjs express-session express-validator

## Step 2 Setting up backend
### Creating server.js file in the root

#### Created lms database
CREATE DATABASE lms;
USE lms;
#### Created User
-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255)
);

#### Created Courses and added Sample Courses
-- Create courses table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert sample data into courses table
INSERT INTO courses (name) VALUES
('Introduction to HTML'),
('CSS Fundamentals'),
('JavaScript Basics');