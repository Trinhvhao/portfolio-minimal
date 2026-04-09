import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Github, Globe, Linkedin } from "lucide-react";

export const ContactSection = React.memo(function ContactSection() {
  return (
    <section className="pt-24 md:pt-32 pb-12 px-6 max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-12 tracking-tighter">Let's build it together.</h2>
          <form className="flex flex-col gap-10 md:gap-12">
            <div className="relative group">
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b border-text-muted/30 py-4 text-lg text-text-light focus:outline-none focus:border-text-light transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-4 text-text-muted text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-text-light peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text"
              >
                What's your name?
              </label>
            </div>
            <div className="relative group">
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b border-text-muted/30 py-4 text-lg text-text-light focus:outline-none focus:border-text-light transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-4 text-text-muted text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-text-light peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text"
              >
                What's your email?
              </label>
            </div>
            <div className="relative group">
              <textarea
                id="project"
                rows={3}
                className="w-full bg-transparent border-b border-text-muted/30 py-4 text-lg text-text-light focus:outline-none focus:border-text-light transition-colors peer resize-none"
                placeholder=" "
              />
              <label
                htmlFor="project"
                className="absolute left-0 top-4 text-text-muted text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-text-light peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text"
              >
                Tell me about your project.
              </label>
            </div>
            <button type="button" className="self-start flex items-center gap-4 group mt-4">
              <span className="text-sm font-mono uppercase tracking-widest text-text-light group-hover:text-white transition-colors">
                Send Message
              </span>
              <div className="w-10 h-10 rounded-full border border-text-muted/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight size={16} />
              </div>
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-12 md:gap-16 lg:pl-12"
        >
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-6">Contact Details</h4>
            <div className="flex flex-col gap-2 text-xl">
              <a href="mailto:haotrinh142@gmail.com" className="hover:text-white transition-colors">
                haotrinh142@gmail.com
              </a>
              <a href="tel:+1234567890" className="hover:text-white transition-colors">
                +1 (234) 567-890
              </a>
              <p className="text-text-muted mt-2">San Francisco, CA</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-6">Socials</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-text-muted/30 flex items-center justify-center hover:bg-white hover:text-black transition-all text-text-light"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-text-muted/30 flex items-center justify-center hover:bg-white hover:text-black transition-all text-text-light"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-text-muted/30 flex items-center justify-center hover:bg-white hover:text-black transition-all text-text-light"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full flex justify-center items-center pb-12 pt-4 overflow-visible">
        <h1 className="text-6xl md:text-8xl lg:text-[100px] font-heading font-bold text-text-light leading-tight tracking-tighter text-center px-4">
          TRINH VAN HAO
        </h1>
      </div>
    </section>
  );
});
