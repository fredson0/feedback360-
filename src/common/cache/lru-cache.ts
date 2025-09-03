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
    private head: LruNode<T>

}