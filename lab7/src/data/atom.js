import { atom, selector } from "recoil";
import codes from './countryCodes.json';

export const stadiumState = atom({
    key: 'stadiumState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });

export const matchState = atom({
  key: "matchState",
  default: {
    stadium: '',
    codeFirst: '',
    codeSecond: '',
    scoreFirst: 0,
    scoreSecond: 0
  }
})

const getFullCountryName = (state) => ({ get }) => {
  const countryFirst = codes[get(state).codeFirst]
  const countrySecond = codes[get(state).codeSecond]
  return {
    nameFirst: countryFirst ? countryFirst : get(state).codeFirst,
    flagFirst: countryFirst ? `https://countryflagsapi.com/png/${get(state).codeFirst}` : '/unknown.png',
    nameSecond: countrySecond ? countrySecond : get(state).codeSecond,
    flagSecond: countrySecond ? `https://countryflagsapi.com/png/${get(state).codeSecond}` : '/unknown.png',
  }
}
export const countryDetailsState = selector({
  key: 'countryDetailsState',
  get: getFullCountryName(matchState)
})