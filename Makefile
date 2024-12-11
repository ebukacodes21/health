server:
	npm run dev

composeup:
	docker compose --env-file .env up --build

composedown:
	docker compose down

.PHONY: server composeup composedown