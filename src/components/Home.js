import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Profile from "./profile/Profile";
import PostPage from "../components/PostPage";
import BarkersPage from "../components/BarkersPage";
import FollowPage from "./profile/FollowPage";
import FooterNav from "./FooterNav";

import HashtagPage from "./HashtagPage";

import { db } from "../firebase/firebase";

const Home = () => {
  const { handleError } = useContext(BarkerContext);
  const { path } = useRouteMatch();
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //sync contents
    const unsubscribe = db
      .collection("contents")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          const fetchedContents = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setContents(fetchedContents);

          const posts = fetchedContents.filter(
            (item) => item.type === "post" || item.type === "rebark"
          );
          setPosts(posts);
        },
        (error) => {
          handleError(error);
        }
      );

    return () => unsubscribe();
  }, [handleError]);

  useEffect(() => {
    //sync users
    const unsubscribe = db.collection("users").onSnapshot(
      (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => {
          return { uid: doc.id, ...doc.data() };
        });
        setUsers(fetchedUsers);
      },
      (error) => {
        handleError(error);
      }
    );
    return () => unsubscribe();
  }, [handleError]);

  return (
    <div className="home-container">
      <Header />
      <div className="app-container">
        <Sidebar />
        <Switch>
          <Route
            exact
            path={`/home`}
            render={(props) => (
              <Main
                {...props}
                contents={contents}
                posts={posts}
                users={users}
              />
            )}
          />

          <Route
            path={`${path}profile/:uid`}
            render={(props) => (
              <Profile
                {...props}
                contents={contents}
                posts={posts}
                users={users}
              />
            )}
          />

          <Route
            path={`${path}:uid/follow-page`}
            render={(props) => <FollowPage {...props} users={users} />}
          />

          <Route
            path={`${path}barkers`}
            render={(props) => <BarkersPage {...props} users={users} />}
          />
          <Route
            path={`${path}post/:id`}
            render={(props) => (
              <PostPage {...props} contents={contents} users={users} />
            )}
          />

          <Route
            path={`${path}hashtag/:hashtag`}
            render={(props) => <HashtagPage {...props} contents={contents} />}
          />
        </Switch>
      </div>
      <FooterNav />
    </div>
  );
};

export default Home;
