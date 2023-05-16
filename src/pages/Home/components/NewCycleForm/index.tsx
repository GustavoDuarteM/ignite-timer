import { useFormContext } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CycleContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)

  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para seu projeto"
        disabled={!!activeCycle}
        list="task-suggestion"
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option>projeto 1</option>
        <option>projeto 2</option>
        <option>projeto 3</option>
        <option>projeto 4</option>
      </datalist>

      <label htmlFor="minutesAmount"> Durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
