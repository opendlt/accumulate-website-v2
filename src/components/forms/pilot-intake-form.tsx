"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Schema & types                                                     */
/* ------------------------------------------------------------------ */

export const pilotIntakeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  organization: z.string().min(2, "Organization is required"),
  pilotTrack: z.enum([
    "vendor-authority",
    "treasury-controls",
    "coalition-delegation",
  ]),
  industry: z.string().min(2, "Industry is required"),
  workflow: z
    .string()
    .min(10, "Please describe the workflow you want to pilot"),
  urgency: z.enum(["exploring", "1-3-months", "immediate"]),
});

export type PilotIntakeData = z.infer<typeof pilotIntakeSchema>;

/* ------------------------------------------------------------------ */
/*  Style constants                                                    */
/* ------------------------------------------------------------------ */

const inputBase =
  "w-full h-11 px-4 bg-overlay/[0.03] border border-overlay/[0.08] rounded-[10px] text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary-soft focus:border-primary/50 transition-all duration-200 hover:border-overlay/[0.15]";

/* ------------------------------------------------------------------ */
/*  Confetti particle generation (stable across renders)               */
/* ------------------------------------------------------------------ */

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

const PARTICLE_COLORS = ["#3B82F6", "#00A6FB", "#22C55E", "#60A5FA"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 120;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 0.15,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Animated field wrapper with floating label + focus line             */
/* ------------------------------------------------------------------ */

function FormField({
  label,
  error,
  children,
  shakeKey,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  shakeKey: number;
}) {
  return (
    <div>
      <motion.div
        key={shakeKey}
        animate={
          shakeKey > 0
            ? { x: [0, -8, 8, -4, 4, 0] }
            : undefined
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative"
      >
        {/* Label that changes colour on focus-within */}
        <motion.label className="block text-sm font-semibold mb-1.5 text-text-subtle transition-colors duration-200 group-focus-within:text-primary">
          {label}
        </motion.label>

        {/* Input slot */}
        <div className="relative group">
          {children}

          {/* Focus indicator line that slides in from left */}
          <span
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-primary transition-all duration-300 group-focus-within:w-full"
            aria-hidden
          />
        </div>
      </motion.div>

      {/* Error message with fade + slide */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-danger mt-1 overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated SVG checkmark                                             */
/* ------------------------------------------------------------------ */

function AnimatedCheckmark() {
  return (
    <motion.svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="mx-auto"
    >
      {/* Circle */}
      <motion.circle
        cx="28"
        cy="28"
        r="26"
        stroke="#22C55E"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Check path */}
      <motion.path
        d="M17 28.5L24 35.5L39 20.5"
        stroke="#22C55E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Confetti burst                                                     */
/* ------------------------------------------------------------------ */

function ConfettiBurst({ particles }: { particles: Particle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{
            duration: 0.8 + Math.random() * 0.3,
            delay: p.delay,
            ease: "easeOut",
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success state                                                      */
/* ------------------------------------------------------------------ */

function SuccessState({ particles }: { particles: Particle[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-8 text-center overflow-hidden"
    >
      {/* Confetti burst */}
      <ConfettiBurst particles={particles} />

      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="mb-5"
      >
        <AnimatedCheckmark />
      </motion.div>

      {/* Staggered text */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="inline-flex items-center gap-1.5 bg-[#22C55E]/10 text-[#22C55E] text-sm font-semibold rounded-[999px] px-3 py-1.5 mb-4"
      >
        Submitted successfully
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-text-muted"
      >
        We&apos;ll be in touch within 2 business days to schedule your pilot
        intake.
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spinner icon                                                       */
/* ------------------------------------------------------------------ */

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main form component                                                */
/* ------------------------------------------------------------------ */

export function PilotIntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitFlash, setSubmitFlash] = useState(false);
  const [shakeCounter, setShakeCounter] = useState(0);

  // Generate confetti particles once so they stay stable across renders
  const particles = useMemo(() => generateParticles(28), []);

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<PilotIntakeData>({
    resolver: zodResolver(pilotIntakeSchema),
    defaultValues: {
      pilotTrack: "vendor-authority",
      urgency: "exploring",
    },
  });

  // Bump shake counter every time a submit attempt produces errors
  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      setShakeCounter((c) => c + 1);
    }
  }, [submitCount, errors]);

  const onSubmit = useCallback(
    async (data: PilotIntakeData) => {
      setSubmitting(true);
      try {
        const res = await fetch("/api/pilot-intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          // Brief green flash on button before transitioning
          setSubmitFlash(true);
          await new Promise((r) => setTimeout(r, 500));
          setSubmitted(true);
        }
      } catch {
        // silently handle
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  /* ---- Success view ---- */
  if (submitted) {
    return <SuccessState particles={particles} />;
  }

  /* ---- Form view ---- */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 md:p-8 space-y-5 overflow-hidden"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          label="Name"
          error={errors.name?.message}
          shakeKey={errors.name ? shakeCounter : 0}
        >
          <input
            {...register("name")}
            placeholder="Your name"
            className={cn(inputBase, errors.name && "border-danger")}
          />
        </FormField>

        <FormField
          label="Email"
          error={errors.email?.message}
          shakeKey={errors.email ? shakeCounter : 0}
        >
          <input
            {...register("email")}
            type="email"
            placeholder="work@example.com"
            className={cn(inputBase, errors.email && "border-danger")}
          />
        </FormField>
      </div>

      {/* Row 2: Organization + Industry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          label="Organization"
          error={errors.organization?.message}
          shakeKey={errors.organization ? shakeCounter : 0}
        >
          <input
            {...register("organization")}
            placeholder="Company name"
            className={cn(
              inputBase,
              errors.organization && "border-danger"
            )}
          />
        </FormField>

        <FormField
          label="Industry"
          error={errors.industry?.message}
          shakeKey={errors.industry ? shakeCounter : 0}
        >
          <input
            {...register("industry")}
            placeholder="e.g., Utilities, Finance, Government"
            className={cn(inputBase, errors.industry && "border-danger")}
          />
        </FormField>
      </div>

      {/* Row 3: Pilot Track + Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Pilot Track" shakeKey={0}>
          <select
            {...register("pilotTrack")}
            className={cn(inputBase, "appearance-none")}
          >
            <option value="vendor-authority">
              Vendor / Contractor Authority
            </option>
            <option value="treasury-controls">
              Treasury &amp; Multi-Entity Controls
            </option>
            <option value="coalition-delegation">
              Government / Coalition Delegation
            </option>
          </select>
        </FormField>

        <FormField label="Timeline" shakeKey={0}>
          <select
            {...register("urgency")}
            className={cn(inputBase, "appearance-none")}
          >
            <option value="exploring">Exploring</option>
            <option value="1-3-months">1-3 months</option>
            <option value="immediate">Immediate</option>
          </select>
        </FormField>
      </div>

      {/* Workflow textarea */}
      <FormField
        label="Workflow to Pilot"
        error={errors.workflow?.message}
        shakeKey={errors.workflow ? shakeCounter : 0}
      >
        <textarea
          {...register("workflow")}
          placeholder="Describe the workflow you'd like to pilot (e.g., vendor access window approvals, release approvals for payouts)"
          rows={3}
          className={cn(
            inputBase,
            "h-auto py-3 resize-none",
            errors.workflow && "border-danger"
          )}
        />
      </FormField>

      {/* Submit button with hover gradient, spinner, and success flash */}
      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={
          !submitting
            ? {
                backgroundImage:
                  "linear-gradient(135deg, #3B82F6 0%, #2563EB 40%, #00A6FB 100%)",
                scale: 1.015,
              }
            : undefined
        }
        whileTap={!submitting ? { scale: 0.975 } : undefined}
        animate={
          submitFlash
            ? { backgroundColor: "#22C55E" }
            : { backgroundColor: "#3B82F6" }
        }
        transition={{ duration: 0.2 }}
        className={cn(
          "relative h-11 px-5 rounded-[10px] font-semibold text-sm text-white transition-shadow duration-150",
          "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "disabled:cursor-not-allowed disabled:opacity-70"
        )}
      >
        <span className="inline-flex items-center gap-2">
          <AnimatePresence mode="wait">
            {submitting ? (
              <motion.span
                key="spinner"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center"
              >
                <Spinner />
              </motion.span>
            ) : null}
          </AnimatePresence>
          {submitFlash
            ? "Submitted!"
            : submitting
              ? "Submitting..."
              : "Schedule Pilot Intake"}
        </span>
      </motion.button>
    </form>
  );
}
