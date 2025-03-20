// export const createTableSQL = `
// CREATE TABLE suppliers (
//   id int NOT NULL AUTO_INCREMENT,
//   name varchar(255) NOT NULL,
//   email varchar(255) DEFAULT NULL,
//   phone varchar(50) DEFAULT NULL,
//   address text,
//   donation_count int DEFAULT '0',
//   total_donated decimal(10,2) DEFAULT '0.00',
//   last_donation_date datetime DEFAULT NULL,
//   time_joined datetime DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (id),
//   UNIQUE KEY email (email)
// ) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


// CREATE TABLE donations (
//   id int NOT NULL AUTO_INCREMENT,
//   supplier_id int DEFAULT NULL,
//   quantity int DEFAULT NULL,
//   unit enum('kg','can','piece') DEFAULT NULL,
//   date_received datetime DEFAULT NULL,
//   status enum('pending','received','processed') DEFAULT 'pending',
//   notes text,
//   createdAt datetime DEFAULT CURRENT_TIMESTAMP,
//   updatedAt datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   donation_category enum('food','miscellaneous') NOT NULL,
//   food_type enum('dog','cat') DEFAULT NULL,
//   food_form enum('dry','wet') DEFAULT NULL,
//   item_name enum('collar','toy') DEFAULT NULL,
//   PRIMARY KEY (id),
//   KEY donor_id (supplier_id),
//   CONSTRAINT donations_ibfk_1 FOREIGN KEY (supplier_id) REFERENCES suppliers (id) ON DELETE SET NULL
// ) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE inventory (
//   id int NOT NULL AUTO_INCREMENT,
//   item_name enum('collar','toy') DEFAULT NULL,
//   category enum('food','miscellaneous') NOT NULL,
//   quantity int NOT NULL DEFAULT '0',
//   unit enum('kg','can','piece') DEFAULT NULL,
//   expiry_date date DEFAULT NULL,
//   last_updated datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   createdAt datetime DEFAULT CURRENT_TIMESTAMP,
//   food_type enum('dog','cat') DEFAULT NULL,
//   food_form enum('dry','wet') DEFAULT NULL,
//   PRIMARY KEY (id)
// ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


// CREATE TABLE recipients (
//   id int NOT NULL AUTO_INCREMENT,
//   name varchar(255) NOT NULL,
//   contact_person varchar(255) DEFAULT NULL,
//   phone varchar(50) DEFAULT NULL,
//   email varchar(255) DEFAULT NULL,
//   address text,
//   recipient_type enum('shelter','foster','organization') NOT NULL,
//   notes text,
//   createdAt datetime DEFAULT CURRENT_TIMESTAMP,
//   updatedAt datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (id)
// ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE distributions (
//   id int NOT NULL AUTO_INCREMENT,
//   recipient_id int NOT NULL,
//   inventory_id int NOT NULL,
//   quantity int NOT NULL,
//   unit varchar(50) DEFAULT NULL,
//   date_distributed datetime DEFAULT CURRENT_TIMESTAMP,
//   status enum('pending','delivered','canceled') DEFAULT 'pending',
//   notes text,
//   PRIMARY KEY (id),
//   KEY recipient_id (recipient_id),
//   KEY inventory_id (inventory_id),
//   CONSTRAINT distributions_ibfk_1 FOREIGN KEY (recipient_id) REFERENCES recipients (id) ON DELETE CASCADE,
//   CONSTRAINT distributions_ibfk_2 FOREIGN KEY (inventory_id) REFERENCES inventory (id) ON DELETE CASCADE
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
// `;