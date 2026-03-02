import { MetadataRoute } from "next";
import { posts } from "./blog/data";

const BASE = "https://thevoiceofcash.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/consultation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...blogUrls,
    // Additional service pages
    { url: `${BASE}/services/ai-internal-knowledge-base`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-contract-proposal-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-hiring-recruitment-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-content-seo-engine`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-client-onboarding-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-referral-program-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-churn-prediction-retention`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-event-webinar-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-inventory-ordering-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-financial-close-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-multi-location-management`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-training-course-delivery`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-personalization-engine`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-pr-media-monitoring`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-lead-nurture-reactivation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-chatbot-website`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-voice-agent-conversational`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-google-ads-optimization`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-document-processing-ocr`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-real-estate-lead-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-ecommerce-catalog-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-healthcare-patient-communication`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE}/services/ai-legal-document-automation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
  ];
}
