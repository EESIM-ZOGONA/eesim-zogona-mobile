/**
 * Storage Adapter Interface
 * Abstraction layer for storage operations - enables easy swap between SQLite and API
 */

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

export interface SearchOptions extends QueryOptions {
  fields?: string[];
}

/**
 * Generic storage adapter interface
 * Implement this for SQLite, API, or any other storage backend
 */
export interface StorageAdapter<T> {
  // Basic CRUD
  getById(id: string): Promise<T | null>;
  getAll(options?: QueryOptions): Promise<T[]>;
  create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;

  // Search
  search(query: string, options?: SearchOptions): Promise<T[]>;

  // Sync support (for future API integration)
  getPendingSync(): Promise<T[]>;
  markSynced(ids: string[]): Promise<void>;
}

/**
 * Sync status for entities
 * - local: Only exists locally, never synced
 * - synced: Synced with server, no pending changes
 * - pending: Local changes waiting to be synced
 * - conflict: Server and local versions conflict
 */
export type SyncStatus = 'local' | 'synced' | 'pending' | 'conflict';

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get current ISO timestamp
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
