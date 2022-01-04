export const signInWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve({}));
export const signOut = jest.fn(() => Promise.resolve({}));
export const onAuthStateChanged = jest.fn(() => Promise.resolve({}));
export const sendEmailVerification = jest.fn(() => Promise.resolve({}));
export const auth = jest.fn();
export const signInWithPopup = jest.fn((_auth_, provider) => Promise.resolve({ provider }));

export const db = jest.fn();

export const collection = jest.fn((_db_, _collection_) => _collection_);

export const addDoc = jest.fn((Collection, data) => Promise.resolve({ [Collection]: data }));

export const doc = jest.fn((_db_, nameCol, idDoc) => Object({ [nameCol]: idDoc }));

export const serverTimestamp = jest.fn();
export const getDoc = jest.fn(() => Promise.resolve({}));
