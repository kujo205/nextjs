import classes from "./CommentsSection.module.scss";
import { FC, useContext, useState } from "react";
import { NewComment } from "./NewComment";
import { CommentList } from "./CommentList";
import { CommentType } from "./Comment";
import { useRouter } from "next/router";
import NotificationCxt from "../../../store/notification-context";
import { error } from "console";
export interface mongodbComment {
  comment: CommentType;
  _id: string;
}

export const CommentsSection: FC<{ comments: mongodbComment[] }> = ({
  comments,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const router = useRouter();
  const { showNotification } = useContext(NotificationCxt);

  const submitCommentHandler = (comment: CommentType) => {
    showNotification({ status: "pending", title: "sending comment" });
    fetch(`/api/comments/${router.query.eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (response.ok) {
          showNotification({ status: "success", title: "comment sent" });

          return response.json();
        }

        throw Error("Something went wrong");
      })
      .then((response) => console.log(response))

      .catch((error) => {
        showNotification({ status: "error", title: error.message });
      });
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
