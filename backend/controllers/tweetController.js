import mongoose from "mongoose";
import {Tweet} from "../models/tweetSchema.js";
import {User} from "../models/userSchema.js";

export const createTweet = async (req, res) => {
  try {
    const {description, id} = req.body;

    if (!description || !id) {
      return res.status(401).json({
        message: "description didn't match",
        success: false,
      });
    }

    await Tweet.create({
      description,
      userId: id,
    });

    return res.status(201).json({
      message: "Tweet created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const {id} = req.params;
    await Tweet.findOneAndDelete(id);
    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    console.log(typeof loggedInUserId);
    const tweetId = req.params.id;
    //jus to know its me
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      console.log("Tweet not fount", tweetId);
      return res.status(404).json({message: "Tweet not found"});
    }

    const likedByUser = tweet.like.some((user) => user.id === loggedInUserId);
    console.log(typeof likedByUser);
    if (likedByUser) {
      //dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: {like: {id: loggedInUserId}},
      });
      return res.status(200).json({
        message: "user disliked your tweet",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: {like: {id: loggedInUserId}},
      });
      return res.status(200).json({
        message: "user liked your tweet",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const likeOrDislike = async (req, res) => {
//   try {
//     const loggedInUserId = req.body;
//     const tweetId = req.params.id;
//     console.log("Tweet ID:", tweetId);
//     const tweet = await Tweet.findById(tweetId);

//     if (!tweet) {
//       console.log("Tweet not found:", tweetId);
//       return res.status(404).json({message: "Tweet not found"});
//     }

//     if (tweet.like.includes(loggedInUserId)) {
//       //dislike
//       await Tweet.findByIdAndUpdate(tweetId, {$pull: {like: loggedInUserId}});
//       return res.status(200).json({
//         message: "user disliked your tweet",
//         success: true,
//       });
//     } else {
//       await Tweet.findByIdAndUpdate(tweetId, {$push: {like: loggedInUserId}});
//       return res.status(200).json({
//         message: "user liked your tweet",
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({message: "Internal server error"});
//   }
// };
