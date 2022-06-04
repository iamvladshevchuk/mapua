# `Ukraine Report Map` open source project

This project was initially meant to help Ukrainians to croudsource events from the whole country in the war time. But then I had doubts about usefulness of a website like this and I decided to left it as an open source MVP. It might be useful for someone who has a similar idea in mind. This is a demo version and it connects all your markers to your IP to prevent spam.

Demo: https://mapua.iamvladshevchuk.com

## Technologies
### Front end
* React 18
* React Query
* Typescript
* Mapbox.gl
* Axios
* Tailwind

### Back end
* Laravel 9
* PHPUnit
* REST API

### Deployment
* Github Workflow

## Setup 
1. `docker-compose up --build -d` runs a docker-compose to quickly create front end, back end, database containers
2. `cp .env.example .env && cp frontend/.env.example frontend/.env && cp backend/.env.example backend/.env` to copy .env files
3. `docker exec -it backend php artisan key:generate` to generate a Laravel key
4. You have to add `REACT_APP_MAPBOX` access token in `frontend/.env`. That's something you may find on mapbox.com after creating an account there
5. By default your website will be available on http://localhost:8000

### Alternative
* You can run `bash setup` (or `./setup`) as a shortcut to the process above. You might need to run `chmod +x ./setup` to allow execution of the script
* But you still have to add `REACT_APP_MAPBOX` access token in `frontend/.env`

## Usage
1. `docker-compose up --build -d` starts the back end and runs `npm start` on front end. After setup process, this command should be enough to run a website

### Alternative
* You can run `bash start` (or `./start`) as a shortcut to the process above (`chmod +x ./start` might be needed)

## Testing
* Run `docker-compose run --rm backend php artisan test` to start a back end testing

### Alternative
* You can run `bash test` (or `./test`) as a shortcut to the process above (`chmod +x ./test` might be needed)

## Customization
* Change `DOCKER_FRONTEND_PORT`, `DOCKER_BACKEND_PORT` or `DOCKER_DATABASE_PORT` if you want other ports to be exposed
* Change `DOCKER_UID` or `DOCKER_GID` to change user associated with `backend` container (might be necessary if you have troubles with permissions)