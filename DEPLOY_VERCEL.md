# Deploy no Vercel

Este documento contém instruções detalhadas para fazer deploy do projeto no Vercel.

---

## IMPORTANTE: Sobre Persistencia de Dados

**ATENCAO:** As Serverless Functions do Vercel sao **stateless** (sem estado). Isso significa que:

- Dados em memoria sao perdidos entre invocacoes
- O formulario de contato atual NAO persiste mensagens permanentemente
- Cada "cold start" da funcao reseta a memoria

**Solucoes Recomendadas para Persistencia:**

| Opcao | Descricao | Preco |
|-------|-----------|-------|
| Vercel Postgres | Banco de dados PostgreSQL integrado | Gratuito ate 256MB |
| Vercel KV | Redis-like key-value store | Gratuito ate 3000 requests/dia |
| Supabase | PostgreSQL + Auth + Storage | Gratuito ate 500MB |
| Webhook | Enviar para CRM/Email/Zapier | Varia |

Para implementar persistencia, veja a secao "Configurando Persistencia" abaixo.

---

## Pre-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Conta no [GitHub](https://github.com) (recomendado)
3. [Vercel CLI](https://vercel.com/cli) instalado (opcional, para deploy via terminal)

## Estrutura do Projeto para Vercel

O projeto foi configurado com:
- **Frontend**: React + Vite (compilado para arquivos estaticos)
- **Backend**: Serverless Functions (pasta `/api`)
- **Configuracao**: `vercel.json` com rewrites e configuracoes

## Metodo 1: Deploy via GitHub (Recomendado)

### Passo 1: Fazer Push para o GitHub

```bash
# Inicializar repositorio (se ainda nao foi feito)
git init
git add .
git commit -m "Primeiro commit"

# Conectar ao repositorio remoto
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git branch -M main
git push -u origin main
```

### Passo 2: Importar no Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em "Import Git Repository"
3. Selecione seu repositorio do GitHub
4. O Vercel detectara automaticamente as configuracoes do `vercel.json`
5. Clique em "Deploy"

**Nota:** O arquivo `vercel.json` ja esta configurado com:
- **Build Command**: `npx tsx script/build-vercel.ts`
- **Output Directory**: `dist/public`

## Metodo 2: Deploy via Vercel CLI

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login no Vercel

```bash
vercel login
```

### Passo 3: Deploy

```bash
# Deploy de preview (para testes)
vercel

# Deploy de producao
vercel --prod
```

## Estrutura das API Routes

As seguintes rotas estao disponiveis:

| Rota | Metodo | Descricao |
|------|--------|-----------|
| `/api/contact` | POST | Envia mensagem de contato |
| `/api/services` | GET | Lista todos os servicos |
| `/api/health` | GET | Verifica status da API |

## Variaveis de Ambiente

Se precisar adicionar variaveis de ambiente:

1. Acesse o dashboard do Vercel
2. Va em Settings > Environment Variables
3. Adicione suas variaveis

## Dominio Personalizado

### Configurar Dominio

1. No dashboard do Vercel, acesse seu projeto
2. Va em Settings > Domains
3. Adicione seu dominio personalizado
4. Configure os registros DNS conforme indicado:
   - **Tipo A**: Aponte para `76.76.21.21`
   - **Tipo CNAME**: `cname.vercel-dns.com`

## Solucao de Problemas

### Erro de Build

Se o build falhar, verifique:

1. Se todas as dependencias estao instaladas
2. Se o script `build:vercel` esta no package.json
3. Logs de build no dashboard do Vercel

### Erro 404 nas Rotas

O `vercel.json` ja esta configurado com rewrites para SPA. Se ainda tiver problemas:

1. Verifique se o arquivo `vercel.json` existe na raiz
2. Confirme que o `outputDirectory` esta correto

### API nao Funciona

1. Verifique se os arquivos estao na pasta `/api`
2. Cada arquivo deve exportar uma funcao `default`
3. Verifique os logs da funcao no dashboard

## Arquivos de Configuracao

### vercel.json

```json
{
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "dist/public",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

## Performance

Para melhor performance no Vercel:

1. **Cache**: O Vercel automaticamente cacheia assets estaticos
2. **Edge Functions**: Considere migrar para Edge Functions para menor latencia
3. **Imagens**: Use o `next/image` ou otimize manualmente

## Monitoramento

O Vercel oferece:

- Analytics de performance
- Logs em tempo real
- Metricas de uso
- Alertas de erro

Acesse tudo pelo dashboard em [vercel.com/dashboard](https://vercel.com/dashboard)

## Configurando Persistencia (Opcional)

### Opcao 1: Vercel Postgres

1. No dashboard do Vercel, va em Storage
2. Crie um banco Vercel Postgres
3. Copie a connection string
4. Atualize o arquivo `api/contact.ts`:

```typescript
import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, service, message } = req.body;
    
    await sql`
      INSERT INTO contact_messages (name, email, phone, service, message)
      VALUES (${name}, ${email}, ${phone}, ${service}, ${message})
    `;
    
    return res.status(201).json({ success: true });
  }
}
```

### Opcao 2: Webhook para Email/CRM

Envie os dados do formulario para um servico externo:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, service, message } = req.body;
    
    // Exemplo com Zapier, Make, ou servico proprio
    await fetch(process.env.WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, service, message })
    });
    
    return res.status(201).json({ success: true });
  }
}
```

### Opcao 3: Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um projeto e uma tabela `contact_messages`
3. Instale: `npm install @supabase/supabase-js`
4. Configure as variaveis de ambiente no Vercel

---

## Suporte

- [Documentacao do Vercel](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Comunidade no Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/issues)
