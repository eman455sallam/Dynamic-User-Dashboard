import { createReducer, on } from "@ngrx/store";
import { User } from "./src/app/user";
import { loadUser, loadUserFailure, loadUsers, loadUsersFailure, loadUsersSuccess, loadUserSuccess } from "./user.actions";

export interface UserState {
  users: User[];
  selectedUser: User | null;
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(loadUser, state => ({ ...state, loading: true })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, selectedUser: user, loading: false })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
