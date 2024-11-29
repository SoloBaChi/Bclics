import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";


// Fetch User Profile
export const getUserProfile = async (req, res) => {
  const  user  = req.user;
  try {
    // const user = mongoose.Types.ObjectId.isValid(query)
    //   ? await User.findById(query).select("-password")
    //   : await User.findOne({ username: query }).select("-password");

    // if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signup
export const signupUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Check if any fields are missing
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!username) missingFields.push("username");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Please fill all fields. Missing: ${missingFields.join(", ")}`,
    });
  }

  try {
    // Check if a user with the given email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists. Please use a different email or username.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Generate a token and set it in a cookie
    generateToken(user._id, res);

    // Send a successful response
    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    // Handle server errors
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if required fields are missing
  if (!username || !password) {
    const missingFields = [];
    if (!username) missingFields.push("username or email");
    if (!password) missingFields.push("password");
    return res.status(400).json({
      message: `Please fill all fields. Missing: ${missingFields.join(", ")}`,
    });
  }

  try {
    // Check if user exists by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or email does not exist." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Generate a token and set it in a cookie
    generateToken(user._id,res);

    // Return the user details (without sensitive information)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle server errors
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("jwt").status(200).json({ message: "Logged out" });
};



// Follow/Unfollow
export const followUnFollowUser = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user._id;

  if (currentUserId.toString() === id)
    return res.status(400).json({ message: "Cannot follow yourself" });

  try {
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(currentUserId);

    if (!userToModify)
      return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      currentUser.following.pull(id);
      userToModify.followers.pull(currentUserId);
    } else {
      currentUser.following.push(id);
      userToModify.followers.push(currentUserId);
    }

    await currentUser.save();
    await userToModify.save();
    res.json({ message: isFollowing ? "Unfollowed" : "Followed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    try {
      if (profilePic) {
        // If there's an existing profilePic, delete it from Cloudinary
        if (user.profilePic) {
          const publicId = user.profilePic.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }

        // Upload the new profilePic
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
      }
    } catch (error) {
      console.error("Error handling profile picture:", error);
      // Handle the error appropriately, e.g., send a response to the client or notify the user
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    // Find all Posts that this User replied and update username and userProfilePic fields
    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );

    // password should be null in respose
    user.password = null;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};
