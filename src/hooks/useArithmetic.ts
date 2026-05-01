import { useState, useCallback, useEffect } from 'react'
import { generateArithmetic } from '../utils/generateArithmetic'
import type { Operation, ArithmeticProblem } from '../types'

interface ArithmeticState {
  problem: ArithmeticProblem
  correct: number
  attempts: number
  lastResult: 'correct' | 'wrong' | null
}

export function useArithmetic(operation: Operation) {
  const [state, setState] = useState<ArithmeticState>(() => ({
    problem: generateArithmetic(operation),
    correct: 0,
    attempts: 0,
    lastResult: null,
  }))

  const submit = useCallback(
    (value: string) => {
      const parsed = parseInt(value.trim(), 10)
      const isCorrect = parsed === state.problem.answer

      setState(prev => ({
        problem: isCorrect ? generateArithmetic(operation) : prev.problem,
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        attempts: prev.attempts + 1,
        lastResult: isCorrect ? 'correct' : 'wrong',
      }))

      return isCorrect
    },
    [state.problem.answer, operation],
  )

  // When operation changes (e.g. ADD→MUL), reset state with the new operation.
  // This runs after the render where `operation` changes, ensuring the new
  // problem is generated with the correct operator.
  useEffect(() => {
    setState({
      problem: generateArithmetic(operation),
      correct: 0,
      attempts: 0,
      lastResult: null,
    })
  }, [operation])

  const reset = useCallback(() => {
    setState({
      problem: generateArithmetic(operation),
      correct: 0,
      attempts: 0,
      lastResult: null,
    })
  }, [operation])

  return { ...state, submit, reset }
}
