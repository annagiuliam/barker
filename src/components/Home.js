import React, { useContext, useEffect, useState } from "react";
import { BarkerContext } from "../context/BarkerContext";
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Profile from "./profile/Profile";
import PostPage from "../components/PostPage";

import firebaseApp from "../firebase/firebase";

const db = firebaseApp.firestore();

const Home = () => {
  const { handleError } = useContext(BarkerContext);
  const { url, path } = useRouteMatch();
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("contents")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) => {
          const fetchedContents = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setContents(fetchedContents);
          // const comments = fetchedContents
          //   .filter((item) => item.type === "comment")
          //   .sort((x, y) => x.timestamp - y.timestamp);

          // setComments(comments);

          const posts = fetchedContents.filter(
            (item) => item.type === "post" || item.type === "rebark"
          );
          setPosts(posts);
          //storeContents(fetchedContents);
        },
        (error) => {
          console.log(error.code);
          handleError(error);
        }
      );

    return () => unsubscribe();
  }, [handleError]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot(
      (snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => {
          return { uid: doc.id, ...doc.data() };
        });
        setUsers(fetchedUsers);
      },
      (error) => {
        console.log(error.code);
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
          {/* <Route path={`/home`} exact component={Main} /> */}
          <Route
            exact
            path={`/home`}
            render={(props) => (
              <Main {...props} contents={contents} posts={posts} />
            )}
          />
          {/* <Route path={`${path}profile/:uid`} component={Profile} /> */}
          <Route
            path={`${path}profile/:uid`}
            render={(props) => (
              <Profile
                {...props}
                contents={contents}
                users={users}
                posts={posts}
              />
            )}
          />
          <Route path={`${path}post/:id`} component={PostPage} />
        </Switch>
      </div>
    </div>
  );
};

export default Home;
