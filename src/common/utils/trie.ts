// Trie (Prefix Tree) para Autocomplete
// Algoritmo O(m) para busca, onde m = tamanho do prefixo

export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  data: string[]; // Armazena os dados completos que terminam neste nó

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.data = [];
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Inserir uma palavra na Trie
  insert(word: string, data: string): void {
    console.log(`🌳 Inserindo: "${word}" com data: "${data}"`);
    
    let currentNode = this.root;  //  Começar na raiz
    
    for (let char of word.toLowerCase()) {  //  Para cada caractere
      console.log(`  📍 Processando caractere: '${char}'`);
      
      //  Este nó tem um filho com esta letra?
      if (!currentNode.children.has(char)) {
        console.log(`    ➕ Criando novo nó para '${char}'`);
        currentNode.children.set(char, new TrieNode());
      }
      
      //  Mover para o próximo nó (filho)
      currentNode = currentNode.children.get(char)!;
    }
    
    //  Fim da palavra! Marcar e guardar dados
    currentNode.isEndOfWord = true;
    currentNode.data.push(data);
    console.log(`✅ Palavra "${word}" inserida com sucesso!`);
  }

  search(prefix: string): string[] {
    // 1. Navegar até o nó do prefixo
    let node = this.findPrefixNode(prefix);
    if (!node) return []; // Prefixo não existe
    
    // 2. Coletar todas as palavras a partir desse nó
    let results: string[] = [];
    this.collectAllWords(node, prefix, results);
    return results;
  }

  private collectAllWords(node: TrieNode, currentPrefix: string, results: string[]) {
    console.log(`🔍 Explorando nó com prefixo: "${currentPrefix}"`);
    
    // PASSO 1: Se este nó marca o fim de uma palavra, adicionar aos resultados
    if (node.isEndOfWord) {
      console.log(`  ✅ Encontrou palavra completa! Adicionando: ${node.data}`);
      results.push(...node.data); // Adiciona todos os dados deste nó
    }
    
    // PASSO 2: RECURSÃO - Para cada filho, continuar explorando
    for (let [char, childNode] of node.children) {
      console.log(`  🌿 Explorando filho '${char}' com prefixo "${currentPrefix + char}"`);
      
      // CHAMADA RECURSIVA: A mágica acontece aqui!
      // Chama a mesma função, mas com:
      // - nó filho
      // - prefixo + nova letra
      // - mesmo array de resultados (vai sendo preenchido)
      this.collectAllWords(childNode, currentPrefix + char, results);
    }
    
    console.log(`  🔙 Voltando do nó "${currentPrefix}"`);
  }

  private findPrefixNode(prefix: string): TrieNode | null {
    let currentNode = this.root;

    for (let char of prefix.toLowerCase()) {
      if (!currentNode.children.has(char)) {
        return null; // Prefixo não encontrado
      }
      currentNode = currentNode.children.get(char)!;
    }

    return currentNode;
  }
}