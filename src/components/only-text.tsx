import { PropsWithChildren } from 'react'
import { onlyText } from 'react-children-utilities'

const OnlyText = ({ children }: PropsWithChildren<{}>) => onlyText(children)

export default OnlyText
