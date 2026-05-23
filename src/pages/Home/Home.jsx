import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../../services/api";
import s from "./Home.module.css";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const query = searchParams.get("q");
  const [openedPost, setOpenedPost] = useState(null);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(
        query
          ? data.filter(
              (post) =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.text.toLowerCase().includes(query.toLowerCase()),
            )
          : data,
      );
    });
  }, [query]);
  return (
    <section className={`${s.posts} container`}>
      {posts.map((post, i) => (
        <article key={i} className={s.post}>
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
      ))}
      <Modal
        post={openedPost}
        state={!!openedPost}
        changeState={() => setOpenedPost(null)}
      />
    </section>
  );
};

export default Home;
