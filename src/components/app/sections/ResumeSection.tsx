import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Terminal } from 'lucide-react';

// Mock CV Data
const CV_DATA = {
  en: {
    header: "PERSONNEL DOSSIER",
    name: "TRỊNH VĂN HÀO",
    role: "FULLSTACK DEVELOPER",
    about: "Final-year Information Technology student with 1 year of experience at Zaka Edu as a Web Developer, contributing to the development of educational web systems with AI integration. Experienced in building end-to-end applications, optimizing performance, and improving user experience. Seeking to grow in a professional technology environment that values system stability and continuous deployment.",
    experience: [
      { year: "Aug 2023 - Present", role: "Web Development", company: "Zaka Education Consulting Joint Stock Company", desc: "Developed and maintained the company website, ensuring optimal performance, usability, and overall user experience. Managed content updates and improved SEO to increase visibility and reach." },
      { year: "Jun 2025 - Mar 2026", role: "AI Intern", company: "AIoT Lab, Dai Nam University", desc: "Built and developed a sentiment analysis model for Ngoc Dung Aesthetic Clinic. Contributed to developing a tea harvesting detection model for Van Thang Cooperative. Collected, processed, and labeled data for model training." }
    ],
    projects: [
      { year: "Jan 2025 - Mar 2026", role: "Hệ Thống Quản Lý Ticket", company: "", desc: "Built an enterprise ticket management system based on ITIL/ITSM standards using Next.js, NestJS, TypeScript, PostgreSQL, and TailwindCSS. Developed full ticket lifecycle features with RESTful APIs, JWT authentication, and role-based access control. Designed a scalable frontend architecture using TanStack Query, Zustand, and Shadcn UI. Optimized database queries and APIs." },
      { year: "Oct 2023 - Present", role: "Website Công ty Zaka Edu", company: "", desc: "Developed a full-stack website for an education center using React, Express.js, and Supabase. Integrated AI-powered features to support user consultation and interaction. Deployed the system to production on Vercel, configured custom domain, SSL, and environment variables." }
    ],
    education: [
      { year: "2022 - 2026", role: "Information Technology", company: "Dai Nam University", desc: "GPA: 3.5 / 4.0" }
    ],
    skills: [
      "Next.js", "React.js", "TailwindCSS", "Node.js", "Express.js", "PostgreSQL", "Supabase", "RESTful API", "JWT", "NLP", "Chatbot", "RAG", "Git", "Docker", "Vercel"
    ],
    certificates: [
      "Python for Data Science", "Google AI", "First Prize – FE Competition, DNU", "Giải Nhì AI & IOT, DNU"
    ]
  },
  vn: {
    header: "HỒ SƠ NHÂN SỰ",
    name: "TRỊNH VĂN HÀO",
    role: "FULLSTACK DEVELOPER",
    about: "Sinh viên năm cuối ngành Công Nghệ Thông Tin với 1 năm kinh nghiệm tại Zaka Edu trong vai trò Web Developer, phát triển hệ thống web giáo dục, có ứng dụng AI trong sản phẩm. Có kinh nghiệm xây dựng ứng dụng end-to-end, tối ưu hiệu năng và cải thiện trải nghiệm người dùng. Mong muốn phát triển trong môi trường công nghệ chuyên nghiệp, đề cao tính ổn định hệ thống và triển khai liên tục.",
    experience: [
      { year: "T8 2023 - Hiện tại", role: "Phát triển Web & Truyền Thông", company: "Công ty Cổ phần Tư vấn Giáo dục Zaka Education", desc: "Phát triển và vận hành website, xây dựng và tối ưu tính năng phục vụ người dùng. Thiết kế và triển khai các ấn phẩm media truyền thông, tăng tương tác và nhận diện thương hiệu." },
      { year: "T7 2025 - Hiện tại", role: "Thực tập sinh AI", company: "Phòng Lab AIoT, Đại học Đại Nam", desc: "Xây dựng và phát triển mô hình nhận diện cảm xúc văn bản cho Thẩm Mỹ Viện Ngọc Dung. Tham gia phát triển mô hình nhận diện thu hoạch Chè cho HTX Vạn Thắng. Thu thập, xử lý và gán nhãn dữ liệu phục vụ huấn luyện mô hình." }
    ],
    projects: [
      { year: "T1 2025 - T3 2026", role: "Hệ Thống Quản Lý Ticket", company: "", desc: "Xây dựng hệ thống quản lý ticket theo chuẩn ITIL/ITSM sử dụng Next.js, NestJS, TypeScript, PostgreSQL và TailwindCSS. Phát triển đầy đủ vòng đời ticket với kiến trúc REST API sử dụng JWT và phân quyền theo vai trò. Áp dụng kiến trúc frontend có khả năng mở rộng với TanStack Query, Zustand và Shadcn UI." },
      { year: "T10 2023 - Hiện tại", role: "Website Công ty Zaka Edu", company: "", desc: "Xây dựng website full-stack cho trung tâm giáo dục Zaka Edu sử dụng React, Express.js và Supabase. Tích hợp các tính năng AI hỗ trợ tư vấn và tương tác người dùng. Triển khai hệ thống lên môi trường production Vercel, thiết lập domain riêng, SSL và cấu hình biến môi trường." }
    ],
    education: [
      { year: "T10 2022 - T6 2026", role: "Ngành Công Nghệ Thông Tin", company: "Trường Đại Học Đại Nam", desc: "GPA: 3.5 / 4.0" }
    ],
    skills: [
      "Next.js", "React.js", "TailwindCSS", "Node.js", "Express.js", "PostgreSQL", "Supabase", "RESTful API", "JWT", "NLP", "Chatbot", "RAG", "Git", "Docker", "Vercel"
    ],
    certificates: [
      "Python for Data Science", "Google AI", "Giải Nhất Front-End DNU", "Giải Nhì AI & IOT"
    ]
  }
};

export const ResumeSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'vn'>('en');

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-resume', handleOpen);
    return () => window.removeEventListener('open-resume', handleOpen);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isOpen]);

  const data = CV_DATA[lang];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div data-modal-scroll="true" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6" style={{ pointerEvents: 'auto' }}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[90vh] bg-[#050505] border border-white/20 shadow-2xl overflow-hidden flex flex-col mx-auto rounded-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-neutral-400" />
                  <span className="font-mono text-sm tracking-widest text-neutral-300 xl:block hidden">{data.header}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Language Toggle */}
                  <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLang('en'); }}
                      className={`px-3 py-1 text-xs font-mono rounded-full transition-colors ${lang === 'en' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setLang('vn'); }}
                      className={`px-3 py-1 text-xs font-mono rounded-full transition-colors ${lang === 'vn' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                    >
                      VN
                    </button>
                  </div>
                  
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body (Scrollable) */}
              <div data-modal-scroll="true" className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-10 custom-scrollbar relative z-10">
                <div className="max-w-3xl mx-auto">
                  {/* Title Area */}
                  <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tighter mb-2">
                      {data.name}
                    </h1>
                    <p className="text-xl font-mono text-neutral-400">{data.role}</p>
                  </div>

                  {/* About */}
                  <div className="mb-12">
                    <h3 className="text-sm font-mono text-neutral-500 mb-4 tracking-widest uppercase">[{lang === 'en' ? 'Summary' : 'Tóm tắt'}]</h3>
                    <p className="text-lg text-neutral-300 leading-relaxed font-sans">
                      {data.about}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="mb-12">
                    <h3 className="text-sm font-mono text-neutral-500 mb-6 tracking-widest uppercase">[{lang === 'en' ? 'Experience' : 'Kinh nghiệm'}]</h3>
                    <div className="space-y-8">
                      {data.experience.map((exp, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-6">
                          <div className="text-sm font-mono text-neutral-500 pt-1">{exp.year}</div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                            <div className="text-sm font-mono text-neutral-400 mb-2">{exp.company}</div>
                            <p className="text-neutral-300 text-sm leading-relaxed">{exp.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-12">
                    <h3 className="text-sm font-mono text-neutral-500 mb-6 tracking-widest uppercase">[{lang === 'en' ? 'Projects' : 'Dự án'}]</h3>
                    <div className="space-y-8">
                      {data.projects.map((proj, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-6">
                          <div className="text-sm font-mono text-neutral-500 pt-1">{proj.year}</div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{proj.role}</h4>
                            <p className="text-neutral-300 text-sm leading-relaxed mt-2">{proj.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-12">
                    <h3 className="text-sm font-mono text-neutral-500 mb-6 tracking-widest uppercase">[{lang === 'en' ? 'Education' : 'Học vấn'}]</h3>
                    <div className="space-y-8">
                      {data.education.map((edu, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-6">
                          <div className="text-sm font-mono text-neutral-500 pt-1">{edu.year}</div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{edu.role}</h4>
                            <div className="text-sm font-mono text-neutral-400 mb-2">{edu.company}</div>
                            <p className="text-neutral-300 text-sm leading-relaxed">{edu.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-12">
                    <h3 className="text-sm font-mono text-neutral-500 mb-4 tracking-widest uppercase">[{lang === 'en' ? 'Core Competencies' : 'Năng lực cốt lõi'}]</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-sm font-mono text-neutral-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certificates */}
                  <div className="mb-8">
                    <h3 className="text-sm font-mono text-neutral-500 mb-4 tracking-widest uppercase">[{lang === 'en' ? 'Certificates' : 'Chứng chỉ'}]</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.certificates.map((cert, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-sm font-mono text-neutral-300">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex justify-between items-center relative z-10">
                <div className="text-xs font-mono text-neutral-500 hidden md:block">
                  STATUS: <span className="text-green-500">READY FOR DOWNLOAD</span>
                </div>
                <a 
                  href="/CV_TrinhVanHao.pdf"
                  download="CV_TrinhVanHao.pdf"
                  className="w-full md:w-auto px-6 py-3 bg-white text-black font-mono font-bold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group rounded-lg"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  {lang === 'en' ? 'DOWNLOAD PDF' : 'TẢI XUỐNG PDF'}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};