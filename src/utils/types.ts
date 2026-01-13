export type PrequizAnswers = {
  numPeople: number,
  hours: number,
  minutes: number
}

export type PersonQuizAnswers = {
  person: number,
  favorite: string,
  isNew: boolean,
  isClassic: boolean,
  isFun: boolean,
  isSerious: boolean,
  isInspiring: boolean,
  isScary: boolean,
  island: string,
}

export function initializePersonQuizAnswers(n: number): PersonQuizAnswers {
  return ({
    person: n,
    favorite: "",
    isNew: false,
    isClassic: false,
    isFun: false,
    isSerious: false,
    isInspiring: false,
    isScary: false,
    island: "",
  })
}