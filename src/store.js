import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const _userAtom = atom({
  account: null,
  authority: 3, // 3 為遊客
  token: null,
});

const UserAtom = atomWithStorage("user", _userAtom);

export { UserAtom };
