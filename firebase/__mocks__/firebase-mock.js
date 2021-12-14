const signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
const auth = jest.fn();

export {
  signInWithEmailAndPassword,
  auth,
};
