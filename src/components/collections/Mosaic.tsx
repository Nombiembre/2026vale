import type { CollectionEntry } from "astro:content";
import RenderPost from "./Card";


const Mosaic = ({
  name,
  month,
  posts,
}: {
  month: 'enero';
  name: string;
  posts: CollectionEntry<"diary">[];
}) => {
  return (
    <div
      key={month}
      className={`grid pb-6 gap-2 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
    >
      {posts.map((post) => {
        return <RenderPost name={name} post={post} />;
      })}
    </div>
  );
};

export default Mosaic;