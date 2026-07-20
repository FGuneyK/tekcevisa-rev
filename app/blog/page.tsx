"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import { ConsultationCTA } from "@/components/ConsultationCTA";

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header */}
      <section className="relative h-[70vh] sm:h-[80vh] flex flex-col justify-end pb-24 pt-48 bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?q=80&w=2000&auto=format&fit=crop"
            alt="TEKCE Visa Insights"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-[5vw] lg:px-10 w-full">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight text-white mb-6 drop-shadow-sm">
              Insights & Intelligence
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl drop-shadow-sm">
              Expert perspectives on global mobility, strategic residency planning, and prime real estate investments.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-12">Featured Story</div>
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-neutral-400 font-medium mb-6">
                  <span className="text-accent">{featuredPost.category}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-200" />
                  <span>{featuredPost.date}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-black mb-6 leading-[1.1] group-hover:text-accent transition-colors duration-500">
                  {featuredPost.title}
                </h2>
                <p className="text-neutral-500 text-lg font-light leading-relaxed mb-10">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={featuredPost.author.image} alt={featuredPost.author.name} className="w-12 h-12 rounded-full bg-neutral-100 object-cover object-top border border-neutral-200" />
                    <div>
                      <div className="text-sm font-medium text-black">{featuredPost.author.name}</div>
                      <div className="text-[11px] text-neutral-400">{featuredPost.author.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:text-accent transition-colors">
                    Read article <MoveRight size={16} />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-video w-full overflow-hidden bg-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24 bg-[#fcfcfc]">
        <div className="max-w-[1600px] mx-auto px-[5vw] lg:px-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-12">Latest Articles</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {otherPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                <div className="aspect-[3/2] overflow-hidden bg-neutral-100 mb-6 shadow-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-neutral-400 font-medium mb-4">
                  <span className="text-accent">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-200" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-serif text-black leading-snug mb-4 group-hover:text-accent transition-colors duration-500">
                  {post.title}
                </h3>
                <p className="text-neutral-500 text-[15px] font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA consultant={1} />
    </div>
  );
}
