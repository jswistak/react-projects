import { atom, selector } from "recoil";
import { CARS } from './Car'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const carsState = atom({
    key: 'carsState',
    default: CARS,
    effects_UNSTABLE: [persistAtom],

});