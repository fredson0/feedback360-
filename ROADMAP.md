# 🚀 Feedback360 - Roadmap de Desenvolvimento

## 📋 Status Atual (Completado)
- ✅ Sistema de ranking com algoritmos (scoring, map, sort)
- ✅ Campos rating e likes na base de dados
- ✅ Endpoint `/feedback/ranking` com autenticação JWT
- ✅ Algoritmo de pontuação: `(rating * 60) + (likes * 3)`
- ✅ Transformação de dados com Map O(n) e ordenação O(n log n)

## 🎯 Próximas Implementações

### 1. Sistema de Likes 👍
**Objetivo**: Permitir que usuários curtam feedbacks de outros

**Algoritmos e Estruturas de Dados**:
- **Hash Table**: Para verificar se usuário já curtiu (O(1))
- **Set**: Para armazenar IDs únicos de likes
- **Counter Algorithm**: Para incrementar/decrementar likes

**Implementação**:
```typescript
// Nova tabela no Prisma
model FeedbackLike {
  id         Int      @id @default(autoincrement())
  userId     Int
  feedbackId Int
  createdAt  DateTime @default(now())
  
  user     User     @relation(fields: [userId], references: [id])
  feedback Feedback @relation(fields: [feedbackId], references: [id])
  
  @@unique([userId, feedbackId]) // Índice único
}
```

**Endpoints**:
- `POST /feedback/:id/like` - Curtir feedback
- `DELETE /feedback/:id/like` - Descurtir feedback
- `GET /feedback/:id/likes` - Ver quem curtiu

### 2. Sistema de Busca Avançada 🔍
**Objetivo**: Implementar algoritmos de busca e filtros

**Algoritmos**:
- **Linear Search**: Para busca simples em texto
- **Binary Search**: Para busca em dados ordenados
- **Boyer-Moore**: Para busca eficiente de padrões
- **Trie**: Para autocomplete e sugestões

**Implementação**:
```typescript
// Serviço de busca
class SearchService {
  // Linear Search O(n)
  linearSearch(feedbacks: Feedback[], term: string): Feedback[]
  
  // Binary Search O(log n) - para dados ordenados
  binarySearch(sortedData: any[], target: any): number
  
  // Trie para autocomplete
  buildTrie(words: string[]): TrieNode
  autoComplete(prefix: string): string[]
}
```

**Endpoints**:
- `GET /feedback/search?q=termo&filter=rating&sort=likes`
- `GET /feedback/autocomplete?q=pre`

### 3. Sistema de Cache 💾
**Objetivo**: Otimizar performance com estruturas de dados em memória

**Estruturas de Dados**:
- **LRU Cache**: Para cache inteligente
- **Hash Map**: Para acesso O(1)
- **Doubly Linked List**: Para ordenação LRU

**Implementação**:
```typescript
class LRUCache<T> {
  private capacity: number;
  private cache: Map<string, T>;
  private order: DoublyLinkedList<string>;
  
  get(key: string): T | null // O(1)
  put(key: string, value: T): void // O(1)
  evict(): void // Remove least recently used
}
```

### 4. Algoritmos de Recomendação 🎯
**Objetivo**: Sugerir feedbacks relevantes usando algoritmos

**Algoritmos**:
- **Collaborative Filtering**: Baseado em usuários similares
- **Content-Based**: Baseado no conteúdo
- **Matrix Factorization**: Para análise de padrões
- **Cosine Similarity**: Para medir similaridade

**Implementação**:
```typescript
class RecommendationService {
  // Similaridade entre usuários
  cosineSimilarity(user1: number[], user2: number[]): number
  
  // Filtro colaborativo
  collaborativeFilter(userId: number): Feedback[]
  
  // Baseado em conteúdo
  contentBasedFilter(userId: number): Feedback[]
}
```

### 5. Estruturas de Dados Avançadas 📊
**Objetivo**: Implementar estruturas para análises complexas

**Implementações**:
- **Heap**: Para top K feedbacks
- **Graph**: Para relacionamentos entre usuários
- **Tree**: Para categorização hierárquica
- **Bloom Filter**: Para verificações rápidas

```typescript
// Min/Max Heap para rankings
class FeedbackHeap {
  private heap: Feedback[];
  
  insert(feedback: Feedback): void // O(log n)
  extractMax(): Feedback // O(log n)
  getTopK(k: number): Feedback[] // O(k log n)
}

// Graph para network de usuários
class UserGraph {
  private adjacencyList: Map<number, Set<number>>;
  
  addEdge(user1: number, user2: number): void
  findShortestPath(start: number, end: number): number[]
  detectCommunities(): number[][]
}
```

### 6. Algoritmos de Análise 📈
**Objetivo**: Extrair insights dos dados

**Implementações**:
- **Sliding Window**: Para análises temporais
- **Dynamic Programming**: Para otimizações
- **Graph Algorithms**: Para análise de relacionamentos
- **Statistical Algorithms**: Para métricas

```typescript
class AnalyticsService {
  // Sliding Window para tendências
  getTrendingFeedbacks(windowSize: number): Feedback[]
  
  // Dynamic Programming para otimizações
  optimizeRecommendations(constraints: any[]): Recommendation[]
  
  // Análise de sentimentos
  sentimentAnalysis(text: string): number
}
```

## 🛠️ Ordem de Implementação Sugerida

### Fase 1: Sistema de Likes (1-2 dias)
1. Criar migration para tabela FeedbackLike
2. Implementar endpoints de like/unlike
3. Atualizar contador de likes em tempo real
4. Testes com diferentes usuários

### Fase 2: Sistema de Busca (2-3 dias)
1. Implementar Linear Search para busca básica
2. Adicionar filtros por rating, data, autor
3. Implementar Trie para autocomplete
4. Otimizar com índices no banco

### Fase 3: Sistema de Cache (1-2 dias)
1. Implementar LRU Cache em memória
2. Cache para rankings frequentes
3. Cache para buscas populares
4. Métricas de performance

### Fase 4: Recomendações (3-4 dias)
1. Algoritmo básico de similaridade
2. Collaborative filtering
3. Content-based recommendations
4. Sistema híbrido

### Fase 5: Estruturas Avançadas (2-3 dias)
1. Heap para top feedbacks
2. Graph para network analysis
3. Bloom filter para verificações
4. Analytics dashboard

## 📚 Conceitos de Algoritmos para Estudar

### Complexidade Temporal
- O(1) - Hash operations
- O(log n) - Binary search, heap operations
- O(n) - Linear search, map operations
- O(n log n) - Efficient sorting
- O(n²) - Nested loops, some graph algorithms

### Estruturas de Dados
- **Arrays/Lists**: Base para implementações
- **Hash Tables**: Acesso rápido O(1)
- **Trees**: Organização hierárquica
- **Graphs**: Relacionamentos complexos
- **Heaps**: Priorização eficiente

### Algoritmos de Ordenação
- **Quick Sort**: O(n log n) médio
- **Merge Sort**: O(n log n) garantido
- **Heap Sort**: O(n log n) in-place
- **Bucket Sort**: O(n) para casos específicos

### Algoritmos de Busca
- **Linear Search**: O(n) simples
- **Binary Search**: O(log n) em dados ordenados
- **Hash Search**: O(1) médio
- **Tree Search**: O(log n) balanceado

## 🔧 Ferramentas e Tecnologias

### Desenvolvimento
- **TypeScript**: Tipagem estática
- **NestJS**: Framework modular
- **Prisma**: ORM com migrations
- **Jest**: Testes unitários

### Performance
- **Redis**: Cache distribuído
- **ElasticSearch**: Busca avançada
- **WebSockets**: Atualizações real-time
- **Bull Queue**: Processamento assíncrono

### Monitoramento
- **Prometheus**: Métricas
- **Grafana**: Visualização
- **Winston**: Logging
- **New Relic**: APM

## 💡 Comandos Úteis para Retomar

```bash
# Sincronizar código
git pull origin main
npm install

# Iniciar ambiente
docker-compose up -d
npx prisma migrate dev
npm run start:dev

# Testes
npm run test
npm run test:e2e
```

## 🎯 Objetivos de Aprendizado

1. **Algoritmos**: Implementar na prática os principais algoritmos
2. **Estruturas de Dados**: Usar as estruturas mais eficientes
3. **Complexidade**: Analisar e otimizar performance
4. **Padrões**: Aplicar design patterns
5. **Escalabilidade**: Preparar para grandes volumes

---

*Este roadmap combina aprendizado teórico com implementação prática, focando em algoritmos e estruturas de dados aplicados a um sistema real.*
