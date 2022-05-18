import React, { useState } from 'react'
import testJSON from './assets/test.json'
import Finish from './components/Finish'
import Test from './components/Test'
import { answer } from './interfaces'

const App: React.FC = () => {
  const [results, setResults] = useState<answer[]>([])
  const [page, setPage] = useState<number>(0)

  // createResult
  const createResult = (answer: answer) => {
    setResults(prev => [...prev, answer])
    setPage(page + 1)
  }

  // resetResults
  const resetResults = () => {
    setResults([])
    setPage(0)
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="grid8">
          <div className="App">

            {testJSON.map(el => (
              <Test key={el.id} test={el} func={createResult} page={page + 1} length={testJSON.length} />
            ))[page]}

            {(page > testJSON.length - 1) && <Finish info={results} func={resetResults} />}
            
          </div>
        </div>
        <div className="grid4">
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default App
