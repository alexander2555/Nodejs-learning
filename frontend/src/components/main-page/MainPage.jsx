import { useEffect, useState } from 'react'
import { Button, Controls } from '../../components'
import { getLocalHistory } from '../../utils'

const MainPage = () => {
  const [testHistory, setTestHistory] = useState({})

  const resetTestHistory = () => {
    localStorage.removeItem('testHistory')
    setTestHistory({})
  }

  useEffect(() => {
    setTestHistory(getLocalHistory())
  }, [])

  return (
    <>
      <Controls>
        <Button to="/quiz">Запустить тест</Button>
        <Button to="/questions">Редактировать тест</Button>
      </Controls>
      <h3>История тестирования</h3>
      {Object.keys(testHistory).length ? (
        <>
          <ul>
            {Object.entries(testHistory).map(([id, result]) => (
              <li key={id}>
                {new Date(Number(id)).toLocaleString()} Верно&nbsp;
                {result.reduce((correct, answer) => {
                  return Object.values(answer)[0] ? ++correct : correct
                }, 0)}
                &nbsp;из {result.length}
              </li>
            ))}
          </ul>
          <Button onClick={resetTestHistory}>Очистить историю</Button>
        </>
      ) : (
        <span>Test history is empty</span>
      )}
    </>
  )
}

export default MainPage
