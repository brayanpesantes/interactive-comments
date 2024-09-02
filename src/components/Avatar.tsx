interface AvatarProps {
  image: string;
  username: string;
}

export default function Avatar({ image, username }: AvatarProps) {
  return (
    <img
      src={image}
      alt={username}
      className="size-10 rounded-full
  "
    />
  );
}
