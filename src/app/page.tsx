import { clientConfig } from "@/lib/server/config";

// import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
// import Pagination from "@/components/Pagination";
import { getAllPosts } from "@/lib/notion";
// import { useConfig } from '@/lib/config'

// export async function getStaticProps() {
//   const posts = await getAllPosts({ includePages: false });
//   const postsToShow = posts.slice(0, clientConfig.postsPerPage);
//   const totalPosts = posts.length;
//   const showNext = totalPosts > clientConfig.postsPerPage;
//   return {
//     props: {
//       page: 1, // current page is 1
//       postsToShow,
//       showNext,
//     },
//     revalidate: 1,
//   };
// }

export default async function Blog() {
  // const { title, description } = useConfig()
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, clientConfig.postsPerPage);
  const totalPosts = posts.length;
  // const showNext = totalPosts > clientConfig.postsPerPage;

  return (
    <>
      {/* <Container title={title} description={description}> */}
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      {/* {showNext && <Pagination page={page} showNext={showNext} />} */}

      {/* </Container> */}
    </>
  );
}
