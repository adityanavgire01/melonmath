import type { ArithmeticProblem, Operation } from '../types'

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const OPERATORS: Record<Operation, string> = {
  add: '+',
  sub: '−',
  mul: '×',
  div: '÷',
}

export function generateArithmetic(operation: Operation): ArithmeticProblem {
  let a: number, b: number, answer: number

  switch (operation) {
    case 'add':
      a = rand(1, 99)
      b = rand(1, 99)
      answer = a + b
      break
    case 'sub':
      a = rand(1, 99)
      b = rand(1, a)
      answer = a - b
      break
    case 'mul':
      a = rand(2, 12)
      b = rand(2, 12)
      answer = a * b
      break
    case 'div': {
      b = rand(2, 12)
      answer = rand(2, 12)
      a = b * answer
      break
    }
  }

  return {
    a,
    b,
    operation,
    answer,
    display: `${a} ${OPERATORS[operation]} ${b}`,
  }
}
