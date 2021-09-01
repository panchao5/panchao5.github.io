import tw, { styled, TwStyle } from "twin.macro";

type Variant = "filled" | "outline";

interface TagProps {
  className?: string;
  tag: string;
  variant?: Variant;
}

const Tag = (props: TagProps) => (
  <span className={props.className}># {props.tag}</span>
);

const variants: Record<Variant, TwStyle> = {
  filled: tw`text-white bg-gray-400 bg-opacity-70`,
  outline: tw`text-current border-gray-400 border`,
};

const StyledTag = styled(Tag)([
  tw`inline-block px-2.5 py-0.5 rounded-full text-sm`,
  ({ variant = "filled" }) => variants[variant],
]);

export default StyledTag;
