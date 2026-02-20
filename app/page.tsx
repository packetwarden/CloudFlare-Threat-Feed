import { Metadata } from "next";
import { getThreatData } from "@/lib/data/threats";
import { TelemetryBar } from "@/components/tool/TelemetryBar";
import { FeedViewer } from "@/components/tool/FeedViewer";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "Live Threat Feed | Security Operations Telemetry",
  description:
    "Professional-grade threat intelligence feed tracking active attack vectors, malicious IPs, and global security events in real-time.",
  keywords: [
    "threat intelligence",
    "cybersecurity",
    "IOC",
    "malicious IPs",
    "attack vectors",
    "security operations",
    "telemetry",
  ],
  authors: [{ name: "SecOps Intelligence" }],
  openGraph: {
    type: "website",
    title: "Live Threat Feed | Security Operations Telemetry",
    description: "Real-time tracking of active attack vectors and malicious IPs.",
    siteName: "ThreatFeed Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Threat Feed | SecOps",
    description: "Real-time threat intelligence telemetry.",
  },
};

export default async function Home() {
  const data = await getThreatData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Live Threat Feed Telemetry",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    description: "Real-time cybersecurity threat intelligence feed.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-foreground font-sans">
        <TelemetryBar lastUpdate={data.metadata.timestamp} />
        <FeedViewer data={data} />
      </div>
    </>
  );
}
