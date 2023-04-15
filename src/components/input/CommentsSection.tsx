import classes from "./CommentsSection.module.scss";
import { FC, useState } from "react";
import { NewComment } from "./NewComment";
import { CommentList } from "./CommentList";
import { CommentType } from "./Comment";
import { useRouter } from "next/router";

export interface mongodbComment{
    comment:CommentType;
    _id:string
}


export const CommentsSection: FC<{comments:mongodbComment[]}> = ({comments}) => {
  const [opened, setOpened] = useState<boolean>(false);
    const router=useRouter()

  const submitCommentHandler = (comment: CommentType) => {
    fetch(`/api/comments/${router.query.eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({comment}),
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  };

  return (
    <>
      <section className={classes["comment-section"]}>
        <button className="btn-secondary" onClick={() => setOpened((v) => !v)}>
          {opened ? "Hide" : "Show"} comments
        </button>
        {opened && <NewComment onCommentSubmit={submitCommentHandler} />}
        {opened && <CommentList comments={comments} />}
      </section>
    </>
  );
};
