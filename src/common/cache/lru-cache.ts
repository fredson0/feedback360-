// LRU Cache Implementation
// Least Recently Used Cache with O(1) operations
class LruNode<T> {
    key: string;
    value: T;
    prev: LruNode<T> | null;
    next: LruNode<T> | null;

    constructor(key: string, value: T){
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }

}
class LRUCache<T>{
    private capacity: number;
    private cache: Map<string, LruNode<T>>;
    private head: LruNode<T>;
    private tail: LruNode<T>;

    constructor(capacity: number){
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new LruNode<T>("head", {} as T);
        this.tail = new LruNode<T>("tail", {} as T);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    private addToFront(node: LruNode<T>): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    private removeNode(node: LruNode<T>): void{
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

    get(key: string): T |  null {
        const node = this.cache.get(key);

        if(!node){
            return null;
        }

        this.removeNode(node);
        this.addToFront(node);

        return node.value;
    }

    put(key: string, value: T): void {
        const existingNode = this.cache.get(key);

        if(existingNode){
            existingNode.value =value;
            this.removeNode(existingNode);
            this.addToFront(existingNode);
            return;
        }

        const newNode =new LruNode(key, value);

        if(this.cache.size >= this.capacity){
            const lru = this.tail.prev!;
            this.cache.delete(lru.key);
            this.removeNode(lru);
        }
        this.cache.set(key,newNode);
        this.addToFront(newNode);
    }

}