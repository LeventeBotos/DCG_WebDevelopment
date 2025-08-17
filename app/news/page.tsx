"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { FuturisticButton } from "@/components/futuristic-button";
import FuturisticSection from "@/components/futuristic-section";
import FuturisticHeading from "@/components/futuristic-heading";

export default function NewsPage() {
  const featuredNews = {
    title: "DCG Launches Revolutionary AI Platform for Industry 4.0",
    excerpt:
      "Our latest platform integrates smart machines, digital twins, and advanced AI to transform traditional manufacturing processes.",
    date: "2024-01-15",
    author: "DCG Team",
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=600",
    category: "Product Launch",
  };

  const newsArticles = [
    {
      title: "The Future of Data Centralization in Enterprise",
      excerpt:
        "Exploring how modern data platforms are revolutionizing enterprise data management and analytics.",
      date: "2024-01-10",
      author: "Dr. Alex Johnson",
      readTime: "4 min read",
      image: "/placeholder.svg?height=200&width=300",
      category: "Technology",
      delay: 0.1,
    },
    {
      title: "Machine Learning Advances in Energy Sector",
      excerpt:
        "How ML algorithms are optimizing energy production and reducing operational costs across the industry.",
      date: "2024-01-08",
      author: "Sarah Williams",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=300",
      category: "Industry Insights",
      delay: 0.2,
    },
    {
      title: "Digital Twins: Transforming Manufacturing Operations",
      excerpt:
        "The impact of digital twin technology on predictive maintenance and operational efficiency.",
      date: "2024-01-05",
      author: "Michael Chen",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=300",
      category: "Innovation",
      delay: 0.3,
    },
    {
      title: "Cloud Operations: Multi-Platform Strategy Success",
      excerpt:
        "Best practices for implementing multi-cloud strategies with Azure, AWS, and Google Cloud Platform.",
      date: "2024-01-03",
      author: "DCG Team",
      readTime: "7 min read",
      image: "/placeholder.svg?height=200&width=300",
      category: "Cloud",
      delay: 0.4,
    },
    {
      title: "Generative AI and RAGs in Enterprise Applications",
      excerpt:
        "How Retrieval-Augmented Generation is changing the landscape of enterprise AI applications.",
      date: "2023-12-28",
      author: "Dr. Alex Johnson",
      readTime: "8 min read",
      image: "/placeholder.svg?height=200&width=300",
      category: "AI Research",
      delay: 0.5,
    },
    {
      title: "Banking Sector Embraces Advanced Analytics",
      excerpt:
        "Financial institutions are leveraging AI for fraud detection and risk assessment with remarkable results.",
      date: "2023-12-25",
      author: "Sarah Williams",
      readTime: "4 min read",
      image: "/placeholder.svg?height=200&width=300",
      category: "Finance",
      delay: 0.6,
    },
  ];

  const categories = [
    "All",
    "Technology",
    "Industry Insights",
    "Innovation",
    "Cloud",
    "AI Research",
    "Finance",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <FuturisticSection
        className="py-24 md:py-32"
        withBlobs
        blobConfig={{
          topRight: true,
          bottomLeft: true,
          colors: ["#003366", "#006644"],
        }}
      >
        <FuturisticHeading
          title="News & Insights"
          description="Stay updated with the latest developments in AI, data science, and digital transformation."
          align="center"
          withGradient
        />
      </FuturisticSection>

      {/* Featured Article Section */}
      <FuturisticSection className="py-16 bg-slate-50/50 backdrop-blur-sm">
        <FuturisticHeading title="Featured Story" align="center" />

        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={featuredNews.image || "/placeholder.svg"}
                alt={featuredNews.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-white rounded-full mb-3">
                  {featuredNews.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {featuredNews.title}
                </h2>
                <p className="text-white/80 mb-4">{featuredNews.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredNews.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredNews.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredNews.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </FuturisticSection>

      {/* Categories Filter */}
      <FuturisticSection className="py-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className="px-4 py-2 text-sm font-medium rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </FuturisticSection>

      {/* News Articles Grid */}
      <FuturisticSection
        withBlobs
        blobConfig={{
          topLeft: true,
          bottomRight: true,
          colors: ["#003366", "#006644"],
        }}
      >
        <FuturisticHeading
          title="Latest Articles"
          description="Insights from our experts on the latest trends and innovations in technology."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <motion.div
              key={article.title}
              className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: article.delay }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-primary text-white rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {article.author}
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-30" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <FuturisticButton
            className="group"
            icon={
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            }
            iconPosition="right"
          >
            <Link href="#">Load More Articles</Link>
          </FuturisticButton>
        </div>
      </FuturisticSection>

      {/* Newsletter Section */}
      <FuturisticSection className="py-20 bg-slate-50/50 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 shadow-sm">
          <FuturisticHeading
            title="Stay Informed"
            description="Subscribe to our newsletter for the latest insights on AI, data science, and industry trends."
            align="center"
          />

          <motion.form
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-12 w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:flex-1"
              required
            />
            <FuturisticButton type="submit" className="w-full sm:w-auto">
              Subscribe
            </FuturisticButton>
          </motion.form>

          <motion.p
            className="mt-4 text-center text-xs text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </motion.p>
        </div>
      </FuturisticSection>
    </div>
  );
}
