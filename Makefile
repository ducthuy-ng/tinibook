
setup-dev:
	npm i -D
	cp .env.local.example .env.local

start-dev:
	docker-compose -f docker-compose.dev.yaml up --build -d
	npm run dev

stop-dev:
	docker compose -f docker-compose.dev.yaml down

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

format:
	npx prettier --write .

format-check:
	npx prettier --check .

clean:
	rm -rf node_modules .next .env.local