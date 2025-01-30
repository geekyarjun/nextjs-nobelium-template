import { clientConfig } from "@/lib/server/config";

// import { useRouter } from "next/router";
import cn from "classnames";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
// import { useLocale } from "@/lib/locale";
// import { useConfig } from "@/lib/config";
import { createHash } from "crypto";
import Container from "@/components/Container";
import Post from "@/components/Post";
import Comments from "@/components/Comments";
import BackButton from "./components/BackButton";
import ScrollTop from "./components/ScrollTop";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts = await getAllPosts({ includePages: true });

  const post = posts.find((t) => t.slug === slug);

  //   const router = useRouter();

  if (!post) notFound();

  const blockMap = await getPostBlocks(post.id);
  const emailHash = createHash("md5")
    .update(clientConfig.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  // TODO: It would be better to render something
  //   if (router.isFallback) return null;

  const fullWidth = post.fullWidth ?? false;

  //   return (
  //     <div>
  //       <p>Hello World</p>
  //     </div>
  //   );

  return (
    <Container
      layout="blog"
      title={post.title}
      description={post.summary}
      slug={post.slug}
      // date={new Date(post.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
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
    </Container>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const posts = await getAllPosts({ includePages: true });
//   const slug = posts.map((row) => `${clientConfig.path}/${row.slug}`);
//   //   console.log("@@posts in generateStaticParams@@", slug);

//   return {
//     slug,
//   };
// }

// export async function getStaticPaths() {
//   const posts = await getAllPosts({ includePages: true });
//   return {
//     paths: posts.map((row) => `${clientConfig.path}/${row.slug}`),
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const posts = await getAllPosts({ includePages: true });
//   const post = posts.find((t) => t.slug === slug);

//   if (!post) return { notFound: true };

//   const blockMap = await getPostBlocks(post.id);
//   const emailHash = createHash("md5")
//     .update(clientConfig.email)
//     .digest("hex")
//     .trim()
//     .toLowerCase();

//   return {
//     props: { post, blockMap, emailHash },
//     revalidate: 1,
//   };
// }
