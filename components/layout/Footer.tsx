import { profile } from "@/lib/content/data/profile";

/**
 * Shared site footer (spec §20.1 landmark).
 *
 * Name comes from the content layer rather than a local literal so the
 * footer can't drift from the published Profile data.
 */
const OWNER_NAME = profile.name;

export function Footer() {
  // Build-time year; the site is statically generated, so this reflects the
  // last build. Used only for the copyright line.
  const year = new Date().getFullYear();

  return (
    <footer className="seam-hairline bg-bg-surface">
      <div className="site-shell flex flex-col items-center gap-3 py-8 text-small text-text-secondary sm:flex-row sm:justify-between">
        <p className="m-0">
          © {year} {OWNER_NAME}
        </p>
      </div>
    </footer>
  );
}
