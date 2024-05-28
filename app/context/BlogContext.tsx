import React, { createContext, useContext, useState } from 'react';
import { BlogPostProps, TagItemProps } from '~/types/BlogTypes';
import { markdownList } from '~/helpers/markdown-list';
import { markdownDetail } from '~/helpers/markdown-detail';

type BlogContextType = {
  blogList: BlogPostProps[];
  blogDetail: BlogPostProps | null;
  tagList: TagItemProps[];
  fetchBlogList: () => void;
  fetchBlogDetail: (slug: string) => void;
};

const BlogContext = createContext<BlogContextType>({
  blogList: [],
  blogDetail: null,
  tagList: [],
  fetchBlogList: () => {},
  fetchBlogDetail: () => {},
});

export const useBlogData = () => useContext(BlogContext);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [blogList, setBlogList] = useState<BlogPostProps[]>([]);
  const [blogDetail, setBlogDetail] = useState<BlogPostProps | null>(null);
  const [tagList, setTagList] = useState<TagItemProps[]>([]);

  const fetchBlogList = async () => {
    const posts = markdownList('blog');
    const tagCountMap: TagItemProps[] = [];

    posts.forEach((item: BlogPostProps) => {
      item.frontmatter.tags.forEach((tag: string) => {
        const existingTag = tagCountMap.find((t) => t.name === tag);
        if (existingTag) {
          existingTag.count += 1;
        } else {
          tagCountMap.push({ name: tag, count: 1 });
        }
      });
    });

    tagCountMap.sort((a, b) => a.name.localeCompare(b.name));
    setTagList(tagCountMap);
    setBlogList(posts);
    setBlogDetail(null);
  };

  const fetchBlogDetail = async (slug: string) => {
    const singlePost = markdownDetail(slug);
    setBlogDetail(singlePost);
  };

  return (
    <BlogContext.Provider value={{ blogList, blogDetail, tagList, fetchBlogList, fetchBlogDetail }}>
      {children}
    </BlogContext.Provider>
  );
};
