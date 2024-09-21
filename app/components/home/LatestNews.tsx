import { useEffect, useState } from 'react';
import { MarkdownFile } from '~/types/markdown';
import { getMarkdownList } from '~/helpers/markdown';
import BlogCard from '~/components/blog/BlogCard';
import SectionHeader from '~/components/common/SectionHeader';

const LatestNews = () => {
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);

  const loadFiles = async (page: number) => {
    const { markdownFiles: newFiles } = await getMarkdownList({
      type: 'blog',
      page,
      pageSize: 4,
      sortCondition: 'dateDescending',
    });

    if (page === 1) {
      setMarkdownFiles(newFiles);
    } else {
      setMarkdownFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  useEffect(() => {
    loadFiles(1);
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <SectionHeader title="Latest News" type="h2" center={true} />
      <div className="flex flex-wrap justify-center gap-6 2xl:flex-nowrap 2xl:justify-start">
        {markdownFiles.map((file) => (
          <BlogCard
            key={file.filename}
            file={file.filename}
            image={file.frontmatter.image}
            title={file.frontmatter.title}
            date={file.frontmatter.date}
            description={file.description}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
