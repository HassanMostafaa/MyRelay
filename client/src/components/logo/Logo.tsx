import Image from "next/image";
import LogoLarge from "@/public/brand/logo-large.png";
import LogoSmall from "@/public/brand/logo-small.png";
import Link from "next/link";
import { getLocale } from "next-intl/server";

const logoVariants = [
  {
    src: LogoSmall,
    className: "h-auto w-12 md:hidden",
    sizes: "112px",
  },
  {
    src: LogoLarge,
    className: "hidden h-auto md:block md:w-32 lg:w-44",
    sizes: "(max-width: 1024px) 144px, 192px",
  },
];

export const Logo = async () => {
  const locale = await getLocale();

  return (
    <Link href={`/${locale}`}>
      {logoVariants.map(({ src, className, sizes }) => (
        <Image
          key={src.src}
          src={src}
          alt="Logo"
          priority
          className={className}
          sizes={sizes}
        />
      ))}
    </Link>
  );
};
