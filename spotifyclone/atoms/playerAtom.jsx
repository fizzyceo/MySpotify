import { atom } from 'recoil'

export const PlayState = atom({
  default: false,
  key: 'playState',
})
export const Trackonplay = atom({
  key: 'Trackonplay',
  default: '',
})
