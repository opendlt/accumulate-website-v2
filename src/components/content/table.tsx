import React from "react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  header: string;
  className?: string;
}

interface TableProps<T extends Record<string, React.ReactNode>> {
  columns: Column[];
  data: T[];
  className?: string;
}

export function Table<T extends Record<string, React.ReactNode>>({
  columns,
  data,
  className,
}: TableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-[14px] border border-overlay/[0.06] bg-surface/60 backdrop-blur-sm", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-overlay/[0.03]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-5 py-3.5 text-left font-semibold text-text-subtle text-xs uppercase tracking-wider",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-overlay/[0.06] hover:bg-overlay/[0.02] transition-colors"
            >
              {columns.map((col, colIndex) => (
                <td key={col.key} className={cn(
                  "px-5 py-3.5",
                  colIndex === 0 ? "font-medium text-text" : "text-text-muted",
                  col.className
                )}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
