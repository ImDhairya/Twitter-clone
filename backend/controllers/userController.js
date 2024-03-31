import {User} from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Tweet} from "../models/tweetSchema.js";
export const Register = async (req, res) => {
  try {
    const {name, username, email, password} = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({email});

    if (user) {
      return res.status(400).json({
        message: "User Already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Accound created successfully ",
      success: true,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({email});
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "User doesnot exists ",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = await jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {expiresIn: "1d", httpOnly: true})
      .json({
        messagee: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
    message: "User logged out successfulluy",
    success: true,
  });
};

export const bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const user = await User.findById(loggedInUserId);

    if (!user) {
      console.log("Tweet not fount", tweetId);
      return res.status(404).json({message: "User not found"});
    }

    const bookmarkedByUser = user.bookmarks.some(
      (user) => user.id === loggedInUserId
    );
    if (bookmarkedByUser) {
      //dislike
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: {bookmarks: {id: loggedInUserId}},
      });
      return res.status(200).json({
        message: "user bookmark removed",
        success: true,
      });
    } else {
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: {bookmarks: {id: loggedInUserId}},
      });
      return res.status(200).json({
        message: "user bookmark added",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");
    return res.status(201).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const {id} = req.params;
    const otherUsers = await User.find({_id: {$ne: id}}).select("-password");
    if (!otherUsers) {
      return res.status(401).json({
        message: "Currently do not have any users",
      });
    }

    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

/* 
export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const userId = req.body.id;

    const loggedInUser = await User.findById(loggedInUserId);

    const user = await User.findById(userId);

    if (!user || !loggedInUser) {
      console.log("  all ids not fount");
      return res.status(404).json({message: "User not found"});
    }
    // add the following to logged in user
    const following = loggedInUser.following.some((user) => user.id === userId); // yes loggedinuser follows user

    if (following) {
      //code for unfollowing
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: {following: {id: userId}},
      });

      await User.findByIdAndUpdate(userId, {
        $pull: {followers: {id: loggedInUserId}},
      });
      return res.status(200).json({
        message: `user following removed`,
        success: true,
      });
    } else {
      // for following
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: {following: {id: userId}},
      });

      await User.findByIdAndUpdate(userId, {
        $push: {followers: {id: loggedInUserId}},
      });

      return res.status(200).json({
        message: "user follower added",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
*/

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const userId = req.body.id;

    const loggedInUser = await User.findById(loggedInUserId);

    const user = await User.findById(userId);

    if (!user || !loggedInUser) {
      console.log("  all ids not fount");
      return res.status(404).json({message: "User not found"});
    }
    // add the following to logged in user
    const following = loggedInUser.following.some((user) => user.id === userId); // yes loggedinuser follows user

    if (following) {
      //code for unfollowing
      return res.status(200).json({
        message: `user already follows`,
        success: true,
      });
    } else {
      // for following
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: {following: {id: userId}},
      });

      await User.findByIdAndUpdate(userId, {
        $push: {followers: {id: loggedInUserId}},
      });

      return res.status(200).json({
        message: "user follower added",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const userId = req.body.id;

    const loggedInUser = await User.findById(loggedInUserId);

    const user = await User.findById(userId);

    if (!user || !loggedInUser) {
      console.log("  all ids not found");
      return res.status(404).json({message: "User not found"});
    }
    // add the following to logged in user
    const following = loggedInUser.following.some((user) => user.id === userId); // yes loggedinuser follows user

    if (following) {
      //code for unfollowing
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: {following: {id: userId}},
      });

      await User.findByIdAndUpdate(userId, {
        $pull: {followers: {id: loggedInUserId}},
      });
      return res.status(200).json({
        message: `user following removed`,
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "user not followed",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
