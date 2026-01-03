// ADMIN: VIEW ALL USERS
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  const users = await User.find().select("-password");
  res.json(users);
});
