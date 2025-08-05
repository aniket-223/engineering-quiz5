-- Sample data for Engineering Quiz Application

-- Insert sample users
INSERT INTO users (name, email, password, department) VALUES
('John Doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'mechanical'),
('Jane Smith', 'jane@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'electrical'),
('Mike Johnson', 'mike@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'electronics'),
('Sarah Wilson', 'sarah@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'civil');

-- Insert sample questions for Mechanical Engineering
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department) VALUES
('What is the first law of thermodynamics?', 'Energy cannot be created or destroyed', 'Entropy always increases', 'Heat flows from hot to cold', 'Work equals force times distance', 0, 'Thermal Engineering', 'mechanical'),
('In a Carnot cycle, what happens during isothermal expansion?', 'Temperature increases', 'Heat is absorbed at constant temperature', 'Pressure remains constant', 'Volume decreases', 1, 'Thermal Engineering', 'mechanical'),
('What is the primary strengthening mechanism in steel?', 'Grain boundary strengthening', 'Solid solution strengthening', 'Precipitation hardening', 'All of the above', 3, 'Materials Science', 'mechanical'),
('Which crystal structure does iron have at room temperature?', 'Face-centered cubic', 'Body-centered cubic', 'Hexagonal close-packed', 'Simple cubic', 1, 'Materials Science', 'mechanical'),
('What is Hookes Law?', 'Stress is proportional to strain', 'Force equals mass times acceleration', 'Energy is conserved', 'Pressure times volume is constant', 0, 'Strength of Materials', 'mechanical');

-- Insert sample questions for Electrical Engineering
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department) VALUES
('What is the principle of operation of a DC motor?', 'Electromagnetic induction', 'Force on current-carrying conductor in magnetic field', 'Piezoelectric effect', 'Thermoelectric effect', 1, 'Electrical Machines', 'electrical'),
('In a transformer, the voltage ratio is equal to:', 'Current ratio', 'Power ratio', 'Turns ratio', 'Frequency ratio', 2, 'Electrical Machines', 'electrical'),
('What is Kirchhoffs Current Law?', 'Sum of voltages in a loop is zero', 'Sum of currents at a node is zero', 'Voltage is proportional to current', 'Power equals voltage times current', 1, 'Network Theory', 'electrical'),
('In an RC circuit, what is the time constant?', 'R/C', 'C/R', 'RC', '1/(RC)', 2, 'Network Theory', 'electrical'),
('What is the purpose of a circuit breaker?', 'To regulate voltage', 'To interrupt fault currents', 'To measure power', 'To store energy', 1, 'Power Systems', 'electrical');

-- Insert sample questions for Electronics Engineering
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department) VALUES
('What is the function of a diode?', 'Amplify signals', 'Store charge', 'Allow current in one direction', 'Generate oscillations', 2, 'Electronic Devices', 'electronics'),
('In a BJT, what does the base current control?', 'Emitter current', 'Collector current', 'Base voltage', 'Power dissipation', 1, 'Electronic Devices', 'electronics'),
('What is the gain of an ideal op-amp?', 'Zero', 'One', 'Infinite', 'Depends on frequency', 2, 'Circuit Theory', 'electronics'),
('In a low-pass filter, what happens to high-frequency signals?', 'They are amplified', 'They are attenuated', 'They are phase-shifted by 90°', 'They remain unchanged', 1, 'Circuit Theory', 'electronics'),
('How many input combinations does a 3-input AND gate have?', '3', '6', '8', '9', 2, 'Digital Electronics', 'electronics');

-- Insert sample questions for Civil Engineering
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department) VALUES
('What is the typical compressive strength of concrete?', '10-20 MPa', '20-40 MPa', '40-60 MPa', '60-80 MPa', 1, 'Building Materials', 'civil'),
('What is the main component of Portland cement?', 'Calcium silicate', 'Aluminum oxide', 'Iron oxide', 'Magnesium oxide', 0, 'Building Materials', 'civil'),
('What is the purpose of leveling in surveying?', 'Measure horizontal distances', 'Measure vertical distances', 'Measure angles', 'Determine elevations', 3, 'Surveying', 'civil'),
('What instrument is used for measuring horizontal angles?', 'Level', 'Theodolite', 'Chain', 'Compass', 1, 'Surveying', 'civil'),
('What is Bernoullis equation based on?', 'Conservation of mass', 'Conservation of energy', 'Conservation of momentum', 'Newtons second law', 1, 'Fluid Mechanics', 'civil');
