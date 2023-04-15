import { FC, FormEvent,useRef } from "react";
import classes from "./Comments.module.scss";
import { CommentType } from "./Comment";


export const NewComment: FC<{onCommentSubmit:(comment:CommentType)=>void}> = ({onCommentSubmit}) => {
    const emailRef=useRef<HTMLInputElement>(null);
    const nameRef=useRef<HTMLInputElement>(null);
    const commentRef=useRef<HTMLTextAreaElement>(null);



    const formSubmitHandler=(ev:FormEvent)=>{
        ev.preventDefault();
        const data:CommentType={
            name:nameRef.current?.value,
            text:commentRef.current?.value,
            author:emailRef.current?.value
        }
        // console.log(data)
        onCommentSubmit(data);

    }



  return (
    <div >
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.info}>
          <div>
            <label htmlFor="email">Your email</label>
            <input required type="email" name="" id="email" ref={emailRef}/>
          </div>
          <div>
            <label htmlFor="name">Your name</label>
            <input type="text" name="name" id="name" required ref={nameRef}/>
          </div>

          
        </div>
        <div className={classes.comment}>
            <label htmlFor="comment">Your comment</label>
            <textarea name="comment" id="comment" rows={4} required ref={commentRef}></textarea>
          </div>
          <button type="submit" className="btn-secondary">Sumbit</button>
      </form>
    </div>
  );
};
