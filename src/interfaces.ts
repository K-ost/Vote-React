export interface test {
  id: string
  question: string
  type: string
  options: string[]
  answer: string
  image?: string | null
  time?: number | null
}

export interface answer {
  id: number
  question: string
  value: string
  isRight: boolean
  answer: string
}