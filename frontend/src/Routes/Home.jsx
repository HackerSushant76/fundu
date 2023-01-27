import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PostCard from "../Components/PostCard";
import styles from "../Styles/home.module.css";
import { Avatar, Button, Heading, Input, Textarea } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useAuth0();
  const getPosts = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addPost = () => {
    const payload = {
      name: user.name,
      picture: user.picture,
      desc: text,
      title: title,
    };
    axios
      .post("http://localhost:5000/addpost", payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => getPosts());
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(user);
  return (
    <div id={styles.home}>
      <div id={styles.addpost}>
        {user !== undefined ? (
          <div>
            <Avatar name={user.name} src={user.picture} />{" "}
            <Heading size="md">{user.name}</Heading>
          </div>
        ) : null}
        <Input
          placeholder="Title"
          bg={"white"}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          bg={"white"}
          placeholder="Write something..."
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Button onClick={addPost}>Post</Button>
      </div>
      <div id={styles.posts}>
        {posts.map((elem) => (
          <PostCard key={elem._id} {...elem} />
        ))}
      </div>
    </div>
  );
};

export default Home;
