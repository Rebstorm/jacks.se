/** @jsx h */
import { h } from "preact";

export interface Content {
    content: string
}
export const Content = (props: Content) => {
    return <div> {props.content} </div>
}

export default Content;