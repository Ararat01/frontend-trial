import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../../services/api";
import s from "./Home.module.css";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const query = searchParams.get("q");

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(
        data.filter(
          (post) => post.title.toLowerCase().includes(query.toLowerCase()) || post.text.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    });
  }, [query]);
  return (
    <section className={`${s.posts} container`}>
      {posts.map((post, i) => (
        <article key={i} className={s.post}>
          <img src={post.img} srcSet={post.img_2x} alt={post.title} />
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
        </article>
      ))}
    </section>
  );
};

export default Home;
