import { createAction, props } from "@ngrx/store";
import { User } from "./src/app/user";

export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction('[User List] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User List] Load Users Failure', props<{ error: string }>());

export const loadUser = createAction('[User Detail] Load User', props<{ id: number }>());
export const loadUserSuccess = createAction('[User Detail] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User Detail] Load User Failure', props<{ error: string }>());
