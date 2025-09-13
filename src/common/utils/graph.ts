// Graph Implementation
// Estrutura de dados para representar relacionamentos entre usuários
// Usado para análise de rede social e sugestões de conexão

export class Graph<T> {
    private adjacencyList: Map<T, Set<T>>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: T): void {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, new Set());
        }
    }

    addEdge(from: T, to: T): void {
        this.addVertex(from);
        this.addVertex(to);

        this.adjacencyList.get(from)!.add(to);
    }

    removeEdge(from: T, to: T): void {
        const fromNeighbors = this.adjacencyList.get(from);
        if (fromNeighbors) {
            fromNeighbors.delete(to);
        }
    }

    removeVertex(vertex: T): void {

        this.adjacencyList.delete(vertex);

        for (const [key, value] of this.adjacencyList) {
            value.delete(vertex);
        }
    }


    getVertices(): T[] {
        return Array.from(this.adjacencyList.keys());
    }

    getNeighbors(vertex: T): T[] {
        const neighbors = this.adjacencyList.get(vertex);
        return neighbors ? Array.from(neighbors) : [];
    }

    hasVertex(vertex: T): boolean {
        // TODO: Verificar se vértice existe
        return this.adjacencyList.has(vertex);
    }

    hasEdge(from: T, to: T): boolean {
        // Verifica se existe conexão entre dois vértices
        const fromNeighbors = this.adjacencyList.get(from);
        return fromNeighbors ? fromNeighbors.has(to) : false;
    }

    // 🎯 ALGORITMOS DE BUSCA 

    bfs(startVertex: T): T[] {
        // TODO: Breadth-First Search (Busca em Largura)
        // Algoritmo para explorar grafo nível por nível
        if (!this.hasVertex(startVertex)) return [];

        const queue: T[] = [startVertex];
        const visited = new Set<T>([startVertex]);
        const result: T[] = [];

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current!);

            for (const neighbor of this.getNeighbors(current!)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    dfs(startVertex: T): T[] {
        if (!this.hasVertex(startVertex)) return [];

        const stack: T[] = [startVertex];
        const visited = new Set<T>([startVertex]);
        const result: T[] = [];

        while (stack.length > 0) {
            const current = stack.pop();
            result.push(current!);

            for (const neighbor of this.getNeighbors(current!)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }
        return result;
    }

    // 🎯 ALGORITMOS ESPECÍFICOS PARA FEEDBACKS

    findShortestPath(from: T, to: T): T[] {
        // TODO: Encontrar caminho mais curto entre dois usuários
        // Útil para "grau de separação" entre usuários
        if (!this.hasVertex(from) || !this.hasVertex(to)){
            return [];
        }
        if (from === to){
            return [from];
        }
        const queue: T[] = [from];
        const visited = new Set<T>([from]);
        const parent = new Map<T, T> ();

        while (queue.length > 0){
            const current = queue.shift()!;

            if (current === to){
                break;
            }

            for (const neighbor of this.getNeighbors(current)){
                if (!visited.has(neighbor)){
                    visited.add(neighbor);
                    queue.push(neighbor);
                    parent.set(neighbor, current);
                }
            }
        }
        if (!parent.has(to) && from !== to){
            return [];
        }
        const path: T[] = [];
        let current: T | undefined = to;
        while (current) {
            path.unshift(current);
            current = parent.get(current);
        }
        return path;
    }

    findConnectedComponents(): T[][] {
        // TODO: Encontrar grupos de usuários conectados
        // Útil para identificar "comunidades" na plataforma
        return [];
    }

    getMostConnectedVertices(limit: number = 5): T[] {
        // TODO: Encontrar usuários mais conectados (influenciadores)
        // Ordenar por número de conexões
        return [];
    }

    // 🎯 MÉTODOS UTILITÁRIOS

    size(): number {
        // Retorna número de vértices no grafo
        return this.adjacencyList.size;
    }

    isEmpty(): boolean {
        // Verifica se grafo está vazio (sem vértices)
        return this.adjacencyList.size === 0;
    }

    print(): void {
        // TODO: Imprimir representação do grafo (debug)
        console.log('Grafo vazio');
    }
}
