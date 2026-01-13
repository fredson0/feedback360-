# Feedback360 Frontend

Frontend moderno construído com Next.js 14, TypeScript e Tailwind CSS para o sistema Feedback360.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **Date-fns** - Manipulação de datas
- **Lucide React** - Ícones modernos

## 📁 Arquitetura

```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 14)
│   │   ├── dashboard/         # Página de dashboard
│   │   ├── feedbacks/         # Gerenciamento de feedbacks
│   │   ├── ranking/           # Ranking de feedbacks
│   │   ├── login/             # Autenticação
│   │   └── layout.tsx         # Layout raiz
│   │
│   ├── components/
│   │   ├── ui/               # Componentes base reutilizáveis
│   │   ├── features/         # Componentes de features
│   │   └── layout/           # Componentes de layout
│   │
│   ├── contexts/             # Context API (Auth)
│   ├── hooks/                # Custom hooks
│   ├── services/             # Serviços de API
│   ├── lib/                  # Utilitários
│   ├── types/                # TypeScript types
│   └── middleware.ts         # Proteção de rotas
```

## 🎯 Features

- ✅ Autenticação JWT
- ✅ Dashboard com estatísticas
- ✅ CRUD de feedbacks
- ✅ Sistema de likes
- ✅ Ranking com algoritmo de pontuação
- ✅ Design responsivo
- ✅ Componentes reutilizáveis
- ✅ Proteção de rotas

## 🛠️ Instalação

```bash
cd frontend
npm install
```

## 🔧 Configuração

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🚀 Executar

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

O frontend estará disponível em `http://localhost:3001`

## 📦 Componentes UI

### Button
```tsx
<Button variant="primary" size="md" loading={false}>
  Clique aqui
</Button>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  icon={<Mail />}
  error="Campo obrigatório"
/>
```

### Card
```tsx
<Card hoverable>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

## 🎨 Tailwind CSS

O projeto usa Tailwind CSS com tema personalizado:
- Cores primárias: azul (primary)
- Design system consistente
- Classes utilitárias

## 🔐 Autenticação

- Context API para gerenciar estado
- JWT armazenado em localStorage
- Middleware para proteção de rotas
- Redirecionamento automático

## 📱 Páginas

- `/` - Redirecionamento automático
- `/login` - Login/Registro
- `/dashboard` - Dashboard principal
- `/feedbacks` - Lista e cria feedbacks
- `/ranking` - Ranking de feedbacks

## 🤝 Integração com Backend

O frontend se comunica com o backend NestJS através de:
- Axios com interceptors
- Tipos TypeScript compartilhados
- Tratamento de erros centralizado
- Toast notifications

## 📚 Padrões

- Clean Architecture adaptada para frontend
- Separação de responsabilidades
- Componentes reutilizáveis
- Custom hooks para lógica compartilhada
- TypeScript strict mode
