// import React, {createRef, useEffect, useRef, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { styled } from "@mui/material/styles";
// import { Box } from "@mui/material";
// import { Tweet } from "../../components";
// import {getTweets, getTweetsNew, handlerBookmark} from "../../redux/tweet/action";
// import {
//   getBookmarksState,
//   getTweetsState, getTweetState,
//   loadingTweetsState,
// } from "../../redux/tweet/selector";
// import Loading from "../../components/Loader/Loading";
// import PropTypes from "prop-types";
// import api, {URLS} from "../../services/API";
//
// const Tweets = ({ bookmarksValue = false }) => {
//   const [tweets, setTweets] = useState({ data: [], page: 0,lastItem:null  });
//   const lastItem = createRef();
//   const observerLoader = useRef();
//   const portion = 2;
//   const totalPages = 3;
//   const getNewPosts = () => {
//     api.get(URLS.TWEET._ROOT, {params: {pageNumber:tweets.page, pageSize:portion}})
//         .then(( data ) => {
//             if(data.length) {
//               setTweets({
//                 data: [...tweets.data, ...data],
//                 page: tweets.page + 1,
//               });
//             }
//         });
//   };
//   // const bookmarksArr = useSelector(getBookmarksState);
//   useEffect(() => {
//     getNewPosts()
//   }, []);
//
//
//   const actionInSight = (entries) => {
//
//     if (entries[0].isIntersecting && tweets.page <= totalPages) {
//       getNewPosts()
//     }
//   };
//
//   //вешаем на последний элемент наблюдателя, когда последний элемент меняется
//   useEffect(() => {
//     if (observerLoader.current) observerLoader.current.disconnect();
//
//     observerLoader.current = new IntersectionObserver(actionInSight);
//     if (lastItem.current) observerLoader.current.observe(lastItem.current);
//   }, [lastItem]);
//
//   return (
//     <BoxWrapper>
//
//       {tweets.data.map((e, i) => {
//         if(i + 1 === tweets.data.length){
//
//           return (
//               <Tweet  key={e.id} tweetInfo={e} ref={lastItem}/>
//           );
//         }
//         return (
//             <Tweet  key={e.id} tweetInfo={e}/>
//         );
//       })}
//     </BoxWrapper>
//   );
// };
//
// const styles = ({ theme }) => ({
//   width: "100%",
// });
//
// const BoxWrapper = styled(Box)(styles);
// Tweets.propTypes = {
//   bookmarksValue: PropTypes.bool,
// };
// export default Tweets;
import React, {createRef, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Tweet } from "../../components";
import {getTweets, getTweetsNew, handlerBookmark} from "../../redux/tweet/action";
import {
  getBookmarksState,
  getTweetsState, getTweetState,
  loadingTweetsState,
} from "../../redux/tweet/selector";
import Loading from "../../components/Loader/Loading";
import PropTypes from "prop-types";

const Tweets = ({ bookmarksValue = false }) => {
  const dispatch = useDispatch();

  // const bookmarksArr = useSelector(getBookmarksState);
  const tweetState = useSelector(getTweetState);
  const mapArr = tweetState.tweets;
  const loadingTweets = useSelector(loadingTweetsState);
  useEffect(() => {
    // dispatch(getTweets());
    dispatch(getTweetsNew())
    // dispatch(handlerBookmark());
  }, []);
  const lastItem = createRef();
  const observerLoader = useRef();

  const actionInSight = (entries) => {

    if (entries[0].isIntersecting && tweetState.pageNumber <= tweetState.totalPages) {
      dispatch(getTweetsNew())
    }
  };

  //вешаем на последний элемент наблюдателя, когда последний элемент меняется
  useEffect(() => {
    console.log(lastItem)
    if (observerLoader.current) observerLoader.current.disconnect();

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) observerLoader.current.observe(lastItem.current);
  }, [lastItem]);

  return (
      <BoxWrapper>
        {loadingTweets && <Loading />}
        {mapArr.length>0&&mapArr.map((e, i) => {

          if(i + 1 === mapArr.length){

            return (
                <Tweet  key={e.id} tweetInfo={e} ref={lastItem}/>
            );
          }
          return (
              <Tweet  key={e.id} tweetInfo={e}/>
          );
        })}
      </BoxWrapper>
  );
};

const styles = ({ theme }) => ({
  width: "100%",
});

const BoxWrapper = styled(Box)(styles);
Tweets.propTypes = {
  bookmarksValue: PropTypes.bool,
};
export default Tweets;
