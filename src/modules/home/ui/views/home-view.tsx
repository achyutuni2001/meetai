"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  BotIcon,
  CalendarIcon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react";

const quickCards = [
  {
    title: "Create an agent",
    description:
      "Set the assistant name and instructions first so it is ready before a meeting is created.",
    href: "/agents",
    icon: BotIcon,
    cta: "Manage agents",
  },
  {
    title: "Schedule a meeting",
    description:
      "Create a meeting, attach an agent, and prepare the session before it starts.",
    href: "/meetings",
    icon: CalendarIcon,
    cta: "Open meetings",
  },
  {
    title: "Join active meetings",
    description:
      "Use the meetings page to start, join, and follow sessions that are already in progress.",
    href: "/meetings",
    icon: VideoIcon,
    cta: "Join a meeting",
  },
];

export const HomeView = () => {
  return (
    <div className="intel-page gap-6">
      <section className="intel-panel p-6 sm:p-8">
        <span className="intel-chip mb-4">Meet AI</span>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900">
          Schedule meetings and join them with your AI agent.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-500">
          Create an agent, attach it to a meeting, then start or join the session from the meetings page.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {quickCards.map((card) => (
          <Link key={card.title} href={card.href} className="intel-soft-panel block p-6 transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(70,116,198,0.14)]">
            <card.icon className="mb-8 size-5 text-[#4c78cf]" />
            <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">{card.description}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4c78cf]">
              {card.cta}
              <ArrowRightIcon className="size-4" />
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="intel-panel p-6">
          <span className="intel-chip mb-4">How to use the application</span>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Follow this order for the smoothest setup
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500">
            The app is easiest to use when you create the assistant before you create the meeting it will join.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              ["1. Add an agent", "Write focused instructions so the assistant knows its role before it joins any meeting."],
              ["2. Create a meeting", "Choose a clear meeting name and attach the agent you want to use for that session."],
              ["3. Run the session", "Open the meeting to start or join the call and follow what is happening in the session."],
              ["4. Review the meeting", "After the meeting, review the summary, transcript, and other outputs in one place."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[24px] border border-[#dde8fb] bg-[#f7faff] p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <CalendarIcon className="size-4 text-[#78a0ec]" />
                  {title}
                </div>
                <p className="text-sm leading-7 text-slate-500">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="intel-panel p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#d1a342]">
            <SparklesIcon className="size-4" />
            Quick tips
          </div>
          <p className="mb-8 text-sm text-slate-500">
            A few small habits improve results quickly.
          </p>
          <div className="space-y-6">
            {[
              "Start on the Agents page if this is your first visit.",
              "Keep agent instructions short, specific, and task-focused.",
              "Use descriptive meeting names so completed sessions are easy to find later.",
              "Open the Meetings page when you want to schedule, start, or join a session.",
            ].map((tip) => (
              <div key={tip} className="flex gap-3 text-sm leading-7 text-slate-500">
                <span className="mt-2 size-2 rounded-full bg-[#d7deef]" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
