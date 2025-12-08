'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export default function Sidebar() {
  // State to manage expanded sections
  const [isServicesOpen, setIsServicesOpen] = useState(true);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(true);

  return (
    // Sixth Image Properties: width: 220; gap: 16px; padding: 8px 16px;
    <aside className="w-[220px] h-screen bg-[#F3F3F3] border-r border-gray-200 flex flex-col gap-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] fixed left-0 top-0 overflow-y-auto font-sans text-sm z-50">
      
      {/* Fourth & Fifth Image Properties: Profile Card */}
      {/* width: 188; height: 49; padding: 4px 8px; border: 1px solid; radius: 4px */}
      <div className="w-[188px] h-[49px] flex items-center justify-between pt-[4px] pr-[8px] pb-[4px] pl-[8px] bg-white border border-gray-200 rounded-[4px] cursor-pointer hover:bg-gray-50 transition-colors">
        {/* Inner Content - Fifth Image: gap: 8px */}
        <div className="flex items-center gap-[8px]">
          <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white">
            <Image src="/Logo.svg" alt="User Icon" width={22} height={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-gray-900 leading-tight">Vault</span>
            <span className="text-[11px] text-gray-500 leading-tight">Anurag Yadav</span>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Navigation List Container */}
      {/* Seventh Image Properties: width: 188; gap: 6px; */}
      <nav className="w-[188px] flex flex-col gap-[6px]">
        
        {/* Standard Nav Items */}
        {/* Eight Image Properties: width: 188; height: 24; padding: 4px 8px; gap: 8px */}
        <NavItem icon={<DashboardIcon />} label="Dashboard" />
        <NavItem icon={<NexusIcon />} label="Nexus" />
        <NavItem icon={<IntakeIcon />} label="Intake" />

        {/* Services Section */}
        {/* Ninth Image Properties: width: 188; padding: 8px; gap: 8px; rounded: 4px */}
        <div className="bg-white rounded-[4px] p-[8px] flex flex-col gap-[8px]">
          
          {/* Header - Tenth Image: width: 172; height: 24; justify-between; padding-y: 4px */}
          <button 
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="w-[172px] h-[24px] flex items-center justify-between py-[4px] text-gray-600 hover:text-gray-900"
          >
            <div className="flex items-center gap-[8px]">
              <ServicesIcon />
              <span className="font-medium">Services</span>
            </div>
            <svg 
              className={`w-3 h-3 text-gray-400 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Submenu Items */}
          {isServicesOpen && (
            <div className="flex flex-col gap-[6px] pl-[4px]">
               <NavItem icon={<PlayIcon />} label="Pre-active" />
               <NavItem icon={<PauseIcon />} label="Active" />
               <NavItem icon={<CloseIcon />} label="Blocked" />
               <NavItem icon={<CheckIcon />} label="Closed" />
            </div>
          )}
        </div>

        {/* Invoices Section (Reusing style logic from Services) */}
        <div className="bg-white rounded-[4px] p-[8px] flex flex-col gap-[8px]">
          <button 
            onClick={() => setIsInvoicesOpen(!isInvoicesOpen)}
            className="w-[172px] h-[24px] flex items-center justify-between py-[4px] text-gray-600 hover:text-gray-900"
          >
            <div className="flex items-center gap-[8px]">
              <InvoiceIcon />
              <span className="font-medium">Invoices</span>
            </div>
            <svg 
              className={`w-3 h-3 text-gray-400 transition-transform ${isInvoicesOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isInvoicesOpen && (
            <div className="flex flex-col gap-[6px] pl-[4px]">
               <NavItem icon={<ProformaIcon />} label="Proforma Invoices" active />
               <NavItem icon={<FinalIcon />} label="Final Invoices" />
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
}

// Reusable NavItem Component based on "Eight Image Properties"
function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`
        w-full h-[24px] flex items-center gap-[8px] px-[8px] py-[4px] rounded-[4px] text-[13px] transition-colors
        ${active ? 'font-semibold text-gray-900' : 'font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
      `}
    >
      <span className={`flex-shrink-0 ${active ? 'text-gray-900' : 'text-gray-400'}`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

// --- Icons ---

const DashboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

const NexusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IntakeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const ServicesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const InvoiceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ProformaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="12" cy="14" r="2" />
  </svg>
);

const FinalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15l2 2 4-4" />
  </svg>
);