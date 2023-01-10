import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

const initialState = 'Initialnotification'

describe('notificationReducer', () => {
  test('notification can be updated', () => {
    const state = initialState
    const action = {
      type: 'notification/addNotification',
      payload: 'This is a test notification'
    }

    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toBe('This is a test notification')
  })
})