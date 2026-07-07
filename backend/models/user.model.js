import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
   fullName: {
  type: String,
  required: function () {
    return this.provider === "local";
  },
  minlength: 3,
  maxlength: 50,
 
},
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

   password: {
  type: String,
  required: function () {
    return this.provider === "local";
  },
},
 provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
    },
    
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },

    subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    default: null,
},

    refreshToken: {
  type: String,

},
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("User", userSchema);