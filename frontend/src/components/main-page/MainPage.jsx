import { useState } from 'react'
import { Button, Controls } from '../../components'
import { getLocalHistory, setLocalHistory } from '../../utils'

const initTestHistory = getLocalHistory()

const MainPage = () => {
  const [testHistory, setTestHistory] = useState(initTestHistory)

  const resetTestHistory = () => {
    setTestHistory([])
    setLocalHistory()
  }

  return (
    <>
      <Controls>
        <Button to="/quiz">Запустить тест</Button>
        <Button to="/questions">Редактировать тест</Button>
      </Controls>
      <h3>История тестирования</h3>
      {testHistory.length ? (
        <>
          {testHistory.map(({ id, result }) => (
            <div key={id}>{result}</div>
          ))}
          <Button onClick={resetTestHistory}>Очистить историю</Button>
        </>
      ) : (
        <span>Test history is empty</span>
      )}
    </>
  )
}

export default MainPage
