import "twin.macro";
import { graphql, Link } from "gatsby";
import Tag from "@/components/tag";
import { CalendarIcon } from "@/components/icons";
import Card from "@/components/card";

export interface PreviewPost {
  slug: string;
  title: string;
  draft?: boolean;
  tags: Array<{ name: string; slug: string }>;
  date?: string;
  description?: string;
  excerpt: string;
}

export interface PostPreviewProps {
  className?: string;
  post: PreviewPost;
}

const PostPreviewCard = ({ className, post }: PostPreviewProps) => {
  const description = post.description ?? post.excerpt;
  const showTags = post.tags && post.tags.length > 0;

  return (
    <Card as="article" className={className}>
      <header tw="mb-2 ">
        <div tw="space-x-2">
          <h4 tw="inline-block font-medium text-lg">
            <Link tw="styled-underline" to={`/post/${post.slug}`}>
              {post.title}
            </Link>
          </h4>
          {post.draft && (
            <span tw="px-2 text-sm rounded-sm bg-warning-200 bg-opacity-70">
              🚧 work in progress
            </span>
          )}
        </div>
        <div tw="text-gray-400 text-sm">
          <span tw="inline-flex items-center">
            <CalendarIcon tw="mr-1" />
            {post.date}
          </span>
        </div>
      </header>

      <p tw="leading-7 mt-2 mb-4">{description}</p>

      {showTags && (
        <footer tw="space-x-2">
          {post.tags.map((tag) => (
            <Link key={tag.slug} to={`/posts/${tag.slug}`}>
              <Tag tag={tag.name} />
            </Link>
          ))}
        </footer>
      )}
    </Card>
  );
};

export default PostPreviewCard;

export const postPreviewFragment = graphql`
  fragment PostPreview on Post {
    slug
    title
    draft
    tags {
      name
      slug
    }
    date(formatString: "YYYY-MM-DD HH:mm")
    description
    excerpt
  }
`;
