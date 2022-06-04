# create databases
CREATE DATABASE IF NOT EXISTS `database`;
CREATE DATABASE IF NOT EXISTS `database_testing`;

# create root user and grant rights
CREATE USER 'root'@'localhost' IDENTIFIED BY 'local';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';