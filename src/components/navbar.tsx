import tw from "twin.macro";

interface NavbarProps {
  className?: string;
  siteTitle: string;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav
      className={props.className}
      css={tw`flex items-center h-12 text-primary-500 bg-gray-700`}
    >
      <h2 css={tw`ml-2 text-xl`}>{props.siteTitle}</h2>
    </nav>
  );
};

export default Navbar;
