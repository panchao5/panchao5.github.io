import tw, { styled } from "twin.macro";

interface CardProps {
  rounded?: boolean;
}

const Card = styled.div<CardProps>(({ rounded = true }) => {
  return [
    tw`p-4`,
    tw`shadow-md bg-white overflow-hidden`,
    rounded && tw`rounded-md`,
  ];
});

export default Card;
