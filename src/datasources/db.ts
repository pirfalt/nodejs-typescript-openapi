export type DB<T extends { id?: number }> = {
  /**
   * Current size of the db.
   */
  size(): Promise<number>;

  /**
   * Get item by id.
   */
  get(id: number): Promise<T | undefined>;

  /**
   * Adds the value to the db.
   *
   * Ignores the `value.id` if it's set and replaces it with a newly generated id.
   */
  add(value: T): Promise<T>;

  /**
   * Delete item by id
   */
  delete(id: number): Promise<boolean>;

  /**
   * Creates a new db entry with the given id and value.
   *
   * Ignores the `value.id` if it's set and replaces it with the `id`.
   */
  createOrUpdate(id: number, value: T): Promise<T>;

  /**
   * Scan for items matching the filter function.
   *
   *
   */
  scan(matcher?: (value: T) => boolean): AsyncIterable<T>;
};

export default async function connectToDB<T extends { id?: number }>(): Promise<
  DB<T>
> {
  const db = new Map<number, T>();

  return {
    async size() {
      return db.size;
    },

    async get(id: number) {
      return db.get(id);
    },

    async createOrUpdate(id: number, value: T) {
      value.id = id;
      db.set(id, value);
      return value;
    },

    async add(value: T) {
      const nextId = db.size + 1;
      value.id = nextId;
      db.set(nextId, value);
      return value;
    },

    async delete(id: number) {
      return db.delete(id);
    },

    async *scan(matcher?: (value: T) => boolean) {
      for (const v of db.values()) {
        if (matcher == null) yield v;
        if (matcher?.(v)) yield v;
      }
    },
  };
}
