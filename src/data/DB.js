import { openDB } from 'idb';

// Initialize the IndexedDB database
const initDB = async () => {
  const db = await openDB('WishesDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('wishes')) {
        db.createObjectStore('wishes', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

// Add a wish
export const addWish = async (wish) => {
  const db = await initDB();
  const id = await db.add('wishes', wish);
  return id;
};

// Get all wishes
export const allWishes = async () => {
  const db = await initDB();
  return await db.getAll('wishes');
};

// Delete all wishes
export const deleteAllWishes = async () => {
  const db = await initDB();
  const transaction = db.transaction('wishes', 'readwrite');
  const store = transaction.objectStore('wishes');
  await store.clear(); // Clears all entries
};
