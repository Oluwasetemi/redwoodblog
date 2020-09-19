import BlogPostCell from 'src/components/BlogPostCell'
import BlogLayout from 'src/layouts/BlogLayout'

const BlogPostPage = ({ id }) => {
  return (
    <BlogLayout>
      <BlogPostCell id={id} rand={Math.random()} />
    </BlogLayout>
  )
}

export default BlogPostPage
