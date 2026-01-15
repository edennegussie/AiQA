'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const reviewSubItems = [
  { id: 'christmas-card', name: 'Christmas Card', href: '/review/christmas-card', icon: '🎄', special: true },
  { id: 'child-greeting-photo', name: 'Child Greeting Photo', href: '/review/child-greeting-photo', icon: '📸' },
  { id: 'child-greeting-video', name: 'Child Greeting Video', href: '/review/child-greeting-video', icon: '🎬' },
  { id: 'child-intro-message', name: 'Child Intro Message', href: '/review/child-intro-message', icon: '💬' },
  { id: 'child-intro-video', name: 'Child Intro Video', href: '/review/child-intro-video', icon: '🎥' },
  { id: 'child-update-message', name: 'Child Update Message', href: '/review/child-update-message', icon: '📝' },
  { id: 'child-reply-message', name: 'Child Reply Message', href: '/review/child-reply-message', icon: '💌' },
];

const navItems = [
  {
    id: 'nav-analytics',
    name: 'Analytics',
    href: '/analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'nav-settings',
    name: 'Settings',
    href: '/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  // Auto-expand reviews menu if we're on a review page
  useEffect(() => {
    if (pathname.startsWith('/review')) {
      setReviewsExpanded(true);
    }
  }, [pathname]);

  const isReviewActive = pathname.startsWith('/review');

  return (
    <aside id="sidebar" className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar-bg border-r border-border overflow-y-auto">
      <div id="sidebar-content" className="p-4">
        {/* Quick Actions */}
        <div id="sidebar-quick-actions" className="mb-6">
          <button id="sidebar-new-review-btn" className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Review
          </button>
        </div>

        {/* Navigation */}
        <nav id="sidebar-nav" className="space-y-1">
          <p id="sidebar-nav-label" className="px-3 text-xs font-semibold text-muted uppercase tracking-wider mb-3">
            Navigation
          </p>
          
          {/* Dashboard */}
          <Link
            id="sidebar-nav-dashboard"
            href="/home"
            className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              pathname === '/home'
                ? 'bg-primary/10 text-primary font-medium active'
                : 'text-muted hover:bg-foreground/5 hover:text-foreground'
            }`}
          >
            <span id="sidebar-nav-dashboard-icon" className={pathname === '/home' ? 'text-primary' : ''}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            Dashboard
          </Link>

          {/* Reviews - Expandable */}
          <div id="sidebar-reviews-section">
            <button
              id="sidebar-reviews-toggle"
              onClick={() => setReviewsExpanded(!reviewsExpanded)}
              className={`w-full sidebar-link flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isReviewActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted hover:bg-foreground/5 hover:text-foreground'
              }`}
            >
              <div id="sidebar-reviews-label" className="flex items-center gap-3">
                <span id="sidebar-reviews-icon" className={isReviewActive ? 'text-primary' : ''}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </span>
                Reviews
              </div>
              <svg 
                id="sidebar-reviews-chevron"
                className={`w-4 h-4 transition-transform duration-200 ${reviewsExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expandable Sub-items */}
            <div id="sidebar-reviews-submenu" className={`overflow-hidden ${
              reviewsExpanded ? 'max-h-[500px]' : 'max-h-0'
            }`}>
              <div id="sidebar-reviews-list" className="mt-1 ml-4 pl-4 border-l-2 border-border space-y-1">
                {reviewSubItems.map((item) => {
                  const isSubActive = pathname === item.href;
                  const isChristmasCard = item.special;
                  
                  return (
                    <Link
                      key={item.id}
                      id={`sidebar-review-${item.id}`}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
                        isChristmasCard
                          ? pathname === '/review/christmas-card'
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted hover:bg-foreground/5 hover:text-foreground'
                          : isSubActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted hover:bg-foreground/5 hover:text-foreground'
                      }`}
                    >
                      <span id={`sidebar-review-${item.id}-icon`} className="text-base">{item.icon}</span>
                      <span id={`sidebar-review-${item.id}-text`} className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other Nav Items */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                id={item.id}
                href={item.href}
                className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium active'
                    : 'text-muted hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                <span id={`${item.id}-icon`} className={isActive ? 'text-primary' : ''}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}
