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

    const user = await User.findById(id).select("-password");

    await Tweet.create({
      description,
      userId: id,
      userDetails: user,
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
    await Tweet.findByIdAndDelete(id);
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

export const getAllTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const loggedInUserTweets = await Tweet.find({userId: id});
    console.log(loggedInUserTweets);
    const followingUsersTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({userId: otherUsersId.id});
      })
    );
    return res.status(201).json({
      tweets: loggedInUserTweets.concat(...followingUsersTweet),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedInUser = await User.findById(id);
    const followingUsersTweet = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({userId: otherUsersId.id});
      })
    );
    return res.status(201).json({
      tweets: [].concat(...followingUsersTweet),
    });
  } catch (error) {
    console.log(error);
  }
};
