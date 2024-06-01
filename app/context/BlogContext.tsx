import React, { createContext, useContext, useState } from 'react';
import { BlogPostProps, TagItemProps } from '~/types/BlogTypes';
import { markdownList } from '~/helpers/markdown-list';
import { markdownDetail } from '~/helpers/markdown-detail';

type BlogContextType = {
  blogList: BlogPostProps[];
  blogDetail: BlogPostProps | null;
  tagList: TagItemProps[];
  fetchBlogList: (tagsArray: string[]) => void;
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

  const countTagOccurrences = (posts: BlogPostProps[]): TagItemProps[] => {
    const tagCountMap: Record<string, number> = {};

    posts.forEach((post) => {
      post.frontmatter.tags.forEach((tag) => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCountMap).map(([name, count]) => ({ name, count }));
  };

  const filterPostsByTags = (posts: BlogPostProps[], tagsArray: string[]): BlogPostProps[] => {
    if (tagsArray.length === 0 || tagsArray.includes('All')) {
      return posts;
    }

    return posts.filter((post) => post.frontmatter.tags.some((tag) => tagsArray.includes(tag)));
  };

  const sortTags = (tags: TagItemProps[]): TagItemProps[] => {
    return [...tags].sort((a, b) => a.name.localeCompare(b.name));
  };

  const fetchBlogList = async (tagsArray: string[] = []) => {
    const posts = markdownList('blog');
    const tagCountMap = countTagOccurrences(posts);
    const filteredPosts = filterPostsByTags(posts, tagsArray).sort();

    setBlogList(filteredPosts);
    setTagList(sortTags(tagCountMap));
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
