# Infra

- `docker-compose.yml`: PostgreSQL 16 (com `pg_trgm` e `unaccent`) e Redis 7 para desenvolvimento.
- `postgres/`: scripts executados na primeira criação do banco.
- `k6/`: testes de carga (a partir da Sprint 6).

```bash
docker compose -f infra/docker-compose.yml up -d --wait
docker compose -f infra/docker-compose.yml ps
docker compose -f infra/docker-compose.yml down        # para, mantém dados
docker compose -f infra/docker-compose.yml down -v     # para e APAGA os dados
```
