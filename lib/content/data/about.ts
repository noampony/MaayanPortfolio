/**
 * About section content (spec §8.2).
 *
 * `professionalSummary`, `education` and `furtherEducation` are sourced from the
 * owner's CV ("Shani Penkar - CV"): the About-Me paragraph, the current role at
 * Kiloma Advanced Solutions, the B.Sc. entry (institution, 2019-2023, Dean's List,
 * GPA 85) and the Udemy web-development bootcamp (2023). The CV gives years only -
 * no months - so `dateRange` stays at year granularity rather than inventing months.
 *
 * The bootcamp also appears in the Courses data (`data/courses.ts`, where it carries
 * the raw certificate link). That is deliberate: the CV lists it under Education, so
 * it earns a card at the foot of the Experience timeline, while the Courses hub keeps
 * it in the full catalogue of completed courses.
 *
 * Certificate files: the Degree Certificate, Dean's List Certificate and Bootcamp
 * Certificate PDFs live in `public/certificates/` and are wired via `file` below.
 *
 * ⚠️ No Udemy logo asset exists in `public/logos/`, so the bootcamp's timeline marker
 * falls back to its initials. Drop a licence-cleared logo in and set
 * `institutionLogo` to switch it over.
 *
 * Product TBDs are intentionally absent: project count, certificate subset
 * count, and current professional focus.
 */

import type { AboutSectionData } from "../types";
import { validateAboutSectionData } from "../validate";
import { profile } from "./profile";

function calculateFullYearsSince(startDate: string, currentDate = new Date()): number {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (!startYear || !startMonth) {
    return 0;
  }

  const yearDelta = currentYear - startYear;
  const hasReachedStartMonth = currentMonth >= startMonth;

  return Math.max(0, hasReachedStartMonth ? yearDelta : yearDelta - 1);
}

const yearsExperienceCountLabel = String(
  calculateFullYearsSince(profile.yearsExperienceStartDate),
);

const aboutData = {
  professionalSummary:
    "I'm a full stack developer building web applications with Node.js, Next.js, React, " +
    "TypeScript, and MSSQL.\n\n" +
    "At Kiloma Advanced Solutions I lead development end to end - translating product " +
    "requirements into technical specifications, designing the system and its UI/UX, " +
    "implementing it full stack, and delivering it to production alongside customers and " +
    "stakeholders.\n\n" +
    "I'm known for strong attention to detail, problem-solving, and a highly organized " +
    "approach, and I care about clean, customer-focused solutions.",
  yearsExperienceStartDate: profile.yearsExperienceStartDate,
  stats: {
    yearsExperienceCountLabel,
    coursesCountLabel: profile.coursesCountLabel,
    technologiesCountLabel: profile.technologiesCountLabel,
  },
  mainFields: profile.mainFields,
  education: {
    dateRange: "2019 - 2023",
    degree: "B.Sc. Computer Science",
    institution: "The Academic College of Tel Aviv-Yaffo",
    institutionLogo: "/logos/academic-college-tel-aviv-yaffo-dark-ink.svg",
    honor: "Included in Dean's List",
    summary:
      "Graduated with a GPA of 85 and a place on the Dean's List, and kept building on the " +
      "degree with a full-stack web development bootcamp outside the academy.",
    degreeCertificate: {
      id: "bsc-degree",
      title: "B.Sc. Computer Science",
      viewLabel: "View degree certificate",
      file: "/certificates/shani-penkar-degree-certificate.pdf",
    },
    honorCertificate: {
      id: "deans-list",
      title: "Dean's List",
      viewLabel: "View Dean's List certificate",
      file: "/certificates/shani-penkar-deans-list-certificate.pdf",
    },
  },
  furtherEducation: [
    {
      dateRange: "2023",
      degree: "The Complete Web Development Bootcamp",
      institution: "Udemy",
      summary:
        "Focused on Full Stack development of web application using JavaScript, Node.js, " +
        "Express.js, React.js and more.",
      degreeCertificate: {
        id: "web-development-bootcamp",
        title: "The Complete Web Development Bootcamp",
        viewLabel: "View bootcamp certificate",
        file: "/certificates/shani-penkar-web-development-bootcamp-certificate.pdf",
      },
    },
  ],
} as const;

export const about: AboutSectionData = validateAboutSectionData(aboutData);
