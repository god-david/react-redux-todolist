import {CHNAGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_ACTION} from './actionTypes'

export const getInputChangeAction = (value) => ({
  type: CHNAGE_INPUT_VALUE,
  value
})

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const getInitAction = (data) => ({
  type: INIT_ACTION,
  data
})
