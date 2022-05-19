import React, { useCallback, useEffect, useState } from 'react'
import { answer, test } from '../interfaces'

interface ITest {
  test: test
  func: (result: answer) => void
  page: number
  length: number
}

const Test: React.FC<ITest> = ({ test, func, page, length }) => {
  const [values, setValues] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const [time, setTime] = useState<number>(test.time! / 1000)

  
  // handler
  const handler = (el: string) => {
    setDisabled(false)
    if (test.type === 'checkbox') {
      if (!values.includes(el)) {
        setValues(prev => [...prev, el])
      } else {
        setValues(values.filter(i => i !== el))
      }
    } else {
      setValue(el)
    }
  }


  // handlerInput
  const handlerInput = (value: string) => {
    setDisabled(false)
    setValue(value)
  }


  // nextStep
  const nextStep = useCallback(() => {
    const answer: answer = {
      id: Date.now(),
      question: test.question,
      value: (test.type === 'checkbox') ? values.sort().join(', ') : value,
      isRight: (test.type === 'checkbox') ? values.sort().join(', ') === test.answer : value === test.answer,
      answer: test.answer,
      image: test.image!
    }
    func(answer)
    setDisabled(true)
  }, [func, value, values, test.answer, test.type, test.question, test.image])


  // Timer
  useEffect(() => {
    const timeFunc = setTimeout(() => {
      if ( time > 0 ) {
        console.log('Time', time)
        setTime(time - 1)
        if (time === 1) nextStep()
      }
    }, 1000)
    return () => {
      clearTimeout(timeFunc)
    }
  }, [time, nextStep])


  return (
    <>
      <div className="App-header">Вопрос <b>{page}</b> из {length}</div>
      <div className="testbox">
        <h2>{test.question}</h2>

        {test.time && (
          <div className="timebox">Данный вопрос на время. У вас осталось: <span><b>{time}</b> сек.</span></div>
        )}

        {test.image && <p><img src={test.image} alt="" /></p>}

        {test.type === 'checkbox' && <p>Здесь можно выбрать несколько вариантов ответов.</p>}

        {test.type !== 'input' && 
        <ul className="test-questions">
          {test.options.map((el, index) => (
            <li key={index}>
              <label className="check-field">
                <input type={test.type} className={test.type} name={test.id} onChange={() => handler(el)} />
                <span>{el}</span>
              </label>
            </li>
          ))}
        </ul>}

        {test.type === 'input' && <div className="form-input">
          <input
            type="text"
            className="input"
            placeholder="Ваш ответ"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlerInput(e.target.value)}
          />
        </div>}

        <button className="btn" onClick={nextStep} disabled={disabled}>
          {(page !== length)
          ? 'Перейти к следующему вопросу'
          : 'Завершить тест'}
        </button>
      </div>
    </>
  )
}

export default Test