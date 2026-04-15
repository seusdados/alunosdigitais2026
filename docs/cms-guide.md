# Guia do CMS

> Testado em Vercel Preview + Supabase Auth na Fase 3.1.

## Acesso ao painel

O painel fica em `/admin`. É protegido por autenticação (Supabase Auth) e por
uma verificação de role — o middleware redireciona qualquer acesso anônimo
para `/admin/login`, e a página de login também bloqueia usuários sem role.

Regras de acesso:

- Sem sessão → `/admin/login`.
- Com sessão e sem linha em `public.role_assignments` → logout automático
  com aviso "Sua conta não tem acesso ao painel".
- Com sessão e pelo menos uma role (`super_admin`, `admin`, `editor`,
  `reviewer`, `analyst`) → acesso liberado.

## Criando o primeiro administrador

No primeiro deploy ainda não existe nenhum usuário com role. Siga os passos:

### 1. Criar o usuário

No dashboard do Supabase:

1. **Authentication → Users → Add user → Create new user**.
2. Preencha e-mail e senha. Marque **Auto Confirm User** (do contrário o
   login não funciona sem confirmação por e-mail, que ainda não está
   configurada).
3. Guarde o `user_id` (UUID) gerado.

O trigger `on_auth_user_created` cria automaticamente o registro em
`public.profiles`.

### 2. Atribuir a role `super_admin`

Abra **SQL Editor** e rode:

```sql
insert into public.role_assignments (user_id, role)
values ('<COLE_O_UUID_AQUI>', 'super_admin')
on conflict do nothing;
```

### 3. Testar o login

- Acesse `/admin/login`.
- Use o e-mail e senha criados no passo 1.
- Deve cair em `/admin` (dashboard).

### 4. Criar outros usuários depois

Quando o CMS estiver completo (Fase 3.x), novos usuários serão criados pelo
próprio painel em `/admin/usuarios`. Até lá, repita os passos 1 e 2 para
cada novo admin/editor, ajustando a `role` conforme o papel.

## Fluxo editorial

> **Stub.** Documentado na Fase 3.3 junto do CRUD de conteúdos.
> Visão geral prevista: `draft → in_review → published`, com histórico em
> `content_revisions`, upload de mídia em Supabase Storage, SEO por página e
> publicação com revalidate da rota pública correspondente.
