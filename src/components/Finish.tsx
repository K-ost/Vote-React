import React from 'react'
import { answer } from '../interfaces'

interface IFinish {
  info: answer[]
  func: () => void
}

const Finish: React.FC<IFinish> = ({ info, func }) => {
  const countTrue = info.reduce((prev, el) => {
    if (el.isRight === true) {
      prev += 1
    }
    return prev
  }, 0)

  return (
    <div className="finish-test">
      <h2>Результаты теста</h2>
      <p>Правильных ответов: {countTrue} из {info.length}</p>
      {countTrue === info.length && <p><span className="emoji">🎉 </span> Поздравляем! Все ответы верны!</p>}
      <ul className="results">
        {info.map(el => (
          <li key={el.id} className={el.isRight ? 'success' : 'danger'}>
            <h4>{el.question}</h4>
            <div className="results-body">
              <div className="results-details">
                {el.value.length !== 0
                  ? <p>Ваш ответ: <b>{el.value}</b></p>
                  : <p>Вы не успели ответить</p>
                }
                {!el.isRight && <p>Правильный ответ: <b>{el.answer}</b></p>}
              </div>
              {el.image && <div className="results-img" style={{backgroundImage: `url(${el.image})`}}></div>}
            </div>
          </li>
        ))}
      </ul>
      <button className="btn" onClick={func}>Вернуться к началу</button>
    </div>
  )
}

export default Finish