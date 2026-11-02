# Receber os leads no Supabase: passo a passo (cerca de 10 minutos)

## 1. Criar o projeto
1. Acesse supabase.com e crie uma conta grátis. Depois clique em **New project**.
2. Escolha um nome, uma senha forte para o banco e a região **South America (São Paulo)**.

## 2. Criar as tabelas
1. No menu lateral, abra **SQL Editor** e clique em **New query**.
2. Cole todo o conteúdo do arquivo `supabase.sql` e clique em **Run**.
3. Avisos ("NOTICE … does not exist, skipping") são normais na primeira execução.

São criadas as tabelas `leads`, `newsletter`, `radar`, `parceiros`, `agendamentos` e `avaliacoes`.
**Segurança:** o site só consegue *inserir*. Ninguém de fora consegue ler, alterar ou apagar os dados.

## 3. Colar as chaves no site
1. Abra **Project Settings > API** (ou **Data API**).
2. Copie a **Project URL** e a chave **anon / public**.
3. Abra `app.js` e preencha no bloco CONFIG:
   ```js
   supabaseUrl:'https://SEU-PROJETO.supabase.co',
   supabaseAnonKey:'eyJ...sua-chave-anon...',
   ```

⚠️ Nunca coloque a chave **service_role** no site: ela dá acesso total ao banco.

## 4. Ver os leads
No menu **Table Editor**, abra a tabela `leads` (ou a visão `leads_recentes`).
Use a coluna `status` para acompanhar cada lead: novo → contatado → proposta → cliente / perdido.
Para exportar, clique em **Export > CSV**.

## 5. Ser avisado a cada lead novo (opcional)
Opções do Supabase, sem programar:
- **Database > Webhooks > Create webhook** na tabela `leads`, evento *Insert*. Aponte para um Zapier/Make/n8n que mande WhatsApp, e-mail ou crie o lead no seu CRM.
- Ou conecte o Supabase direto no Zapier ("New Row in Supabase").

## 5b. Priorizar quem está pronto para comprar
- Cada lead do crivo chega com `faixa` (A, B ou C), `score` (perfil), `score_total` (perfil + comportamento) e as respostas em `quiz`.
- Dica: no webhook, filtre `faixa = 'A'` para receber alerta imediato só dos leads quentes.
- A visão `leads_recentes` já mostra a faixa A primeiro.
- Se você já tinha rodado o SQL antes, rode o `supabase.sql` de novo: ele só adiciona as colunas novas e não apaga nada.

## 6. Como funciona no site
- Tudo continua salvo no navegador do visitante e também é enviado ao Supabase.
- Se a internet falhar, o envio fica numa fila e é repetido quando a conexão volta (e a cada minuto).
- Para conferir, abra o console do navegador (F12) e digite `SUPABASE_STATUS()`. O resultado mostra se a integração está ligada e quantos envios estão na fila.

## Importante
O envio só funciona com o site publicado no seu domínio (Netlify, Vercel etc.).
O link de visualização em claude.ai bloqueia conexões com outros sites por segurança. Lá, os leads ficam só na fila local.
