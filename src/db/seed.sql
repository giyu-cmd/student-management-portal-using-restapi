INSERT INTO students (name, email, age, course)
VALUES 
  ('Alex Johnson', 'alex.johnson@example.com', 20, 'Computer Science'),
  ('Sophia Martinez', 'sophia.martinez@example.com', 21, 'Data Science'),
  ('Liam Chen', 'liam.chen@example.com', 22, 'Software Engineering'),
  ('Emma Watson', 'emma.watson@example.com', 19, 'Cybersecurity'),
  ('Noah Patel', 'noah.patel@example.com', 23, 'Cloud Computing'),
  ('Olivia Taylor', 'olivia.taylor@example.com', 20, 'Information Technology'),
  ('Ethan Davis', 'ethan.davis@example.com', 22, 'Computer Science'),
  ('Mia Rodriguez', 'mia.rodriguez@example.com', 21, 'Artificial Intelligence'),
  ('Lucas Brown', 'lucas.brown@example.com', 24, 'Data Analytics'),
  ('Ava Anderson', 'ava.anderson@example.com', 20, 'Software Engineering')
ON CONFLICT (email) DO NOTHING;
