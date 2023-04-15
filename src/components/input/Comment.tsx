import classes from './Comments.module.scss'
import { FC } from 'react';


export interface CommentType{
    author?:string;
    text?:string
    name?:string;
    id?:string;
}

export const Comment:FC<CommentType>=({author,text})=>{

    return <div className={classes.comment}>
        <p >
            {text}
        </p>
        <i>{author}</i>
        <hr/>
    </div>



}