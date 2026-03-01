"use client";

import { useState } from "react";
import { PILOT_TRACKS } from "@/lib/constants";
import { PilotTrackCard } from "@/components/cards/pilot-track-card";

interface PilotTrackSelectorProps {
  onSelectTrack?: (id: string) => void;
}

export function PilotTrackSelector({ onSelectTrack }: PilotTrackSelectorProps) {
  const [selected, setSelected] = useState<string>(PILOT_TRACKS[0].id);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectTrack?.(id);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Choose your pilot track"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {PILOT_TRACKS.map((track) => (
        <PilotTrackCard
          key={track.id}
          id={track.id}
          title={track.title}
          outcome={track.outcome}
          exampleWorkflow={track.exampleWorkflow}
          selected={selected === track.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}
