import Image from "next/image";

type AvatarImageProps = {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
};

export const AvatarImage = ({
  src = "https://placehold.co/400x400/000000/FFFFFF.png",
  alt = "User avatar",
  size = 100,
  className,
}: AvatarImageProps) => {
  return (
    <div
      className={`relative border border-border shrink-0 overflow-hidden ${className || ""}`}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} />
    </div>
  );
};
