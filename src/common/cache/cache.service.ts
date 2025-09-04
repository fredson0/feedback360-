import {Injectable} from '@nestjs/common';
import {LRUCache} from './lru-cache';

@Injectable()
export class CacheService {
    private autocompleteCache: LRUCache<string[]>;
    private rankingCache: LRUCache<any>;

    constructor(){
        this.autocompleteCache = new LRUCache<string[]>(100);
        this.rankingCache = new LRUCache<any>(100);
    }

    getAutocomplete(prefix: string): string[] | null {
        return this.autocompleteCache.get(prefix);
    }
    
    setAutocomplete(prefix: string, results: string[]): void {
        this.autocompleteCache.put(prefix, results);
    }

    getRanking(key: string): any | null {
        return this.rankingCache.get(key);
    }
    
    setRanking(key: string, data: any): void {
        this.rankingCache.put(key, data);
    }
}