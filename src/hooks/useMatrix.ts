import { useState, useCallback, useEffect } from 'react'
import { generateMatrix } from '../utils/generateMatrix'
import type { MatrixProblem, MatrixOperation } from '../types'

interface MatrixState {
  problem: MatrixProblem
  correct: number
  attempts: number
  cellValues: [string, string, string, string]
  wrongCells: boolean[]
  submitted: boolean
}

export function useMatrix(operation: MatrixOperation) {
  const [state, setState] = useState<MatrixState>(() => ({
    problem: generateMatrix(operation),
    correct: 0,
    attempts: 0,
    cellValues: ['', '', '', ''],
    wrongCells: [false, false, false, false],
    submitted: false,
  }))

  useEffect(() => {
    setState({
      problem: generateMatrix(operation),
      correct: 0,
      attempts: 0,
      cellValues: ['', '', '', ''],
      wrongCells: [false, false, false, false],
      submitted: false,
    })
  }, [operation])

  const setCellValue = useCallback((index: number, value: string) => {
    setState(prev => {
      const next = [...prev.cellValues] as MatrixState['cellValues']
      next[index] = value
      return { ...prev, cellValues: next }
    })
  }, [])

  const submit = useCallback(() => {
    setState(prev => {
      const { problem, cellValues } = prev
      const expected = [
        problem.result[0][0],
        problem.result[0][1],
        problem.result[1][0],
        problem.result[1][1],
      ]
      const wrongCells = cellValues.map(
        (v, i) => parseInt(v.trim(), 10) !== expected[i],
      )
      const allCorrect = wrongCells.every(w => !w)

      if (allCorrect) {
        return {
          problem: generateMatrix(prev.problem.operation),
          correct: prev.correct + 1,
          attempts: prev.attempts + 1,
          cellValues: ['', '', '', ''],
          wrongCells: [false, false, false, false],
          submitted: false,
        }
      }
      return { ...prev, wrongCells, attempts: prev.attempts + 1, submitted: true }
    })
  }, [])

  const skip = useCallback(() => {
    setState(prev => ({
      ...prev,
      problem: generateMatrix(prev.problem.operation),
      cellValues: ['', '', '', ''],
      wrongCells: [false, false, false, false],
      submitted: false,
    }))
  }, [])

  const reset = useCallback((op?: MatrixOperation) => {
    setState(prev => ({
      problem: generateMatrix(op ?? prev.problem.operation),
      correct: 0,
      attempts: 0,
      cellValues: ['', '', '', ''],
      wrongCells: [false, false, false, false],
      submitted: false,
    }))
  }, [])

  return { ...state, setCellValue, submit, skip, reset }
}
