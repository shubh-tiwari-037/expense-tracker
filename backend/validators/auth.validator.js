const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (req, res, next) => {
  const { fullName, email, password } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 3) {
    errors.push("Full name must be at least 3 characters");
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push("A valid email is required");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  next();
};
