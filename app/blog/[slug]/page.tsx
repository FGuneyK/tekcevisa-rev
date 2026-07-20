import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";
import { ConsultationCTA } from "@/components/ConsultationCTA";

// Static params for dynamic routing at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Cover Image */}
      <section className="relative h-[70vh] sm:h-[80vh] flex flex-col justify-end pb-16 pt-40 bg-black">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 max-w-[1000px] mx-auto px-[5vw] lg:px-10 w-full text-center mt-12">
          <div className="flex items-center justify-center gap-4 text-[11px] uppercase tracking-wider text-white/80 font-medium mb-6">
            <span className="text-accent">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8 drop-shadow-sm">
            {post.title}
          </h1>
          
          <p className="text-neutral-200 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-10 drop-shadow-sm">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-center gap-4">
            <img 
              src={post.author.image} 
              alt={post.author.name} 
              className="w-12 h-12 rounded-full bg-white/10 object-cover object-top border border-white/20 backdrop-blur-sm" 
            />
            <div className="text-left">
              <div className="text-sm font-medium text-white">{post.author.name}</div>
              <div className="text-[11px] text-white/70">{post.author.title}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-[5vw] lg:px-10">
          <div
            className="prose prose-lg prose-neutral max-w-none font-light leading-loose text-neutral-600
              prose-headings:font-serif prose-headings:font-normal prose-headings:text-black 
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
              prose-p:mb-8
              prose-blockquote:border-l-2 prose-blockquote:border-accent prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-serif prose-blockquote:leading-relaxed prose-blockquote:text-black prose-blockquote:my-12
              prose-ul:my-8 prose-li:mb-2
              prose-strong:font-medium prose-strong:text-black"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 pt-10 border-t border-neutral-100 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Share this article</div>
            <div className="flex items-center gap-6">
              <button className="text-sm text-neutral-400 hover:text-black transition-colors">LinkedIn</button>
              <button className="text-sm text-neutral-400 hover:text-black transition-colors">Twitter</button>
              <button className="text-sm text-neutral-400 hover:text-black transition-colors">Email</button>
            </div>
          </div>
        </div>
      </article>

      <ConsultationCTA consultant={post.author.id} />
    </div>
  );
}
