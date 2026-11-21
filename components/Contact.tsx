"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const field =
  "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-[15px] text-foreground placeholder:text-faint outline-none transition-colors focus:border-faint focus:bg-white/[0.04]";

export default function Contact({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sent" | "copied">("idle");

  const flash = (s: "sent" | "copied") => {
    setState(s);
    setTimeout(() => setState("idle"), 2200);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message.trim()) return;
    const subject = encodeURIComponent(`Hello from ${name.trim() || "your portfolio"}`);
    const body = encodeURIComponent(
      `${message.trim()}${name.trim() ? `\n\n— ${name.trim()}` : ""}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    flash("sent");
  };

  const copy = async () => {
    if (!email) return;
    await navigator.clipboard.writeText(email);
    flash("copied");
  };

  return (
    <form onSubmit={send} className="space-y-3">
      <input
        className={field}
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <textarea
        className={`${field} min-h-32 resize-y`}
        placeholder="What would you like to build together?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <motion.button
          type="submit"
          disabled={!email || !message.trim()}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="relative h-11 min-w-36 overflow-hidden rounded-full bg-foreground px-6 text-[15px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={state === "sent" ? "sent" : "send"}
              className="inline-block"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {state === "sent" ? "Opening mail…" : "Send email"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <button
          type="button"
          onClick={copy}
          disabled={!email}
          className="h-11 rounded-full border border-line px-5 text-[15px] text-muted transition-colors hover:border-faint hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state === "copied" ? "Copied" : "Copy address"}
        </button>
      </div>
      {!email && (
        <p className="text-sm text-faint">
          Contact address not configured.
        </p>
      )}
    </form>
  );
}
