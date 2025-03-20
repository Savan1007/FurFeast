INSERT INTO recipients (id, name, contact_person, phone, email, address, recipient_type, notes, createdAt, updatedAt) VALUES
(1, 'Safe Haven Shelter', 'John Doe', '+1-306-555-2001', 'safehaven@example.com', '10 Shelter Ave, Regina, SK', 'shelter', 'Provides emergency housing for stray animals.', '2020-06-15 10:00:00', '2024-03-14 08:30:00'),
(2, 'Paws & Claws Foster Home', 'Jane Smith', '+1-306-555-2002', 'pawsclaws@example.com', '25 Foster Rd, Regina, SK', 'foster', 'Family-run foster care for rescued pets.', '2021-04-10 12:15:00', '2024-03-14 08:30:00'),
(3, 'Animal Care Organization', 'Michael Johnson', '+1-306-555-2003', 'animalcareorg@example.com', '50 Charity St, Regina, SK', 'organization', 'Non-profit providing medical care for animals.', '2019-09-20 14:45:00', '2024-03-14 08:30:00'),
(4, 'Happy Tails Shelter', 'Emily White', '+1-306-555-2004', 'happytails@example.com', '75 Rescue Ln, Regina, SK', 'shelter', 'Specializes in rehabilitating abused animals.', '2018-12-05 09:30:00', '2024-03-14 08:30:00'),
(5, 'Hope for Paws', 'David Brown', '+1-306-555-2005', 'hopepaws@example.com', '100 Animal Blvd, Regina, SK', 'organization', 'Advocates for animal rights and adoption programs.', '2017-07-22 11:00:00', '2024-03-14 08:30:00'),
(6, 'Compassionate Care Foster', 'Olivia Green', '+1-306-555-2006', 'compassioncare@example.com', '150 Kindness St, Regina, SK', 'foster', 'Network of temporary foster homes.', '2022-01-18 15:20:00', '2024-03-14 08:30:00'),
(7, 'Rescue & Rehabilitation', 'Liam Black', '+1-306-555-2007', 'rescuerhab@example.com', '200 Healing Way, Regina, SK', 'organization', 'Focuses on animal rescue and rehabilitation.', '2020-08-14 13:40:00', '2024-03-14 08:30:00'),
(8, 'Loving Paws Shelter', 'Sophia Blue', '+1-306-555-2008', 'lovingpaws@example.com', '250 Adoption Rd, Regina, SK', 'shelter', 'Provides shelter and adoption services.', '2019-10-30 10:50:00', '2024-03-14 08:30:00'),
(9, 'Guardian Angels Foster', 'Ethan Gray', '+1-306-555-2009', 'guardianangels@example.com', '300 Pet St, Regina, SK', 'foster', 'Dedicated to rehoming abandoned animals.', '2023-05-12 17:10:00', '2024-03-14 08:30:00'),
(10, 'Animal Welfare Society', 'Emma Brown', '+1-306-555-2010', 'animalwelfare@example.com', '350 Community Rd, Regina, SK', 'organization', 'Supports legal protection for animals.', '2016-03-25 08:20:00', '2024-03-14 08:30:00');




INSERT INTO distributions (recipient_id, date_distributed, status, notes, createdAt, updatedAt) VALUES
(1, '2024-02-20 10:30:00', 'delivered', 'Delivered 50kg of dry cat food, 30 cans of wet cat food, and 20 collars.', '2024-02-15 08:45:00', '2024-02-20 12:00:00'),
(2, '2024-03-05 14:15:00', 'delivered', 'Provided 40kg of dry dog food, 25 cans of wet dog food, and 15 toys.', '2024-03-01 09:30:00', '2024-03-05 15:00:00'),
(3, '2024-03-10 09:00:00', 'pending', 'Scheduled delivery of 60kg of dry cat food and 20 collars.', '2024-03-08 16:20:00', '2024-03-14 08:30:00'),
(4, '2024-02-28 16:45:00', 'delivered', 'Sent 80kg of dry dog food and 50 cans of wet dog food.', '2024-02-25 10:00:00', '2024-02-28 17:30:00'),
(5, '2024-03-07 11:30:00', 'canceled', 'Request for 30 collars and 25 toys was canceled by recipient.', '2024-03-03 14:00:00', '2024-03-07 12:15:00'),
(6, '2024-03-12 13:10:00', 'delivered', 'Supplied 100 cans of wet cat food and 10 toys.', '2024-03-09 11:00:00', '2024-03-12 14:30:00'),
(7, '2024-03-14 08:00:00', 'pending', 'Awaiting transportation for 45kg of dry dog food, 20 cans of wet cat food.', '2024-03-10 12:40:00', '2024-03-14 08:30:00'),
(8, '2024-02-25 15:20:00', 'delivered', 'Sent 60 collars and 30 toys for adoption event.', '2024-02-20 09:30:00', '2024-02-25 16:00:00'),
(9, '2024-03-09 10:00:00', 'delivered', 'Emergency supply of 50kg of dry cat food and 40 cans of wet dog food.', '2024-03-06 13:00:00', '2024-03-09 11:00:00'),
(10, '2024-03-11 17:30:00', 'delivered', 'Support package containing 30 collars and 15 toys.', '2024-03-07 10:20:00', '2024-03-11 18:00:00');



INSERT INTO inventory (category, food_type, food_form, item_name, quantity, unit, last_updated, createdAt) VALUES
('food', 'dog', 'dry', NULL, 2, 'kg', NOW(), NOW()),
('food', 'dog', 'wet', NULL, 100, 'can', NOW(), NOW()),
('food', 'cat', 'dry', NULL, 10, 'kg', NOW(), NOW()),
('food', 'cat', 'wet', NULL, 120, 'can', NOW(), NOW()),
('miscellaneous', NULL, NULL, 'toy', 10, 'piece', NOW(), NOW()),
('miscellaneous', NULL, NULL, 'collar', 100, 'piece', NOW(), NOW());



INSERT INTO distribution_details (distribution_id, inventory_id, quantity, createdAt, updatedAt) VALUES
(1, 3, 5, '2024-02-15 08:45:00', '2024-02-20 12:00:00'), -- 5kg of dry cat food
(1, 4, 10, '2024-02-15 08:45:00', '2024-02-20 12:00:00'), -- 10 cans of wet cat food
(1, 6, 5, '2024-02-15 08:45:00', '2024-02-20 12:00:00'), -- 5 collars

(2, 1, 2, '2024-03-01 09:30:00', '2024-03-05 15:00:00'), -- 2kg of dry dog food
(2, 2, 20, '2024-03-01 09:30:00', '2024-03-05 15:00:00'), -- 20 cans of wet dog food
(2, 5, 5, '2024-03-01 09:30:00', '2024-03-05 15:00:00'), -- 5 toys

(3, 3, 10, '2024-03-08 16:20:00', '2024-03-14 08:30:00'), -- 10kg of dry cat food

(4, 1, 10, '2024-02-25 10:00:00', '2024-02-28 17:30:00'), -- 10kg of dry dog food
(4, 2, 50, '2024-02-25 10:00:00', '2024-02-28 17:30:00'), -- 50 cans of wet dog food

(5, 6, 10, '2024-03-03 14:00:00', '2024-03-07 12:15:00'), -- 10 collars (canceled)

(6, 4, 50, '2024-03-09 11:00:00', '2024-03-12 14:30:00'), -- 50 cans of wet cat food
(6, 5, 5, '2024-03-09 11:00:00', '2024-03-12 14:30:00'), -- 5 toys

(7, 1, 5, '2024-03-10 12:40:00', '2024-03-14 08:30:00'), -- 5kg of dry dog food
(7, 4, 10, '2024-03-10 12:40:00', '2024-03-14 08:30:00'), -- 10 cans of wet cat food

(8, 6, 10, '2024-02-20 09:30:00', '2024-02-25 16:00:00'), -- 10 collars
(8, 5, 10, '2024-02-20 09:30:00', '2024-02-25 16:00:00'), -- 10 toys

(9, 3, 8, '2024-03-06 13:00:00', '2024-03-09 11:00:00'), -- 8kg of dry cat food
(9, 2, 15, '2024-03-06 13:00:00', '2024-03-09 11:00:00'), -- 15 cans of wet dog food

(10, 6, 10, '2024-03-07 10:20:00', '2024-03-11 18:00:00'), -- 10 collars
(10, 5, 5, '2024-03-07 10:20:00', '2024-03-11 18:00:00'); -- 5 toys



INSERT INTO suppliers (name, email, phone, address, donation_count, total_donated, last_donation_date, time_joined) VALUES
('Supplier A', 'supplierA@example.com', '+1-306-555-1001', '123 Main St, Regina, SK', 50, 30500.00, '2024-03-10 12:00:00', '2018-05-15 10:30:00'),
('Supplier B', 'supplierB@example.com', '+1-306-555-1002', '456 Maple St, Regina, SK', 30, 20250.50, '2024-02-28 15:45:00', '2019-07-22 09:15:00'),
('Supplier C', 'supplierC@example.com', '+1-306-555-1003', '789 Oak St, Regina, SK', 40, 27500.75, '2024-03-01 14:20:00', '2020-01-10 14:45:00'),
('Supplier D', 'supplierD@example.com', '+1-306-555-1004', '159 Birch St, Regina, SK', 60, 35020.90, '2024-02-25 11:10:00', '2017-03-18 12:30:00'),
('Supplier E', 'supplierE@example.com', '+1-306-555-1005', '753 Cedar St, Regina, SK', 45, 29875.30, '2024-03-08 09:30:00', '2016-11-25 16:00:00'),
('Supplier F', 'supplierF@example.com', '+1-306-555-1006', '951 Pine St, Regina, SK', 35, 22040.60, '2024-03-05 10:15:00', '2018-06-12 08:45:00'),
('Supplier G', 'supplierG@example.com', '+1-306-555-1007', '357 Walnut St, Regina, SK', 28, 18590.45, '2024-01-30 13:05:00', '2019-09-05 17:20:00'),
('Supplier H', 'supplierH@example.com', '+1-306-555-1008', '852 Elm St, Regina, SK', 55, 31200.80, '2024-03-09 16:50:00', '2015-04-21 10:00:00'),
('Supplier I', 'supplierI@example.com', '+1-306-555-1009', '654 Chestnut St, Regina, SK', 33, 24050.90, '2024-02-18 08:40:00', '2017-12-11 11:30:00'),
('Supplier J', 'supplierJ@example.com', '+1-306-555-1010', '321 Redwood St, Regina, SK', 25, 16780.00, '2024-03-12 07:55:00', '2020-10-02 14:10:00');



INSERT INTO donations (supplier_id, date_received, status, notes, createdAt, updatedAt) VALUES
(1, '2024-03-01 10:30:00', 'received', 'Donation of 50kg dry dog food and 100 cans of wet dog food.', '2024-03-01 10:30:00', '2024-03-01 12:00:00'),
(2, '2024-03-05 14:15:00', 'received', 'Received 10kg dry cat food and 120 cans of wet cat food.', '2024-03-05 14:15:00', '2024-03-05 15:30:00'),
(3, '2024-03-10 09:00:00', 'pending', 'Awaiting delivery confirmation for 10 collars and 10 toys.', '2024-03-10 09:00:00', '2024-03-14 08:30:00'),
(4, '2024-02-28 16:45:00', 'received', 'Large shipment of 80kg dry dog food and 50 cans of wet dog food.', '2024-02-28 16:45:00', '2024-02-28 18:00:00'),
(5, '2024-03-07 11:30:00', 'canceled', 'Donation of 30 collars and 25 toys was canceled by supplier.', '2024-03-07 11:30:00', '2024-03-07 12:15:00'),
(6, '2024-03-12 13:10:00', 'received', 'Winter supply of 100 cans of wet cat food and 10 toys.', '2024-03-12 13:10:00', '2024-03-12 14:30:00'),
(7, '2024-03-14 08:00:00', 'pending', 'Pending donation of 45kg dry dog food and 20 cans of wet cat food.', '2024-03-14 08:00:00', '2024-03-14 08:30:00'),
(8, '2024-02-25 15:20:00', 'received', 'Sent a shipment of 60 collars and 30 toys for an adoption event.', '2024-02-25 15:20:00', '2024-02-25 16:00:00'),
(9, '2024-03-09 10:00:00', 'received', 'Emergency supply of 50kg dry cat food and 40 cans of wet dog food.', '2024-03-09 10:00:00', '2024-03-09 11:00:00'),
(10, '2024-03-11 17:30:00', 'received', 'Support package containing 30 collars and 15 toys.', '2024-03-11 17:30:00', '2024-03-11 18:00:00');



INSERT INTO donation_details (donation_id, inventory_id, quantity, createdAt, updatedAt) VALUES
(1, 1, 50, '2024-03-01 10:30:00', '2024-03-01 12:00:00'), -- 50kg dry dog food
(1, 2, 100, '2024-03-01 10:30:00', '2024-03-01 12:00:00'), -- 100 cans wet dog food

(2, 3, 10, '2024-03-05 14:15:00', '2024-03-05 15:30:00'), -- 10kg dry cat food
(2, 4, 120, '2024-03-05 14:15:00', '2024-03-05 15:30:00'), -- 120 cans wet cat food

(3, 5, 10, '2024-03-10 09:00:00', '2024-03-14 08:30:00'), -- 10 toys
(3, 6, 10, '2024-03-10 09:00:00', '2024-03-14 08:30:00'), -- 10 collars

(4, 1, 80, '2024-02-28 16:45:00', '2024-02-28 18:00:00'), -- 80kg dry dog food
(4, 2, 50, '2024-02-28 16:45:00', '2024-02-28 18:00:00'), -- 50 cans wet dog food

(5, 5, 30, '2024-03-07 11:30:00', '2024-03-07 12:15:00'), -- 30 toys (canceled)
(5, 6, 25, '2024-03-07 11:30:00', '2024-03-07 12:15:00'), -- 25 collars (canceled)

(6, 4, 100, '2024-03-12 13:10:00', '2024-03-12 14:30:00'), -- 100 cans wet cat food
(6, 5, 10, '2024-03-12 13:10:00', '2024-03-12 14:30:00'), -- 10 toys

(7, 1, 45, '2024-03-14 08:00:00', '2024-03-14 08:30:00'), -- 45kg dry dog food
(7, 4, 20, '2024-03-14 08:00:00', '2024-03-14 08:30:00'), -- 20 cans wet cat food

(8, 5, 60, '2024-02-25 15:20:00', '2024-02-25 16:00:00'), -- 60 collars
(8, 6, 30, '2024-02-25 15:20:00', '2024-02-25 16:00:00'), -- 30 toys

(9, 3, 50, '2024-03-09 10:00:00', '2024-03-09 11:00:00'), -- 50kg dry cat food
(9, 2, 40, '2024-03-09 10:00:00', '2024-03-09 11:00:00'), -- 40 cans wet dog food

(10, 6, 30, '2024-03-11 17:30:00', '2024-03-11 18:00:00'), -- 30 collars
(10, 5, 15, '2024-03-11 17:30:00', '2024-03-11 18:00:00'); -- 15 toys
