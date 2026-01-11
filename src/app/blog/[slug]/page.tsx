import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// This is a placeholder page for individual blog posts
// In production, you'd fetch the post content from a CMS or database

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-dark-950 light:bg-slate-50 pt-24 pb-16">
      <article className="section-container max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Placeholder content */}
        <div className="prose prose-invert light:prose-slate max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-white light:text-slate-900 mb-4">
            Blog Post: {params.slug}
          </h1>
          
          <div className="bg-dark-900/50 light:bg-white border border-dark-800 light:border-slate-200 rounded-xl p-8 text-center">
            <p className="text-dark-400 light:text-slate-600 mb-4">
              This is a placeholder for the blog post content.
            </p>
            <p className="text-dark-500 light:text-slate-500 text-sm">
              To add real blog content, integrate with a CMS like:
            </p>
            <ul className="text-dark-400 light:text-slate-600 text-sm mt-2 space-y-1">
              <li>• Contentful</li>
              <li>• Sanity</li>
              <li>• Notion API</li>
              <li>• MDX files</li>
              <li>• Strapi</li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  )
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In production, fetch the actual post title
  const title = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return {
    title: `${title} | Blog | Prof. Emmanuel Inambao`,
    description: `Read ${title} on the blog of Professor Emmanuel Inambao.`,
  }
}
