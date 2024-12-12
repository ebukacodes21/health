server:
	npm run dev

composeup:
	docker compose --env-file .env up --build

composedown:
	docker compose down

authenticate:
	aws ecr get-login-password | docker login --username AWS --password-stdin 390403877220.dkr.ecr.us-east-1.amazonaws.com

.PHONY: server composeup composedown authenticate