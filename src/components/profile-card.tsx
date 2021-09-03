import "twin.macro";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage, getImage } from "gatsby-plugin-image";
import useSiteMetadata from "@/hooks/use-site-metadata";
import Card from "@/components/card";
import Avatar from "@/components/avatar";
import Statistic from "@/components/statistic";
import SocialLogo from "@/components/social-logo";

function useStatistics() {
  const data = useStaticQuery<{
    allPost: { totalCount: number; group: Array<{ fieldValue: string }> };
    latestPost: { nodes: Array<{ date: string }> };
  }>(graphql`
    query StatisticsQuery {
      allPost {
        totalCount
        group(field: tags___name) {
          fieldValue
        }
      }
      latestPost: allPost(sort: { fields: [date], order: DESC }, limit: 1) {
        nodes {
          date
        }
      }
    }
  `);

  const postsCount = data.allPost.totalCount;
  const tagsCount = data.allPost.group.length;

  return {
    postsCount,
    tagsCount,
  };
}

interface ProfileCardProps {
  className?: string;
}

const ProfileCard = ({ className }: ProfileCardProps) => {
  const siteMetadata = useSiteMetadata();
  const { postsCount, tagsCount } = useStatistics();
  const avatarImage = getImage(siteMetadata.authorAvatar);

  return (
    <Card className={className} tw="mx-2 p-0 max-w-[320px] min-w-[288px]">
      <div tw="aspect-w-16 aspect-h-12">
        <div>
          <StaticImage
            src="../images/profile-card-bg.jpg"
            alt=""
            tw="absolute top-0 left-0 right-0"
            placeholder="blurred"
            aspectRatio={16 / 9}
            width={320}
          ></StaticImage>
          <div tw="absolute left-1/2 ml-[-54px] bottom-[25%] mb-[-54px]">
            {avatarImage && (
              <Avatar
                image={avatarImage}
                alt={siteMetadata.author}
                size={108}
              />
            )}
          </div>
        </div>
      </div>
      <div tw="mt-2 px-4 text-center">
        <span tw="font-light text-xl">{siteMetadata.author}</span>
        <p tw="text-gray-500 mt-2 text-sm">{siteMetadata.authorBio}</p>
        <div tw="flex mt-4 justify-center flex-wrap space-x-4">
          {siteMetadata.socialLinks?.map((socialLink) => {
            return (
              <a href={socialLink.link} key={socialLink.name}>
                <SocialLogo name={socialLink.name} />
              </a>
            );
          })}
        </div>
      </div>

      <div tw="p-4">
        <div tw="py-4 flex text-center divide-x --tw-divide-x-reverse[0.1]">
          <Statistic tw="flex-1 w-1/2" title="博文数" value={postsCount} />
          <Statistic tw="flex-1 w-1/2" title="标记数" value={tagsCount} />
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
