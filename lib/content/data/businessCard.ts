/**
 * Floating Business Card content (spec §8.9, Task 14.1).
 *
 * Promotion and card-specific TBD inputs were confirmed by the owner:
 * - promoted: yes
 * - tagline: Lead Full Stack Web Developer (CV About Me + current role)
 * - resume: the existing `/resume.pdf`
 * - profile picture: the Contact section avatar, `/contact-avatar.png`
 *
 * Shared identity and contact values are referenced from their source modules
 * so the future drawer cannot drift from the public Profile, Contact, or
 * Resume data. This task defines data only; the drawer UI belongs to Task 14.2.
 */

import { contact } from "./contact";
import { profile } from "./profile";
import { resume } from "./resume";
import type { BusinessCard } from "../types";
import { validateBusinessCard } from "../validate";

const businessCardData = {
  isPromoted: true,
  name: profile.name,
  title: profile.title,
  shortTagline: "Lead Full Stack Web Developer",
  email: contact.email,
  linkedIn: contact.linkedIn,
  resumeLink: resume.publicUrl,
  profileImage: "/contact-avatar.png",
  phone: contact.phone,
} as const;

export const businessCard: BusinessCard = validateBusinessCard(businessCardData);
