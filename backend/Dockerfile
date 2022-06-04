FROM php:8.1-apache
RUN a2enmod rewrite
RUN apt-get update -y

# MYSQL
RUN apt-get install -y default-mysql-client

# PHP EXTENSIONS
RUN apt-get install -y libpng-dev libjpeg-dev libzip-dev zip 
RUN docker-php-ext-configure gd --with-jpeg
RUN docker-php-ext-install -j$(nproc) mysqli pdo pdo_mysql gd zip
RUN pecl install xdebug && docker-php-ext-enable xdebug

# PERMISSIONS
RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www/

# PHP CONFIG
RUN echo 'memory_limit = 512M' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;
RUN echo 'max_execution_time = 300' >> /usr/local/etc/php/conf.d/docker-php-maxexectime.ini;