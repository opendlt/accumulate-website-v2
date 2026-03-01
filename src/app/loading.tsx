import { Skeleton, SkeletonGrid, SkeletonText } from "@/components/visual/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6">
      {/* ---- Hero skeleton ---- */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column: text placeholders */}
          <div>
            {/* Headline */}
            <Skeleton rounded="sm" className="h-12 w-[85%] mb-4" />
            <Skeleton rounded="sm" className="h-12 w-[60%] mb-6" />

            {/* Subtitle */}
            <SkeletonText lines={3} className="mb-8" />

            {/* Bullet points */}
            <div className="flex flex-col gap-3 mb-8">
              {[70, 65, 55].map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton rounded="full" className="h-1.5 w-1.5 shrink-0" />
                  <Skeleton rounded="sm" className="h-4" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-12 w-[180px]" />
              <Skeleton className="h-12 w-[170px]" />
            </div>

            {/* Docs link */}
            <Skeleton rounded="sm" className="h-4 w-[120px] mt-4" />
          </div>

          {/* Right column: diagram placeholder */}
          <div className="flex justify-center">
            <Skeleton rounded="md" className="h-[320px] w-[320px]" />
          </div>
        </div>
      </section>

      {/* ---- Cards grid skeleton ---- */}
      <section className="pb-16 md:pb-24">
        {/* Section header */}
        <div className="mb-10">
          <Skeleton rounded="full" className="h-7 w-[140px] mb-4" />
          <Skeleton rounded="sm" className="h-10 w-[45%] mb-4" />
          <Skeleton rounded="sm" className="h-5 w-[60%]" />
        </div>

        <SkeletonGrid count={3} columns={3} />
      </section>
    </div>
  );
}
