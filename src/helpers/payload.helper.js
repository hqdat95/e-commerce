const payload = (user) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export default payload;
