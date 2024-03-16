import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTextareaDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多行输入',
  type: 'questionTextarea',
  Component, 
  PropComponent, 
  defaultProps: QuestionTextareaDefaultProps,
}
