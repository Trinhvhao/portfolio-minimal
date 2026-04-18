import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import { MonitorPlay, PenTool, Code2, Workflow, FileText, Play } from "lucide-react";

type Clip = {
  id: string;
  title: string;
  start: number;
  end: number;
  desc: string;
  story?: string;
  time?: string;
  color: string;
  mediaUrl?: string;
};

type Track = {
  id: string;
  label: string;
  type: "video" | "audio";
  icon: React.ElementType;
  clips: Clip[];
};

type PositionedClip = Clip & {
  leftPercent: number;
  widthPercent: number;
};

type PreparedTrack = Track & {
  rowHeight: number;
  positionedClips: PositionedClip[];
};

type Interval = {
  start: number;
  end: number;
};

const TRACKS: Track[] = [
  {
    id: "V2",
    label: "VIDEO",
    type: "video",
    icon: MonitorPlay,
    clips: [
      {
        id: "capcut",
        title: "Capcut",
        start: 10,
        end: 35,
        desc: "Fast-paced video editing, transitions, and social media content creation.",
        story: "Used for crafting viral, engaging short-form video campaigns.",
        time: "Experience",
        color: "bg-blue-500/20 border-blue-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "V1",
    label: "DESIGN",
    type: "video",
    icon: PenTool,
    clips: [
      {
        id: "canva",
        title: "Canva",
        start: 5,
        end: 25,
        desc: "Rapid graphic design, presentations, and social media assets.",
        story:
          "The core hub for creating quick, high-impact marketing materials and templates.",
        time: "4 Years Experience",
        color: "bg-orange-500/20 border-orange-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "figma",
        title: "Figma",
        start: 30,
        end: 50,
        desc: "UI/UX architecture, scalable design systems, and prototyping.",
        story:
          "I use it to map out layouts and collaborative visual mockups.",
        time: "Basic",
        color: "bg-pink-500/20 border-pink-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "ps",
        title: "Photoshop",
        start: 60,
        end: 85,
        desc: "Raster manipulation, digital art, and photo editing.",
        story: "Essential for preparing assets and processing photography for web use.",
        time: "Basic",
        color: "bg-cyan-500/20 border-cyan-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "A2",
    label: "AUTO",
    type: "audio",
    icon: Workflow,
    clips: [
      {
        id: "n8n",
        title: "n8n Automation",
        start: 20,
        end: 40,
        desc: "Node-based workflow automation and complex API integrations.",
        story:
          "My secret weapon for bridging backend services, automating content syncing, and creating AI pipelines.",
        time: "1 Year Experience",
        color: "bg-green-500/20 border-green-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "A3",
    label: "CONTENT",
    type: "audio",
    icon: FileText,
    clips: [
      {
        id: "copy",
        title: "Copywriting",
        start: 0,
        end: 20,
        desc: "Crafting compelling narratives and technical documentation.",
        story:
          "Writing clear, concise copy that aligns with brutalist design principles - no fluff, just impact.",
        time: "Variable",
        color: "bg-green-500/20 border-green-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "strategy",
        title: "Content Strategy",
        start: 30,
        end: 60,
        desc: "Planning and executing multi-channel content campaigns.",
        story:
          "Architecting how technical projects are presented to non-technical audiences across different platforms.",
        time: "2 Years",
        color: "bg-emerald-500/20 border-emerald-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: "seo",
        title: "SEO Tuning",
        start: 70,
        end: 100,
        desc: "Data-driven search engine ranking improvements.",
        story:
          "Ensuring Next.js applications are not just fast, but easily discoverable through structured data and semantic HTML.",
        time: "Ongoing",
        color: "bg-teal-500/20 border-teal-500/50",
        mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      },
    ],
  },
];

const TIMELINE_RULER_HEIGHT = 32;
const TIMELINE_ROW_HEIGHT = 40;
const CLIP_HEIGHT = 26;

// Thuật toán: Chia chiều ngang làm số phần bằng tổng clips, từ lúc bắt đầu đến kết thúc timeline.
// Mỗi block chiếm 1 slot độc quyền, so le với nhau lần lượt từ trên xuống dưới, đảm bảo không có overlap.
const ALL_CLIPS_COUNT = TRACKS.reduce((sum, track) => sum + track.clips.length, 0);
const PIECE_WIDTH_PERCENT = 100 / ALL_CLIPS_COUNT;

let globalClipIndex = 0;

const PREPARED_TRACKS: PreparedTrack[] = TRACKS.map((track) => {
  const positionedClips: PositionedClip[] = track.clips.map((clip) => {
    const leftPercent = globalClipIndex * PIECE_WIDTH_PERCENT;
    const widthPercent = PIECE_WIDTH_PERCENT;
    globalClipIndex++;

    return {
      ...clip,
      start: leftPercent,
      end: leftPercent + widthPercent,
      leftPercent,
      widthPercent,
    };
  });

  return {
    ...track,
    rowHeight: TIMELINE_ROW_HEIGHT,
    positionedClips,
  };
});

export const TimelineSkillsSection = React.memo(function TimelineSkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const timelinePanelHeight =
    TIMELINE_RULER_HEIGHT + PREPARED_TRACKS.reduce((totalHeight, track) => totalHeight + track.rowHeight, 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest * 100);
  });

  const activeClips = PREPARED_TRACKS.flatMap((track) => track.positionedClips).filter(
    (clip) => progress >= clip.start && progress <= clip.end,
  );
  const primaryActiveClip = activeClips[0];

  const formatTimecode = (prog: number) => {
    const totalFrames = Math.floor(prog * 100);
    const hours = Math.floor(totalFrames / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((totalFrames % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(totalFrames % 60)
      .toString()
      .padStart(2, "0");
    const frames = Math.floor((prog * 1000) % 24)
      .toString()
      .padStart(2, "0");

    return `${hours}:${mins}:${secs}:${frames}`;
  };

  return (
    <section id="timeline-skills" ref={containerRef} className="h-[260vh] relative bg-bg-dark">
      <div className="sticky top-0 h-[100svh] min-h-[560px] w-full flex flex-col justify-start px-4 md:px-6 max-w-7xl mx-auto pt-10 md:pt-14 pb-4 overflow-hidden">
        <div className="mb-3 md:mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
              <MonitorPlay className="w-4 h-4 text-neutral-400" />
              <span className="text-xs font-mono text-neutral-300 tracking-wider">SKILL TIMELINE</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tighter">The Editor</h2>
            <p className="text-text-muted font-mono mt-2 text-sm">Scroll down to scrub the timeline.</p>
          </motion.div>
        </div>

        <div className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl overflow-hidden shadow-2xl flex flex-col flex-1 min-h-0">
          <div className="flex flex-col md:flex-row border-b border-[#333] bg-[#181818] flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
            <div className="w-full md:w-[55%] p-3 md:p-4 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-center shrink-0 min-h-[170px] md:min-h-0">
              <div className="w-full h-full bg-black rounded-lg border border-[#333] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20" />

                {primaryActiveClip ? (
                  <motion.div
                    key={primaryActiveClip.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10 overflow-hidden"
                  >
                    {primaryActiveClip.mediaUrl && (
                      <motion.img
                        src={primaryActiveClip.mediaUrl}
                        alt={primaryActiveClip.title}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                    <div className="relative z-20 w-full p-4 md:p-5 text-center mt-auto mb-1">
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight drop-shadow-lg">
                        {primaryActiveClip.title}
                      </h3>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-neutral-600 font-mono text-xl tracking-widest flex flex-col items-center gap-4 z-10">
                    <div className="w-16 h-16 border-2 border-neutral-700 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-neutral-600 ml-1" />
                    </div>
                    MEDIA PENDING
                  </div>
                )}

                <div className="absolute top-4 left-4 text-[10px] font-mono text-white/50 z-10">PROGRAM</div>
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/50 z-10">FIT 100%</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/50 z-10">{formatTimecode(progress)}</div>
              </div>
            </div>

            <div className="w-full md:w-[45%] p-3 md:p-4 flex flex-col bg-[#111] overflow-hidden min-h-[170px] md:min-h-0 md:h-full">
              <div className="overflow-y-auto md:overflow-y-visible pr-2 md:pr-0 pb-1 flex-1 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                  {primaryActiveClip ? (
                    <motion.div
                      key={primaryActiveClip.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[10px] md:text-xs font-mono text-neutral-500 mb-2 md:mb-3 tracking-widest uppercase">
                        Skill Metadata
                      </h4>

                      <div className="space-y-3 md:space-y-4">
                        <div>
                          <h5 className="text-[10px] md:text-xs font-mono text-neutral-400 mb-1">DESCRIPTION</h5>
                          <p className="text-sm md:text-[15px] text-neutral-200 leading-snug font-sans">{primaryActiveClip.desc}</p>
                        </div>

                        {primaryActiveClip.story && (
                          <div>
                            <h5 className="text-[10px] md:text-xs font-mono text-neutral-400 mb-1">THE STORY</h5>
                            <p className="text-sm md:text-[15px] text-neutral-300 leading-snug italic font-sans border-l-2 border-[#333] pl-3 md:pl-4">
                              "{primaryActiveClip.story}"
                            </p>
                          </div>
                        )}

                        {primaryActiveClip.time && (
                          <div>
                            <h5 className="text-[10px] md:text-xs font-mono text-neutral-400 mb-1">EXPERIENCE</h5>
                            <div className="inline-flex items-center px-2 py-1 md:py-1.5 rounded bg-[#222] border border-[#333]">
                              <span className="text-xs md:text-sm font-mono text-emerald-300">{primaryActiveClip.time}</span>
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full text-neutral-600 font-mono text-sm"
                    >
                      SELECT A CLIP IN THE TIMELINE
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div
            className="bg-[#1e1e1e] flex flex-col relative overflow-hidden shrink-0 border-t border-[#444]"
            style={{ height: `${timelinePanelHeight}px` }}
          >
            <div className="h-8 bg-[#252525] border-b border-[#333] flex items-end relative">
              <div className="w-16 md:w-24 shrink-0 border-r border-[#333] h-full flex items-center px-2">
                <span className="text-[10px] font-mono text-neutral-500">{formatTimecode(progress)}</span>
              </div>

              <div className="flex-1 relative h-full">
                {[...Array(20)].map((_, index) => (
                  <div
                    key={index}
                    className="absolute bottom-0 w-[1px] bg-[#444]"
                    style={{ left: `${(index / 20) * 100}%`, height: index % 2 === 0 ? "8px" : "4px" }}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 relative overflow-hidden flex flex-col [--track-head:4rem] md:[--track-head:6rem]">
              <motion.div
                className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-50 pointer-events-none"
                style={{
                  left: `calc(var(--track-head) + (100% - var(--track-head)) * ${progress / 100})`,
                }}
              >
                <div className="absolute -top-0 -translate-x-1/2 w-3 h-3 bg-red-500" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              </motion.div>

                {PREPARED_TRACKS.map((track) => (
                  <div key={track.id} className="flex shrink-0 border-b border-[#2a2a2a] group" style={{ height: `${track.rowHeight}px` }}>
                  <div className="w-16 md:w-24 shrink-0 bg-[#222] border-r border-[#333] flex items-center justify-between px-2 z-40 relative">
                    <span className="text-[10px] font-mono font-bold text-neutral-400">{track.id}</span>
                    <track.icon className="w-3 h-3 text-neutral-500" />
                  </div>

                  <div className="flex-1 relative overflow-hidden bg-[#1a1a1a] group-hover:bg-[#1c1c1c] transition-colors">
                    <div className="absolute inset-0 border-b border-white/[0.02]" />

                      {track.positionedClips.map((clip) => {
                        const isActive = progress >= clip.start && progress <= clip.end;
                        const clipTop = Math.max(2, (track.rowHeight - CLIP_HEIGHT) / 2);

                      return (
                        <div
                          key={clip.id}
                            className={`absolute rounded-[4px] border flex items-center px-2 overflow-hidden transition-all duration-150 ${
                            isActive
                                ? "bg-white border-white text-black z-20"
                                : `${clip.color} text-neutral-300 z-10`
                          }`}
                            style={{
                              left: `${clip.leftPercent}%`,
                              width: `${clip.widthPercent}%`,
                              top: `${clipTop}px`,
                              height: `${CLIP_HEIGHT}px`,
                            }}
                        >
                          <span className="text-[10px] md:text-xs font-mono font-bold truncate select-none">{clip.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
