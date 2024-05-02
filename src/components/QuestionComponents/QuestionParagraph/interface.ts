export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // 用于 PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '短文本',
  isCenter: false,
}
