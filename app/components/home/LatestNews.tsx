import { useEffect, useState } from 'react';
import PostCard from '~/components/blog/PostCard';
import SectionHeader from '~/components/common/SectionHeader';
import { ContentItem } from '~/types/content';

const LatestNews = () => {
  const [blogPosts, setBlogPosts] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const type = 'blog';
  const offset = 0;
  const limit = 4;
  const sort = 'dateDescending';

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/getFiles?type=${type}&offset=${offset}&limit=${limit}&sort=${sort}`,
        );

        if (!response.ok) new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json() as { results: ContentItem[] };
        setBlogPosts(data.results);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <SectionHeader title="Latest News" type="h2" center={true} />
      <div className="flex flex-wrap justify-center gap-6 2xl:flex-nowrap 2xl:justify-start">
        {blogPosts.map((file) => (
          <PostCard
            key={file.filename}
            file={file.filename}
            image={file.meta.image}
            title={file.meta.title}
            date={file.meta.date}
            description={file.content}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
