"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WalletTab {
  name: string;
  description: string;
  type: "phone" | "browser";
  links?: { label: string; href: string }[];
}

interface WalletShowcaseProps {
  tabs: WalletTab[];
}

function PhoneFrame({ name }: { name: string }) {
  return (
    <div className="w-[140px] h-[260px] rounded-[24px] border-2 border-overlay/[0.12] bg-surface/80 flex flex-col items-center justify-center relative shrink-0">
      {/* Notch */}
      <div className="absolute top-3 w-16 h-4 rounded-full bg-overlay/[0.06]" />
      {/* Screen content placeholder */}
      <div className="w-[110px] h-[180px] rounded-[12px] bg-overlay/[0.03] mt-4 flex items-center justify-center">
        <span className="font-heading text-xs text-text-muted/60 text-center px-2">
          {name}
        </span>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-2.5 w-10 h-1 rounded-full bg-overlay/[0.1]" />
    </div>
  );
}

function BrowserFrame({ name }: { name: string }) {
  return (
    <div className="w-[220px] h-[150px] rounded-[10px] border-2 border-overlay/[0.12] bg-surface/80 flex flex-col overflow-hidden shrink-0">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-overlay/[0.06] bg-overlay/[0.02]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <div className="flex-1 mx-2 h-4 rounded bg-overlay/[0.04]" />
      </div>
      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <span className="font-heading text-xs text-text-muted/60 text-center px-2">
          {name}
        </span>
      </div>
    </div>
  );
}

export function WalletShowcase({ tabs }: WalletShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden"
    >
      {/* Tab buttons */}
      <div className="flex border-b border-overlay/[0.06]">
        {tabs.map((tab, i) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(i)}
            className={cn(
              "flex-1 px-4 py-3.5 text-sm font-heading font-semibold transition-all duration-200 relative",
              activeTab === i
                ? "text-text bg-overlay/[0.03]"
                : "text-text-muted hover:text-text hover:bg-overlay/[0.02]"
            )}
          >
            {tab.name}
            {activeTab === i && (
              <motion.div
                layoutId="wallet-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="p-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            {/* Device frame */}
            {tabs[activeTab].type === "phone" ? (
              <PhoneFrame name={tabs[activeTab].name} />
            ) : (
              <BrowserFrame name={tabs[activeTab].name} />
            )}

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-2">
                {tabs[activeTab].name}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {tabs[activeTab].description}
              </p>
              {tabs[activeTab].links && tabs[activeTab].links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {tabs[activeTab].links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                    >
                      {link.label} &rarr;
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
