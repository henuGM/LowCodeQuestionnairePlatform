export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  onChange?: (newProps: QuestionTextareaPropsType) => void
  disabled?: boolean
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '长文本',
  placeholder: '请输入...',
}
