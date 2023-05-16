import React, { createContext, useEffect, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  AddNewCycleAction,
  FinishCycleAction,
  InterrupCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  handleCreateNewCycle: (data: NewCycleFormData) => void
  handleInterruptCycle: () => void
}

export const CycleContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesStates, dispatchCycles] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (intialState) => {
      const storedStateAsJson = localStorage.getItem(
        '@ignite-timer:cicle-state',
      )
      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson)
      }
      return intialState
    },
  )

  const { cycles, activeCycleId } = cyclesStates
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      const secondsPassed = differenceInSeconds(
        new Date(),
        new Date(activeCycle.starteDate),
      )
      return secondsPassed
    }

    return 0
  })

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesStates)

    localStorage.setItem('@ignite-timer:cicle-state', stateJson)
  }, [cyclesStates])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      starteDate: new Date(),
    }

    dispatchCycles(AddNewCycleAction(newCycle))
  }

  function handleInterruptCycle() {
    setAmountSecondsPassed(0)

    dispatchCycles(InterrupCycleAction())
  }

  function handleFinishedCycle() {
    dispatchCycles(FinishCycleAction())

    setAmountSecondsPassed(0)
  }

  function markCurrentCycleAsFinished() {
    handleFinishedCycle()
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        handleCreateNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
