import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserToken, IdUser, UserType } from '../types/user';

const userAtom = atom<UserType | null>(null);
const tokenAtom = atomWithStorage<UserToken | null>('token', null);
const idUser = atomWithStorage<IdUser | null>('idUser', null);
export { userAtom, tokenAtom, idUser };
