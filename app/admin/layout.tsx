/* =============================================================
 * Admin Layout
 *
 * Separate layout for admin pages — no public Header/Footer.
 * Not indexed by search engines.
 * ============================================================= */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Stronger Life",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the public site Header/Footer inherited from root layout */}
      <style>{`
        body > header, body > footer, body > a[href="#main-content"] { display: none !important; }
        #main-content { padding: 0; }
      `}</style>
      {children}
    </>
  );
}
