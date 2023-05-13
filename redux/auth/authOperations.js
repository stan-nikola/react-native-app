import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
import { db } from "../../firebase/config";

const auth = getAuth(db);

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, userName }) =>
  async (dispatch, getState) => {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: userName,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    });

    const { uid, displayName } = auth.currentUser;

    dispatch(
      updateUserProfile({
        userId: uid,
        userName: displayName,
      })
    );
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          userName: user.displayName,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
