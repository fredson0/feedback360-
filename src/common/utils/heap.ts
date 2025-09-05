// Max Heap Implementation
// Árvore binária completa onde pai >= filhos
// Usado para Top K elementos em O(log n)

export class MaxHeap<T> {
    private heap: T[] = [];
    private compare: (a: T, b: T) => number;

    constructor(compareFunction: (a: T, b: T) => number) {
        this.compare = compareFunction;
    }

    // 🎯 MÉTODOS AUXILIARES (implementar primeiro)
    
    private getParentIndex(index: number): number {
        // TODO: Retornar índice do pai
        // Fórmula: Math.floor((index - 1) / 2)
        return Math.floor((index - 1) / 2);
    }

    private getLeftChildIndex(index: number): number {
        // TODO: Retornar índice do filho esquerdo
        // Fórmula: 2 * index + 1
        return 2 * index + 1;
    }

    private getRightChildIndex(index: number): number {
        // TODO: Retornar índice do filho direito
        // Fórmula: 2 * index + 2
        return 2 * index + 2;
    }

    private hasParent(index: number): boolean {
        // TODO: Verificar se o índice tem pai
        // Condição: getParentIndex(index) >= 0
        return this.getParentIndex(index) >= 0;
    }

    private hasLeftChild(index: number): boolean {
        // TODO: Verificar se tem filho esquerdo
        // Condição: getLeftChildIndex(index) < this.heap.length
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    private hasRightChild(index: number): boolean {
        // TODO: Verificar se tem filho direito
        // Condição: getRightChildIndex(index) < this.heap.length
        return this.getRightChildIndex(index) < this.heap.length;
    }

    private parent(index: number): T {
        // TODO: Retornar elemento pai
         return this.heap[this.getParentIndex(index)]
       
    }

    private leftChild(index: number): T {
        // TODO: Retornar elemento filho esquerdo
        return this.heap[this.getLeftChildIndex(index)];
    }

    private rightChild(index: number): T {
        // TODO: Retornar elemento filho direito
        return this.heap[this.getRightChildIndex(index)];
    }

    private swap(index1: number, index2: number): void {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    // 🎯 MÉTODOS PRINCIPAIS (implementar depois)

    insert(item: T): void {
        // 1. Adicionar no final do array
        this.heap.push(item);
        
        // 2. Fazer heapifyUp para manter propriedade do heap
        this.heapifyUp();
    }

    extractMax(): T | null {
        // TODO: 1. Salvar o máximo (primeiro elemento)
        // TODO: 2. Mover último para primeira posição
        // TODO: 3. Remover último
        // TODO: 4. Fazer heapifyDown
        return null;
    }

    peek(): T | null {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    // 🎯 ALGORITMOS DE HEAPIFY (mais complexos)

    private heapifyUp(): void {
        let index = this.heap.length - 1; // Começar do último elemento
        
        // Enquanto tem pai E o elemento atual é maior que o pai
        while (this.hasParent(index) && 
               this.compare(this.heap[index], this.parent(index)) > 0) {
            
            // Trocar com o pai
            this.swap(this.getParentIndex(index), index);
            
            // Subir para posição do pai
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown(): void {
        // TODO: Mover elemento para baixo até posição correta  
        // Usar while loop comparando com filhos
    }

    // 🎯 MÉTODO ESPECIAL PARA NOSSO PROJETO

    getTopK(k: number): T[] {
        // TODO: Retornar os K maiores elementos
        // Usar extractMax() K vezes
        return [];
    }
}
