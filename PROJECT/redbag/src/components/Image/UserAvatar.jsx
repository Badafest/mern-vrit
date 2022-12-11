import Avatar from "./Avatar";
import ClippedImg from "./ClippedImage";

export default function UserAvatar({ user, size }) {
  return user.avatar && user.avatar.length ? (
    <ClippedImg
      src={user.avatar}
      width={`${size}px`}
      radius={`${size / 2}px`}
      alt={user.username}
    />
  ) : (
    <Avatar size={size} initial={user.username[0].toUpperCase()} />
  );
}
