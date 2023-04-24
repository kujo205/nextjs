import { FC } from "react";
import { CommentType,Comment  } from "./Comment";
import classes from './Comments.module.scss';
import type {mongodbComment} from './CommentsSection'


export const CommentList: FC<{comments:mongodbComment[]}> = ({ comments }) => {
  return (
    <ul className={classes['comment-list']}>
      {comments&&comments.map((comment) => (
        <li key={comment._id}>
          <Comment {...comment.comment} />
        </li>
      ))}
       {!comments&&<p>
        Loading...
        </p>}
    </ul>
  );
};
