import type { MetadataRoute } from "next";
import { homepageUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: homepageUrl
    }
  ];
}
