build:
	docker compose build

up:
	docker compose up -d

start:
	docker compose up -d --build

down:
	docker compose down

stop:
	docker compose stop

restart: stop start

logs:
	docker compose logs -f --tail=100

ps:
	docker compose ps

clean:
	docker compose down --rmi all



