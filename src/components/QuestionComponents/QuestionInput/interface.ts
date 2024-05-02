export type QuestionInputPropsType={
    title?:string
    placeholder?:string
    onChange?:(newProps:QuestionInputPropsType)=>void
    disabled?:boolean
}

export const QuestionInputDefaultProps:QuestionInputPropsType={
    title:'填空',
    placeholder:'请输入...'
}