import cn from "classnames";
import { createHash } from "crypto";
import Post from "@/components/Post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";
import ScrollTop from "./components/ScrollTop";
import Container from "@/components/Container";
import BackButton from "./components/BackButton";
import { getBlogConfig } from "@/lib/server/config";
import { getAllPosts, getPostBlocks } from "@/lib/notion";

export const revalidate = 1; // Revalidate every second

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { slug } = await params;
  const blogConfig = getBlogConfig(); // Load config on server side
  const posts = await getAllPosts({ includePages: true });
  const post = posts.find((t) => t.slug === slug);

  const url = blogConfig.path.length
    ? `${blogConfig.link}/${blogConfig.path}`
    : blogConfig.link;

  return {
    description: post.summary,
    openGraph: {
      type: "article",
      url: post.slug ? `${url}/${post.slug}` : url,
      title: post.title,
      description: post.summary,
      images: `${blogConfig.ogImageGenerateURL}/${encodeURIComponent(
        post.title
      )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`,
    },
    twitter: {
      card: "summary_large_image",
      description: post.summary,
      title: post.title,
      images: `${blogConfig.ogImageGenerateURL}/${encodeURIComponent(
        post.title
      )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`,
    },
    other: {
      "article:published_time": post.date,
      "article:author": blogConfig.author,
    },
  };
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const blogConfig = getBlogConfig(); // Load config on server side
  const { slug } = await params;

  const posts = await getAllPosts({ includePages: true });

  const post = posts.find((t) => t.slug === slug);

  if (!post) notFound();

  const blockMap = await getPostBlocks(post.id);
  const emailHash = createHash("md5")
    .update(blogConfig.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  const fullWidth = post.fullWidth ?? false;

  return (
    // <Container
    //   layout="blog"
    //   title={post.title}
    //   description={post.summary}
    //   slug={post.slug}
    //   // date={new Date(post.publishedAt).toISOString()}
    //   type="article"
    //   fullWidth={fullWidth}
    // >
    <>
      <Post
        post={post}
        blockMap={blockMap}
        emailHash={emailHash}
        fullWidth={fullWidth}
      />

      {/* Back and Top */}
      <div
        className={cn(
          "px-4 flex justify-between font-medium text-gray-500 dark:text-gray-400 my-5",
          fullWidth ? "md:px-24" : "mx-auto max-w-2xl"
        )}
      >
        <BackButton />
        <ScrollTop />
      </div>

      <Comments frontMatter={post} />
    </>
    // </Container>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const blogConfig = getBlogConfig(); // Load config on server side
  const posts = await getAllPosts({ includePages: true });
  const slug = posts.map((row) => `${blogConfig.path}/${row.slug}`);
  //   console.log("@@posts in generateStaticParams@@", slug);

  return slug.map((s) => ({
    slug: s,
  }));
}
