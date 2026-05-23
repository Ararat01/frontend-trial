import React from "react";
import s from "./PostCard.module.css";

const PostCard = ({ post, setOpenedPost }) => {
  return (
    <article className={s.post}>
      <button className={s.postButton} onClick={() => setOpenedPost(post)}>
        <div className={s.imageContainer}>
          <img src={post.img} srcSet={post.img_2x} alt={post.title} />
        </div>
        <span className={s.tag}>{post.tags}</span>
        <h2>{post.title}</h2>
        <div className={s.info}>
          <span className={s.author}>{post.autor}</span>
          <span className="dot">•</span>
          <span>{post.date}</span>
          <span className="dot">•</span>
          <span>{post.views} views</span>
        </div>
        <p>{post.text}</p>
      </button>
    </article>
  );
};

export default PostCard;
