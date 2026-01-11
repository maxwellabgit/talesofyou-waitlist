import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
}

export function getAllBlogPosts(): BlogPostMeta[] {
  // Ensure directory exists
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || 'General',
        readTime: data.readTime || '5 min read',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPost(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    date: data.date || '',
    category: data.category || 'General',
    readTime: data.readTime || '5 min read',
    content,
  }
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

