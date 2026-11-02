-- Rode no Supabase: SQL Editor > New query > cole tudo > Run
-- Cria as tabelas e libera para o site SOMENTE inserir (ninguém de fora consegue ler os dados).

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  criado_em timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 120),
  telefone text not null check (char_length(telefone) between 8 and 30),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 160),
  area text, perfil text,
  mensagem text check (char_length(mensagem) <= 1500),
  valor text, melhor_horario text, origem text, score int, protocolo text,
  idioma text, versao text, indicacao text, utm jsonb, quiz jsonb, pagina text,
  faixa text, teste_ab text, ultimo_cta text, preferencia text, dispositivo text, comportamento jsonb, utm_primeiro jsonb, consentimento jsonb, score_total int,
  status text not null default 'novo'  -- use no painel: novo, contatado, proposta, cliente, perdido
);
-- Se a tabela já existia, adiciona as colunas novas:
alter table public.leads add column if not exists faixa text;
alter table public.leads add column if not exists teste_ab text;
alter table public.leads add column if not exists ultimo_cta text;
alter table public.leads add column if not exists preferencia text;
alter table public.leads add column if not exists dispositivo text;
alter table public.leads add column if not exists comportamento jsonb;
alter table public.leads add column if not exists utm_primeiro jsonb;
alter table public.leads add column if not exists consentimento jsonb;
alter table public.leads add column if not exists score_total int;

create table if not exists public.newsletter (id bigint generated always as identity primary key, criado_em timestamptz default now(), email text not null check (char_length(email)<=160), origem text, temas jsonb);
create table if not exists public.radar (id bigint generated always as identity primary key, criado_em timestamptz default now(), cidade text check (char_length(cidade)<=80), tipo text, valor_min text, valor_max text, desconto text, email text not null check (char_length(email)<=160));
create table if not exists public.parceiros (id bigint generated always as identity primary key, criado_em timestamptz default now(), nome text check (char_length(nome)<=120), area text, cidade text, telefone text);
create table if not exists public.agendamentos (id bigint generated always as identity primary key, criado_em timestamptz default now(), dia date, horario text);
create table if not exists public.avaliacoes (id bigint generated always as identity primary key, criado_em timestamptz default now(), nota text, comentario text check (char_length(comentario)<=600), autoriza_publicar boolean default false, nome text);

do $$ declare t text; begin
  foreach t in array array['leads','newsletter','radar','parceiros','agendamentos','avaliacoes'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "site pode inserir" on public.%I', t);
    execute format('create policy "site pode inserir" on public.%I for insert to anon with check (true)', t);
    execute format('revoke select, update, delete on public.%I from anon', t);
    execute format('grant insert on public.%I to anon', t);
  end loop;
end $$;

-- Visão prática para o dia a dia (aparece no Table Editor)
drop view if exists public.leads_recentes;
create view public.leads_recentes with (security_invoker = true) as
  select criado_em, protocolo, faixa, score_total, nome, telefone, email, area, valor, score, origem, utm->>'utm_source' as utm_source, status
  from public.leads order by (faixa='A') desc, criado_em desc;
revoke all on public.leads_recentes from anon;
