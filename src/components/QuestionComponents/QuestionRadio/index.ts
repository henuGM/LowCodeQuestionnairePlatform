import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '单选',
  type: 'questionRadio',
  Component,
  StatComponent,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
}
