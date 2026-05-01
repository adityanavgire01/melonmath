export type Operation = 'add' | 'sub' | 'mul' | 'div'
export type MatrixOperation = 'add' | 'sub' | 'mul'
export type TimerDuration = 15 | 30 | 60
export type Mode = 'arithmetic' | 'matrix'

export interface ArithmeticProblem {
  a: number
  b: number
  operation: Operation
  answer: number
  display: string
}

export interface MatrixProblem {
  a: [[number, number], [number, number]]
  b: [[number, number], [number, number]]
  result: [[number, number], [number, number]]
  operation: MatrixOperation
}

export interface SessionStats {
  correct: number
  attempts: number
  elapsedSeconds: number
}
