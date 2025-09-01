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
    
    let currentNode = this.root;  // 🎯 Começar na raiz
    
    for (let char of word.toLowerCase()) {  // 🔄 Para cada caractere
      console.log(`  📍 Processando caractere: '${char}'`);
      
      // 🤔 Este nó tem um filho com esta letra?
      if (!currentNode.children.has(char)) {
        console.log(`    ➕ Criando novo nó para '${char}'`);
        currentNode.children.set(char, new TrieNode());
      }
      
      // ➡️ Mover para o próximo nó (filho)
      currentNode = currentNode.children.get(char)!;
    }
    
    // 🏁 Fim da palavra! Marcar e guardar dados
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
  // Lógica recursiva aqui
}

}