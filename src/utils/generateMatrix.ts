import type { MatrixProblem, MatrixOperation } from '../types'

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export function generateMatrix(operation: MatrixOperation): MatrixProblem {
  const a: MatrixProblem['a'] = [
    [rand(1, 9), rand(1, 9)],
    [rand(1, 9), rand(1, 9)],
  ]
  const b: MatrixProblem['b'] = [
    [rand(1, 9), rand(1, 9)],
    [rand(1, 9), rand(1, 9)],
  ]

  let result: MatrixProblem['result']

  if (operation === 'add') {
    result = [
      [a[0][0] + b[0][0], a[0][1] + b[0][1]],
      [a[1][0] + b[1][0], a[1][1] + b[1][1]],
    ]
  } else if (operation === 'sub') {
    result = [
      [a[0][0] - b[0][0], a[0][1] - b[0][1]],
      [a[1][0] - b[1][0], a[1][1] - b[1][1]],
    ]
  } else {
    result = [
      [
        a[0][0] * b[0][0] + a[0][1] * b[1][0],
        a[0][0] * b[0][1] + a[0][1] * b[1][1],
      ],
      [
        a[1][0] * b[0][0] + a[1][1] * b[1][0],
        a[1][0] * b[0][1] + a[1][1] * b[1][1],
      ],
    ]
  }

  return { a, b, result, operation }
}
