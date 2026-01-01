import React from "react";
import type { CollectionEntry } from "astro:content";
import { useStore } from "@nanostores/react";
import { $yearStore } from "~/utils/filterStore.js";
import type { yearType } from "~/utils/filterStore.js";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface RenderCollectionProps {
  collection: CollectionEntry<"diary">[];
  name: string;
}


const AllPosts: React.FC<RenderCollectionProps> = ({ collection, name }) => {
  const postsByMonth = new Map<string, CollectionEntry<"diary">[]>();


  return (
    <div>
      {Array.from(postsByMonth.entries()).map(([month, posts]) => (
        <div key={month}>
          <Typography as="h2" variant="h3" className="text-left pb-1">
            {month}
          </Typography>
          <div className="grid pb-6 gap-2 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => {
              return <RenderPost key={post.slug} name={name} post={post} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};


const RenderCollection: React.FC<RenderCollectionProps> = ({
  collection,
  name,
}) => {
  const filter = useStore($yearStore);
  let data = collection;
  if (filter !== "all") {
    data = getByType({ collection, filter: filter });
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <AnimatePresence mode="wait">
        {filter !== "all" ? (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Mosaic month={filter} name={name} posts={data} />
          </motion.div>
        ) : (
          <motion.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <AllPosts collection={data} name={name} />
          </motion.div>
        )}
      </AnimatePresence>
    )
  );
};

export default RenderCollection;
