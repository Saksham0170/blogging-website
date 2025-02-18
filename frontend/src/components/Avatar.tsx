interface AvatarProps {
  name: string;
  size?: number; // Optional size prop (default value can be set)
}

const Avatar = ({ name, size = 24 }: AvatarProps) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      style={{ width: size, height: size }}
    >
      <span className="font-small text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
};

export default Avatar;
