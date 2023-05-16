import { Cycle } from './reducer'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUP_CYCLE = 'INTERRUP_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

export function AddNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function InterrupCycleAction() {
  return {
    type: ActionTypes.INTERRUP_CYCLE,
  }
}

export function FinishCycleAction() {
  return {
    type: ActionTypes.FINISH_CYCLE,
  }
}
