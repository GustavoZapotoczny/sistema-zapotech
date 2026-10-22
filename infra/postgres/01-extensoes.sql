-- Executado só na primeira vez que o volume do banco é criado.
-- pg_trgm: busca por pedaço de nome, placa e código (ver CLAUDE.md, regras de fluidez).
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- unaccent: busca ignorando acentos ("joao" encontra "João").
CREATE EXTENSION IF NOT EXISTS unaccent;
