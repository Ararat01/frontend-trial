import React from "react";
import styles from "./Modal.module.css";
import CloseIcon from "../../icons/CloseIcon";

const Modal = ({ post, state, changeState }) => {
  if (!post) return null;
  return (
    <div
      className={styles.overlay}
      onClick={changeState}
      style={{ display: state ? "flex" : "none" }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={changeState}>
          <CloseIcon size={"20px"} />
        </button>
        <div className={styles.imageContainer}>
          <img src={post.img} srcSet={post.img_2x} alt={post.title} />
        </div>
        <span className={styles.tag}>{post.tags}</span>
        <h2>{post.title}</h2>
        <div className={styles.info}>
          <span className={styles.author}>{post.autor}</span>
          <span className="dot">•</span>
          <span>{post.date}</span>
          <span className="dot">•</span>
          <span>{post.views} views</span>
        </div>
        <p>{post.text}</p>
      </div>
    </div>
  );
};

export default Modal;
