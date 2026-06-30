import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TabTech {
  name: string
  logo: React.ReactNode
}

interface TechTab {
  name: string
  color: string
  technologies: TabTech[]
}

function SvgLogo({ viewBox, children, className = 'w-8 h-8' }: { viewBox: string; children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  )
}

const logos = {
  react: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" opacity="0.6" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" opacity="0.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" opacity="0.6" transform="rotate(120 12 12)" />
    </SvgLogo>
  ),
  typescript: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
      <path d="M13.5 17.5v2.2c.5.3 1.2.5 2 .5 1 0 1.7-.3 1.7-1 0-.6-.4-.9-1.2-1.2l-.7-.3c-1-.4-1.7-1-1.7-2 0-1.2 1-2 2.5-2 .8 0 1.4.2 1.9.5v-2c-.5-.3-1.2-.4-1.9-.4-1.8 0-3 1-3 2.4 0 1.2.7 1.8 1.5 2.2l.7.3c1 .4 1.5.9 1.5 1.7 0 .6-.5 1.2-1.7 1.2-.9 0-1.7-.2-2.1-.6zM9 11.5h-3v9H4v-9H1V9h8v2.5z" fill="white" />
    </SvgLogo>
  ),
  tailwind: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 4C8.5 4 6.2 5.8 5 9c1.5-1.6 3.2-2.2 5.1-1.4 1.1.5 1.9 1.3 2.8 2.2C14.5 11.5 16.2 13 20 13c3.5 0 5.8-1.8 7-5-1.5 1.6-3.2 2.2-5.1 1.4-1.1-.5-1.9-1.3-2.8-2.2C17.5 5.5 15.8 4 12 4zM5 13c-3.5 0-5.8 1.8-7 5 1.5-1.6 3.2-2.2 5.1-1.4 1.1.5 1.9 1.3 2.8 2.2C7.5 19.5 9.2 21 13 21c3.5 0 5.8-1.8 7-5-1.5 1.6-3.2 2.2-5.1 1.4-1.1-.5-1.9-1.3-2.8-2.2C10.5 14.5 8.8 13 5 13z" fill="#38BDF8" />
    </SvgLogo>
  ),
  vue: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 20h4.5L12 9l5.5 11H22L12 2z" fill="#4FC08D" />
      <path d="M12 9l-4 8h2.5L12 13l1.5 4H16l-4-8z" fill="#35495E" />
    </SvgLogo>
  ),
  framer: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#0055FF" />
      <path d="M7 7h10v3.3l-5 5H7V7z" fill="white" opacity="0.8" />
      <path d="M12 12l5 5H7l5-5z" fill="white" opacity="0.5" />
    </SvgLogo>
  ),
  threejs: (
    <SvgLogo viewBox="0 0 24 24">
      <polygon points="12,2 22,20 2,20" fill="none" stroke="#000" strokeWidth="1.5" />
      <line x1="12" y1="2" x2="12" y2="20" stroke="#000" strokeWidth="1.2" />
      <line x1="2" y1="20" x2="22" y2="20" stroke="#000" strokeWidth="1.2" />
      <line x1="7" y1="11" x2="17" y2="11" stroke="#000" strokeWidth="1" opacity="0.5" />
    </SvgLogo>
  ),
  nextjs: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#000" />
      <path d="M16 8v8h-1.5V9.7L10.2 16H9V8h1.5v6.3L15.3 8H16z" fill="white" />
      <circle cx="17.5" cy="8.5" r="1" fill="white" />
    </SvgLogo>
  ),
  nodejs: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#339933" />
      <path d="M12 2v20l10-5V7l-10-5z" fill="#76D04B" opacity="0.6" />
      <path d="M7.5 9.5h3l-1.5 8h-3l1.5-8z" fill="white" />
    </SvgLogo>
  ),
  python: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C7.5 2 6.5 3.5 6.5 5.5V7H12v1H5.5C3.5 8 2 9.5 2 12c0 2.5 1.5 4 4.5 4h2v-2c0-2 1.5-3.5 3.5-3.5h5c2 0 3.5-1.5 3.5-3.5V5.5C21 3.5 19.5 2 17 2h-5z" fill="#3776AB" />
      <circle cx="9" cy="5" r="1" fill="white" />
      <path d="M12 22c4.5 0 5.5-1.5 5.5-3.5V17H12v-1h6.5c2 0 3.5-1.5 3.5-3.5 0-2.5-1.5-4-4.5-4h-2v2c0 2-1.5 3.5-3.5 3.5h-5c-2 0-3.5 1.5-3.5 3.5v1c0 2 1.5 3.5 4 3.5h5z" fill="#FFD43B" />
      <circle cx="15" cy="19" r="1" fill="white" />
    </SvgLogo>
  ),
  go: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M2 12l5-4 5 4-5 4-5-4z" fill="#00ADD8" opacity="0.7" />
      <path d="M7 8l5 4-5 4V8z" fill="#00ADD8" />
      <path d="M12 8l5 4-5 4V8z" fill="#00ADD8" opacity="0.5" />
      <path d="M17 8l5 4-5 4V8z" fill="#00ADD8" opacity="0.3" />
    </SvgLogo>
  ),
  graphql: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="4" r="2" fill="#E10098" />
      <circle cx="12" cy="20" r="2" fill="#E10098" />
      <circle cx="4" cy="8" r="2" fill="#E10098" />
      <circle cx="20" cy="8" r="2" fill="#E10098" />
      <circle cx="4" cy="16" r="2" fill="#E10098" />
      <circle cx="20" cy="16" r="2" fill="#E10098" />
      <line x1="12" y1="4" x2="4" y2="8" stroke="#E10098" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="4" x2="20" y2="8" stroke="#E10098" strokeWidth="1" opacity="0.5" />
      <line x1="4" y1="8" x2="4" y2="16" stroke="#E10098" strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="8" x2="20" y2="16" stroke="#E10098" strokeWidth="1" opacity="0.5" />
      <line x1="4" y1="16" x2="12" y2="20" stroke="#E10098" strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="16" x2="12" y2="20" stroke="#E10098" strokeWidth="1" opacity="0.5" />
    </SvgLogo>
  ),
  aws: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" fill="#FF9900" opacity="0.8" />
      <path d="M12 4v16M4 8l8 4 8-4" stroke="#FF9900" strokeWidth="0.8" fill="none" />
      <path d="M9 9v4l3 2 3-2V9l-3-2-3 2z" fill="#FF9900" opacity="0.4" />
    </SvgLogo>
  ),
  gcp: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2l7 4v8l-7 4-7-4V6l7-4z" fill="#4285F4" opacity="0.9" />
      <path d="M12 2v20l7-4V6l-7-4z" fill="#34A853" opacity="0.5" />
      <path d="M12 10l-3 2v4l3 2 3-2v-4l-3-2z" fill="#EA4335" opacity="0.6" />
    </SvgLogo>
  ),
  azure: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M8 2l8 3-3 12-5-3 2-7-4-2 2-3z" fill="#0078D4" />
      <path d="M6 12l8 3-2 7-6-4v-6z" fill="#0078D4" opacity="0.6" />
      <rect x="2" y="16" width="20" height="2" rx="1" fill="#0078D4" opacity="0.3" />
    </SvgLogo>
  ),
  kubernetes: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" fill="#326CE5" />
      <circle cx="12" cy="12" r="8" stroke="#326CE5" strokeWidth="1.2" fill="none" />
      <line x1="12" y1="4" x2="12" y2="9" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="20" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="4" y1="12" x2="9" y2="12" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="15" y1="12" x2="20" y2="12" stroke="#326CE5" strokeWidth="1.5" />
      <line x1="6" y1="6" x2="9.5" y2="9.5" stroke="#326CE5" strokeWidth="1.2" />
      <line x1="14.5" y1="14.5" x2="18" y2="18" stroke="#326CE5" strokeWidth="1.2" />
      <line x1="18" y1="6" x2="14.5" y2="9.5" stroke="#326CE5" strokeWidth="1.2" />
      <line x1="9.5" y1="14.5" x2="6" y2="18" stroke="#326CE5" strokeWidth="1.2" />
    </SvgLogo>
  ),
  terraform: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="#844FBA" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="#844FBA" opacity="0.7" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="#844FBA" opacity="0.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="#844FBA" opacity="0.3" />
    </SvgLogo>
  ),
  vercel: (
    <SvgLogo viewBox="0 0 24 24">
      <polygon points="12,2 22,22 2,22" fill="#000" />
    </SvgLogo>
  ),
  docker: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="2" y="10" width="3" height="4" rx="0.5" fill="#2496ED" />
      <rect x="6" y="10" width="3" height="4" rx="0.5" fill="#2496ED" />
      <rect x="10" y="10" width="3" height="4" rx="0.5" fill="#2496ED" />
      <rect x="6" y="6" width="3" height="4" rx="0.5" fill="#2496ED" opacity="0.7" />
      <rect x="10" y="6" width="3" height="4" rx="0.5" fill="#2496ED" opacity="0.7" />
      <rect x="14" y="10" width="3" height="4" rx="0.5" fill="#2496ED" />
      <path d="M14 12c0 0 1-4 5-4 1 0 2 0 3 1-1 1-2 3-8 3H2" stroke="#2496ED" strokeWidth="1.5" fill="none" />
    </SvgLogo>
  ),
  angular: (
    <SvgLogo viewBox="0 0 24 24">
      <polygon points="12,2 3,6 5,19 12,22 19,19 21,6" fill="#DD0031" />
      <polygon points="12,2 12,22 19,19 21,6" fill="#C3002F" opacity="0.6" />
      <path d="M12 7l-3 8h2l1-2.5h2l1 2.5h2l-3-8h-2z" fill="white" />
    </SvgLogo>
  ),
  svelte: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="#FF3E00" />
      <path d="M15 8l-5 5 3 3-6 3 2-6 3 3 5-5-3-3 6-3-2 6-3-3z" fill="white" />
    </SvgLogo>
  ),
  vite: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 20h4l6-11 6 11h4L12 2z" fill="#646CFF" />
      <path d="M12 9l-3 7h2l1-3 1 3h2l-3-7z" fill="#BD34FE" />
    </SvgLogo>
  ),
  redux: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="6" r="3" fill="#764ABC" />
      <circle cx="6" cy="18" r="3" fill="#764ABC" opacity="0.7" />
      <circle cx="18" cy="18" r="3" fill="#764ABC" opacity="0.5" />
      <path d="M12 6l-3 12M12 6l3 12M6 18l12 0" stroke="#764ABC" strokeWidth="0.8" fill="none" opacity="0.4" />
    </SvgLogo>
  ),
  rust: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="#000" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" fill="#000" />
      <line x1="12" y1="3" x2="12" y2="7" stroke="#000" strokeWidth="1.2" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="#000" strokeWidth="1.2" />
      <line x1="3" y1="12" x2="7" y2="12" stroke="#000" strokeWidth="1.2" />
      <line x1="17" y1="12" x2="21" y2="12" stroke="#000" strokeWidth="1.2" />
    </SvgLogo>
  ),
  mongodb: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C8 2 4 5 4 9c0 3 2 6 4 8v4l4 2 4-2v-4c2-2 4-5 4-8 0-4-4-7-8-7z" fill="#47A248" opacity="0.8" />
      <path d="M12 2v20M8 9h8" stroke="#47A248" strokeWidth="1" fill="none" />
    </SvgLogo>
  ),
  redis: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2l8 3-8 3-8-3 8-3z" fill="#DC382D" />
      <path d="M20 5v5l-8 3-8-3V5l8 3 8-3z" fill="#DC382D" opacity="0.6" />
      <path d="M20 10v5l-8 3-8-3v-5l8 3 8-3z" fill="#DC382D" opacity="0.4" />
      <path d="M20 15v2l-8 3-8-3v-2l8 3 8-3z" fill="#DC382D" opacity="0.2" />
    </SvgLogo>
  ),
  postgresql: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C9 2 7 4 7 7v3c0 1-.5 2-1.5 2.5L4 14v2l3-1c1-.3 2-1 2-2V7c0-2 1.5-3.5 3.5-3.5S14 5 14 7v10c0 2.5-1.5 4-3.5 4S7 19.5 7 17" stroke="#336791" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="6" r="1" fill="#336791" />
    </SvgLogo>
  ),
  kafka: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" fill="#231F20" />
      <line x1="12" y1="9" x2="12" y2="3" stroke="#231F20" strokeWidth="2" />
      <line x1="12" y1="15" x2="12" y2="21" stroke="#231F20" strokeWidth="2" />
      <line x1="9" y1="12" x2="3" y2="12" stroke="#231F20" strokeWidth="2" />
      <line x1="15" y1="12" x2="21" y2="12" stroke="#231F20" strokeWidth="2" />
      <circle cx="12" cy="3" r="1.5" fill="#231F20" />
      <circle cx="12" cy="21" r="1.5" fill="#231F20" />
      <circle cx="3" cy="12" r="1.5" fill="#231F20" />
      <circle cx="21" cy="12" r="1.5" fill="#231F20" />
    </SvgLogo>
  ),
  snowflake: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" stroke="#29B5E8" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3" fill="#29B5E8" />
    </SvgLogo>
  ),
  airflow: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M3 18l6-8 4 2 8-10" stroke="#017CEE" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="3" cy="18" r="2" fill="#017CEE" />
      <circle cx="9" cy="10" r="2" fill="#017CEE" />
      <circle cx="13" cy="12" r="2" fill="#017CEE" />
      <circle cx="21" cy="2" r="2" fill="#017CEE" />
    </SvgLogo>
  ),
  langchain: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="4" r="2.5" fill="#1C3C3C" />
      <circle cx="4" cy="20" r="2.5" fill="#1C3C3C" />
      <circle cx="20" cy="20" r="2.5" fill="#1C3C3C" />
      <line x1="12" y1="6.5" x2="5.5" y2="17.5" stroke="#1C3C3C" strokeWidth="1" />
      <line x1="12" y1="6.5" x2="18.5" y2="17.5" stroke="#1C3C3C" strokeWidth="1" />
      <line x1="6.5" y1="18" x2="17.5" y2="18" stroke="#1C3C3C" strokeWidth="1" />
    </SvgLogo>
  ),
  openai: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M11 2L4 20h4l3-9 3 9h4L13 2h-2z" fill="#10A37F" />
      <circle cx="12" cy="12" r="2" fill="white" opacity="0.3" />
    </SvgLogo>
  ),
  anthropic: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#D4A574" opacity="0.3" />
      <path d="M8 8l4 8 4-8" stroke="#D4A574" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M10 8l2 4 2-4" stroke="#D4A574" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </SvgLogo>
  ),
  pinecone: (
    <SvgLogo viewBox="0 0 24 24">
      <polygon points="12,2 22,12 12,22 2,12" fill="#F97316" opacity="0.2" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="#F97316" strokeWidth="1.5" />
      <line x1="12" y1="9" x2="12" y2="6" stroke="#F97316" strokeWidth="1.5" />
      <line x1="12" y1="15" x2="12" y2="18" stroke="#F97316" strokeWidth="1.5" />
      <line x1="9" y1="12" x2="6" y2="12" stroke="#F97316" strokeWidth="1.5" />
      <line x1="15" y1="12" x2="18" y2="12" stroke="#F97316" strokeWidth="1.5" />
    </SvgLogo>
  ),
  n8n: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="2" y="10" width="6" height="4" rx="1" fill="#EA4B71" />
      <rect x="16" y="10" width="6" height="4" rx="1" fill="#EA4B71" />
      <rect x="9" y="3" width="6" height="4" rx="1" fill="#EA4B71" />
      <rect x="9" y="17" width="6" height="4" rx="1" fill="#EA4B71" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="#EA4B71" strokeWidth="1.5" />
      <line x1="12" y1="7" x2="12" y2="10" stroke="#EA4B71" strokeWidth="1.5" />
      <line x1="12" y1="14" x2="12" y2="17" stroke="#EA4B71" strokeWidth="1.5" />
    </SvgLogo>
  ),
  zapier: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M4 20l8-16 8 16H4z" fill="#FF4A00" opacity="0.8" />
      <path d="M12 4v16" stroke="white" strokeWidth="1.5" />
      <path d="M4 20h16" stroke="white" strokeWidth="1.5" />
    </SvgLogo>
  ),
  ghactions: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#2088FF" />
      <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </SvgLogo>
  ),
  dbt: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#FF694B" />
      <path d="M8 8h3l-1 8H7l1-8z" fill="white" />
      <path d="M13 8h3l-1 8h-3l1-8z" fill="white" opacity="0.6" />
    </SvgLogo>
  ),
  mysql: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C7 2 3 6 3 11c0 6 4 9 9 9v2c4-1 7-4 9-8 1-2 1-4 0-6" fill="#4479A1" />
      <circle cx="12" cy="11" r="4" fill="#4479A1" opacity="0.5" />
      <path d="M12 7v4l2 2" stroke="white" strokeWidth="1.2" fill="none" />
    </SvgLogo>
  ),
  reactnative: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C8 2 5 4 5 7c0 2 1.5 4 4 5-2 1-4 3-4 5 0 3 3 5 7 5s7-2 7-5c0-2-2-4-4-5 2.5-1 4-3 4-5 0-3-3-5-7-5z" fill="#61DAFB" opacity="0.6" />
      <circle cx="12" cy="7" r="1.5" fill="#61DAFB" />
      <circle cx="12" cy="17" r="1.5" fill="#61DAFB" />
      <circle cx="8" cy="12" r="1.5" fill="#61DAFB" />
      <circle cx="16" cy="12" r="1.5" fill="#61DAFB" />
    </SvgLogo>
  ),
  swift: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#F05138" />
      <path d="M8 16c2 2 5 2 7 0s2-5 1-8l-4 4 2-4c-3-1-7 1-8 4s0 5 2 7z" fill="white" />
    </SvgLogo>
  ),
  kotlin: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#7F52FF" />
      <polygon points="12,12 3,21 3,3" fill="white" opacity="0.9" />
      <polygon points="12,12 21,3 3,21" fill="white" opacity="0.5" />
    </SvgLogo>
  ),
  flutter: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M5 14l4-4 7 7-4 4H5v-7z" fill="#02569B" />
      <path d="M9 10l4-4 7 7-4 4-7-7z" fill="#13B9FD" />
      <path d="M9 10l4-4" stroke="#02569B" strokeWidth="1" />
    </SvgLogo>
  ),
  prometheus: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#E6522C" />
      <path d="M8 14h8M12 8v4M10 10h4" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M12 17c-2 0-3-1-3-2h6c0 1-1 2-3 2z" fill="white" />
    </SvgLogo>
  ),
  grafana: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#F46800" opacity="0.15" />
      <path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8z" fill="none" stroke="#F46800" strokeWidth="1.5" />
      <path d="M12 8v4l2 2" stroke="#F46800" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1" fill="#F46800" />
    </SvgLogo>
  ),
  datadog: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M4 18c2-4 4-8 8-8s6 4 8 8" stroke="#632CA6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="6" cy="18" r="1.5" fill="#632CA6" />
      <circle cx="12" cy="18" r="1.5" fill="#632CA6" />
      <circle cx="18" cy="18" r="1.5" fill="#632CA6" />
    </SvgLogo>
  ),
  caddy: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#00ADF2" opacity="0.8" />
      <path d="M12 12l-4 4 4-4 4 4-4-4z" fill="white" />
    </SvgLogo>
  ),
  nginx: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#009639" />
      <path d="M9 8v8l4-4v4l4-4v-4l-4 4V8H9z" fill="white" />
    </SvgLogo>
  ),
  prisma: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 20h20L12 2z" fill="#2D3748" />
      <path d="M12 6l-5 11h10L12 6z" fill="white" opacity="0.9" />
    </SvgLogo>
  ),
  supabase: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 22h12l-2-10h10L12 2z" fill="#3ECF8E" />
      <path d="M12 2v10h10" fill="#3ECF8E" opacity="0.5" />
    </SvgLogo>
  ),
  elastic: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M4 4h7v7H4V4z" fill="#005571" />
      <path d="M4 13h7v7H4v-7z" fill="#005571" opacity="0.6" />
      <path d="M13 4h7v16h-7V4z" fill="#005571" opacity="0.4" />
    </SvgLogo>
  ),
  rabbitmq: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M3 3h8v8H3V3z" fill="#FF6600" />
      <path d="M3 13h8v8H3v-8z" fill="#FF6600" opacity="0.6" />
      <path d="M13 3h8v8h-8V3z" fill="#FF6600" opacity="0.6" />
      <path d="M13 13h8v8h-8v-8z" fill="#FF6600" opacity="0.3" />
    </SvgLogo>
  ),
  argo: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="#EF7B4D" strokeWidth="1.5" fill="none" />
      <path d="M12 3v6l2-2M12 9l-2-2" stroke="#EF7B4D" strokeWidth="1.2" fill="none" />
      <path d="M12 21v-6l2 2M12 15l-2 2" stroke="#EF7B4D" strokeWidth="1.2" fill="none" />
    </SvgLogo>
  ),
  hashicorp: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="#000" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="#000" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="#000" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="#000" />
    </SvgLogo>
  ),
  wordpress: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#21759B" />
      <path d="M4 12c0 3 1.5 5.5 4 7l-2.5-7.5C5 10 5 9 5.5 8M20 12c0-3-1.5-5.5-4-7l2.5 7.5c.5 1.5.5 2.5 0 3.5" stroke="white" strokeWidth="1" fill="none" />
      <path d="M12 4l-3 9h6l-3-9z" fill="white" opacity="0.8" />
    </SvgLogo>
  ),
  shopify: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M4 7l2 13h12l2-13H4z" fill="#96BF48" />
      <path d="M8 7c0-2 2-3 4-3s4 1 4 3" stroke="#96BF48" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="13" r="3" fill="white" opacity="0.4" />
    </SvgLogo>
  ),
  strapi: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#2F2E8B" />
      <path d="M7 7h10v3H7V7z" fill="white" />
      <path d="M7 12h7v3H7v-3z" fill="white" opacity="0.7" />
      <path d="M7 17h4v3H7v-3z" fill="white" opacity="0.4" />
    </SvgLogo>
  ),
  sanity: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#F97316" />
      <path d="M8 8h8v2H8V8z" fill="white" />
      <path d="M8 12h6v2H8v-2z" fill="white" opacity="0.7" />
      <path d="M8 16h4v2H8v-2z" fill="white" opacity="0.4" />
    </SvgLogo>
  ),
  contentful: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#2478CC" />
      <path d="M8 12c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" fill="white" opacity="0.8" />
      <circle cx="12" cy="12" r="2" fill="#2478CC" />
    </SvgLogo>
  ),
  planetscale: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#000" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M12 8v8" stroke="white" strokeWidth="1.5" />
    </SvgLogo>
  ),
  turborepo: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#EF4444" opacity="0.15" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="12" y1="3" x2="12" y2="8" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="12" y1="16" x2="12" y2="21" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="8" y2="12" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="16" y1="12" x2="21" y2="12" stroke="#EF4444" strokeWidth="1.5" />
    </SvgLogo>
  ),
  deno: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#000" />
      <path d="M8 12c0-2 2-4 4-4M8 12c0 2 2 4 4 4" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="9" r="1" fill="white" />
    </SvgLogo>
  ),
  express: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M2 17c2-4 4-7 6-3 0 3-1 5-2 7" stroke="#000" strokeWidth="1.5" fill="none" />
      <path d="M8 8c1 3 2 6 3 9" stroke="#000" strokeWidth="1.5" fill="none" />
      <path d="M11 8c2 4 4 6 7 6" stroke="#000" strokeWidth="1.5" fill="none" />
      <path d="M18 8c-1 2-1 4 0 6" stroke="#000" strokeWidth="1.5" fill="none" />
    </SvgLogo>
  ),
  fastapi: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2l-7 12h5v8l7-12h-5V2z" fill="#009688" />
    </SvgLogo>
  ),
  nestjs: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2l10 5v10l-10 5L2 17V7l10-5z" fill="#E0234E" />
      <path d="M12 7v10M7 9v6M17 9v6" stroke="white" strokeWidth="1" fill="none" />
    </SvgLogo>
  ),
  csharp: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z" fill="#68217A" />
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 7l-2 10" stroke="white" strokeWidth="1.5" fill="none" />
    </SvgLogo>
  ),
  clickhouse: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="2" y="5" width="4" height="14" rx="0.5" fill="#FCCB00" />
      <rect x="8" y="5" width="4" height="14" rx="0.5" fill="#FCCB00" />
      <rect x="14" y="5" width="4" height="14" rx="0.5" fill="#FCCB00" />
      <rect x="20" y="10" width="2" height="4" rx="0.5" fill="#FCCB00" />
    </SvgLogo>
  ),
  bigquery: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#4285F4" />
      <path d="M12 7v5l3 3" stroke="white" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5" />
    </SvgLogo>
  ),
  serverless: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M3 18h18M6 14h14M9 10h12M12 6h10" stroke="#FD5750" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </SvgLogo>
  ),
  pulumi: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#8A3391" opacity="0.2" />
      <path d="M12 4l6 3v5l-6 3-6-3V7l6-3z" fill="#8A3391" />
    </SvgLogo>
  ),
  webpack: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#8DD6F9" opacity="0.2" />
      <path d="M12 2l8 4v12l-8 4-8-4V6l8-4z" fill="none" stroke="#8DD6F9" strokeWidth="1.2" />
      <path d="M12 6v12M8 8v8M16 8v8" stroke="#8DD6F9" strokeWidth="1" fill="none" />
    </SvgLogo>
  ),
  eslint: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2l10 5v10l-10 5L2 17V7l10-5z" fill="#4B32C3" />
      <path d="M12 7l-4 2v4l4 2 4-2v-4l-4-2z" fill="white" opacity="0.8" />
    </SvgLogo>
  ),
  prettier: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="#F7B93E" />
      <path d="M7 16h10M7 12h6M7 8h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </SvgLogo>
  ),
  sentry: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 2L2 20h4l6-12 6 12h4L12 2z" fill="#362D59" />
      <path d="M12 10l-3 6h6l-3-6z" fill="#FB4226" />
    </SvgLogo>
  ),
  circleci: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="#343434" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="#343434" />
      <path d="M12 3l-4 9h8l-4-9z" fill="#343434" opacity="0.3" />
    </SvgLogo>
  ),
  figma: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="8" cy="6" r="3" fill="#F24E1E" />
      <circle cx="14" cy="6" r="3" fill="#FF7262" />
      <rect x="8" y="9" width="6" height="6" fill="#A259FF" />
      <circle cx="8" cy="15" r="3" fill="#1ABCFE" />
      <circle cx="14" cy="15" r="3" fill="#0ACF83" />
    </SvgLogo>
  ),
  storybook: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="2" width="18" height="20" rx="3" fill="#FF4785" />
      <path d="M12 6v6l2-2M12 12l-2-2" stroke="white" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="16" r="1.5" fill="white" />
    </SvgLogo>
  ),
  nx: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#143055" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </SvgLogo>
  ),
  tailwindcss: (
    <SvgLogo viewBox="0 0 24 24">
      <path d="M12 4C8.5 4 6.2 5.8 5 9c1.5-1.6 3.2-2.2 5.1-1.4 1.1.5 1.9 1.3 2.8 2.2C14.5 11.5 16.2 13 20 13c3.5 0 5.8-1.8 7-5-1.5 1.6-3.2 2.2-5.1 1.4-1.1-.5-1.9-1.3-2.8-2.2C17.5 5.5 15.8 4 12 4zM5 13c-3.5 0-5.8 1.8-7 5 1.5-1.6 3.2-2.2 5.1-1.4 1.1.5 1.9 1.3 2.8 2.2C7.5 19.5 9.2 21 13 21c3.5 0 5.8-1.8 7-5-1.5 1.6-3.2 2.2-5.1 1.4-1.1-.5-1.9-1.3-2.8-2.2C10.5 14.5 8.8 13 5 13z" fill="#38BDF8" />
    </SvgLogo>
  ),
  shadcn: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#000" />
      <path d="M8 16l8-8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </SvgLogo>
  ),
  turbopack: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#000" />
      <path d="M12 5l5 7-5 7-5-7 5-7z" fill="none" stroke="white" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </SvgLogo>
  ),
  electron: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3" fill="#47848F" />
      <circle cx="7" cy="18" r="2.5" fill="#47848F" opacity="0.6" />
      <circle cx="17" cy="18" r="2.5" fill="#47848F" opacity="0.6" />
      <path d="M12 11l-3.5 5.5M12 11l3.5 5.5" stroke="#47848F" strokeWidth="1" fill="none" />
    </SvgLogo>
  ),
  webrtc: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="#333" opacity="0.1" />
      <path d="M8 10c0-2 2-4 4-4s4 2 4 4v4c0 2-2 4-4 4s-4-2-4-4v-4z" fill="none" stroke="#F6582A" strokeWidth="1.5" />
      <line x1="12" y1="6" x2="12" y2="14" stroke="#F6582A" strokeWidth="1.5" />
      <line x1="8" y1="14" x2="16" y2="14" stroke="#F6582A" strokeWidth="1.5" />
    </SvgLogo>
  ),
  weaviate: (
    <SvgLogo viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="#00A3FF" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" fill="#00A3FF" />
      <line x1="12" y1="3" x2="12" y2="9" stroke="#00A3FF" strokeWidth="1.2" />
      <line x1="12" y1="15" x2="12" y2="21" stroke="#00A3FF" strokeWidth="1.2" />
    </SvgLogo>
  ),
  make: (
    <SvgLogo viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#6D00E6" />
      <path d="M7 7h3v10H7V7z" fill="white" />
      <path d="M14 10h3v7h-3v-7z" fill="white" opacity="0.7" />
      <path d="M10.5 7h3v3h-3V7z" fill="white" opacity="0.5" />
    </SvgLogo>
  ),
}

const tabs: TechTab[] = [
  {
    name: 'Frontend',
    color: 'from-blue-500 to-indigo-600',
    technologies: [
      { name: 'React / Next.js', logo: logos.react },
      { name: 'TypeScript', logo: logos.typescript },
      { name: 'Tailwind CSS v4', logo: logos.tailwind },
      { name: 'Vue.js', logo: logos.vue },
      { name: 'Angular', logo: logos.angular },
      { name: 'Svelte', logo: logos.svelte },
      { name: 'Framer Motion', logo: logos.framer },
      { name: 'React Three Fiber', logo: logos.threejs },
      { name: 'Vite', logo: logos.vite },
      { name: 'Redux / Zustand', logo: logos.redux },
      { name: 'Webpack / Turbopack', logo: logos.webpack },
      { name: 'shadcn/ui', logo: logos.shadcn },
      { name: 'Storybook', logo: logos.storybook },
      { name: 'ESLint / Prettier', logo: logos.eslint },
    ],
  },
  {
    name: 'Backend',
    color: 'from-green-500 to-emerald-600',
    technologies: [
      { name: 'Node.js / Express', logo: logos.nodejs },
      { name: 'NestJS', logo: logos.nestjs },
      { name: 'Python / FastAPI', logo: logos.python },
      { name: 'Go', logo: logos.go },
      { name: 'Rust', logo: logos.rust },
      { name: 'Deno', logo: logos.deno },
      { name: 'C# / .NET', logo: logos.csharp },
      { name: 'PostgreSQL', logo: logos.postgresql },
      { name: 'GraphQL / REST', logo: logos.graphql },
      { name: 'Redis', logo: logos.redis },
      { name: 'Prisma ORM', logo: logos.prisma },
      { name: 'RabbitMQ', logo: logos.rabbitmq },
      { name: 'Nginx / Caddy', logo: logos.nginx },
      { name: 'WebRTC', logo: logos.webrtc },
    ],
  },
  {
    name: 'Mobile',
    color: 'from-purple-500 to-violet-600',
    technologies: [
      { name: 'React Native', logo: logos.reactnative },
      { name: 'Flutter', logo: logos.flutter },
      { name: 'Swift / iOS', logo: logos.swift },
      { name: 'Kotlin / Android', logo: logos.kotlin },
      { name: 'Expo', logo: logos.reactnative },
      { name: 'Electron', logo: logos.electron },
    ],
  },
  {
    name: 'Cloud & DevOps',
    color: 'from-orange-500 to-red-600',
    technologies: [
      { name: 'AWS', logo: logos.aws },
      { name: 'Google Cloud', logo: logos.gcp },
      { name: 'Azure', logo: logos.azure },
      { name: 'Kubernetes', logo: logos.kubernetes },
      { name: 'Docker', logo: logos.docker },
      { name: 'Terraform / Pulumi', logo: logos.terraform },
      { name: 'Vercel / Cloudflare', logo: logos.vercel },
      { name: 'GitHub Actions', logo: logos.ghactions },
      { name: 'CircleCI', logo: logos.circleci },
      { name: 'ArgoCD', logo: logos.argo },
      { name: 'Prometheus', logo: logos.prometheus },
      { name: 'Grafana', logo: logos.grafana },
      { name: 'Datadog', logo: logos.datadog },
      { name: 'Sentry', logo: logos.sentry },
    ],
  },
  {
    name: 'AI & Agents',
    color: 'from-violet-500 to-purple-600',
    technologies: [
      { name: 'OpenAI / GPT-4', logo: logos.openai },
      { name: 'Anthropic Claude', logo: logos.anthropic },
      { name: 'LangChain / LangGraph', logo: logos.langchain },
      { name: 'Pinecone / Weaviate', logo: logos.pinecone },
      { name: 'Custom Agent Frameworks', logo: logos.langchain },
      { name: 'RAG Pipelines', logo: logos.weaviate },
    ],
  },
  {
    name: 'Automation',
    color: 'from-cyan-500 to-blue-600',
    technologies: [
      { name: 'n8n', logo: logos.n8n },
      { name: 'Make.com', logo: logos.make },
      { name: 'Zapier', logo: logos.zapier },
      { name: 'CI/CD Pipelines', logo: logos.ghactions },
      { name: 'Infrastructure as Code', logo: logos.terraform },
      { name: 'GitHub Actions', logo: logos.ghactions },
      { name: 'Monitoring & Alerting', logo: logos.grafana },
    ],
  },
  {
    name: 'Database & Data',
    color: 'from-pink-500 to-rose-600',
    technologies: [
      { name: 'PostgreSQL', logo: logos.postgresql },
      { name: 'MongoDB', logo: logos.mongodb },
      { name: 'Redis', logo: logos.redis },
      { name: 'MySQL', logo: logos.mysql },
      { name: 'Snowflake / BigQuery', logo: logos.snowflake },
      { name: 'ClickHouse', logo: logos.clickhouse },
      { name: 'Kafka / Redpanda', logo: logos.kafka },
      { name: 'dbt / Airflow', logo: logos.dbt },
      { name: 'Elasticsearch', logo: logos.elastic },
      { name: 'Supabase', logo: logos.supabase },
      { name: 'PlanetScale', logo: logos.planetscale },
      { name: 'RabbitMQ', logo: logos.rabbitmq },
      { name: 'Serverless DB', logo: logos.serverless },
    ],
  },
  {
    name: 'CMS & E-Commerce',
    color: 'from-amber-500 to-yellow-600',
    technologies: [
      { name: 'WordPress / WooCommerce', logo: logos.wordpress },
      { name: 'Shopify', logo: logos.shopify },
      { name: 'Strapi', logo: logos.strapi },
      { name: 'Sanity', logo: logos.sanity },
      { name: 'Contentful', logo: logos.contentful },
      { name: 'Nx Monorepo', logo: logos.nx },
      { name: 'Turborepo', logo: logos.turborepo },
    ],
  },
]

export function EngineeringEcosystem() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      id="technology"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ y: [-20, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6 border border-primary/20"
          >
            Technology Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-heading)] mb-6 text-balance"
          >
            Enterprise-grade{' '}
            <span className="gradient-text">tech ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            A comprehensive technology stack spanning frontend, backend, AI, cloud, data, and beyond — 
            carefully curated to ship enterprise-grade solutions at scale.
          </motion.p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                index === activeTab
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25'
                  : 'bg-card/50 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* Tech grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3"
          >
            {tabs[activeTab].technologies.map((tech) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="group relative p-4 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.15] transition-all duration-300 text-center flex flex-col items-center gap-3"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                  {tech.logo}
                </div>
                <span className="relative text-[11px] font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300 leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
