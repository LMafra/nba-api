up:
	docker-compose up

up_build:
	docker-compose up --build

down:
	docker-compose down

clean:
	docker image prune -a
