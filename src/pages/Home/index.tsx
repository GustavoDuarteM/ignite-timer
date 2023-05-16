import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFoemValidationSchema = zod.object({
  task: zod.string().min(1, 'informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormDataZod = zod.infer<typeof newCycleFoemValidationSchema>

const CycleFormDataInit: NewCycleFormDataZod = {
  task: '',
  minutesAmount: 0,
}

export function Home() {
  const { activeCycle, handleInterruptCycle, handleCreateNewCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormDataZod>({
    resolver: zodResolver(newCycleFoemValidationSchema),
    defaultValues: CycleFormDataInit,
  })
  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')

  function startCountdownButton() {
    return (
      <StartCountdownButton disabled={!task} type="submit">
        <Play size={24} />
        Começar
      </StartCountdownButton>
    )
  }

  function stopCountdownButton() {
    return (
      <StopCountdownButton type="button" onClick={handleInterruptCycle}>
        <HandPalm size={24} />
        Parar
      </StopCountdownButton>
    )
  }
  function CreateNewCycle(e: NewCycleFormDataZod) {
    handleCreateNewCycle(e)
    reset()
  }
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(CreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? stopCountdownButton() : startCountdownButton()}
      </form>
    </HomeContainer>
  )
}
