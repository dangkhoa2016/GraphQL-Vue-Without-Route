export const isProUser = (user) => {
  return user && user.likes_count >= 5000;
};

export const defaultImage = 'https://placehold.co/300?text=Avatar';
