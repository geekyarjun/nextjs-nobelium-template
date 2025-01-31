import BlogPost from "@/components/BlogPost";
import Pagination from "@/components/Pagination";
import { getAllPosts } from "@/lib/notion";
import { getBlogConfig } from "@/lib/server/config";

export const revalidate = 1; // Revalidate every second

export default async function Blog() {
  const blogConfig = getBlogConfig();
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, blogConfig.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > blogConfig.postsPerPage;
  const page = 1;

  return (
    <>
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </>
  );
}
