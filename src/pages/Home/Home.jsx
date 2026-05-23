import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../../services/api";
import s from "./Home.module.css";
import Modal from "../../components/Modal/Modal";
import PostCard from './../../components/PostCard/PostCard';

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
       <PostCard key={i} post={post} setOpenedPost={setOpenedPost} />
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
