import tw from "twin.macro";
import { Link } from "gatsby";

interface NavbarProps {
  className?: string;
  siteTitle: string;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav
      className={props.className}
      css={tw`flex px-2 items-center h-12 text-white bg-gray-700 shadow-md`}
    >
      <h2 css={tw`ml-2 text-xl`}>{props.siteTitle}</h2>
      <div tw="flex-1"></div>
      <div tw="md:space-x-2 lg:space-x-8 font-semibold">
        <Link tw="hover:styled-underline" to="/">
          Home
        </Link>
        <Link tw="hover:styled-underline" to="/">
          归档
        </Link>
        <Link tw="hover:styled-underline" to="/">
          标签
        </Link>
        <Link tw="hover:styled-underline" to="/">
          关于
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
