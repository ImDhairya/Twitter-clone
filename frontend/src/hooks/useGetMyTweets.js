import axios from "axios";
import {TWEET_API_END_POINT} from "../utils/constant";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getMyProfile} from "../redux/userSlice";
import {getAllTweets} from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyTweets = async () => {
      try {
        const res = await axios.put(`${TWEET_API_END_POINT}alltweets/${id}`, {
          withCredentials: true,
        });
        dispatch(getAllTweets(res.data.tweets));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyTweets();
  }, [id]);
};

export default useGetMyTweets;
