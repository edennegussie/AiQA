'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';

const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
  'child-greeting-photo': {
    name: 'Child Greeting Photo',
    icon: '📸',
    description: 'Review and approve greeting photos from sponsored children',
  },
  'child-greeting-video': {
    name: 'Child Greeting Video',
    icon: '🎬',
    description: 'Review and approve greeting videos from sponsored children',
  },
  'child-intro-message': {
    name: 'Child Intro Message',
    icon: '💬',
    description: 'Review and approve introduction messages from sponsored children',
  },
  'child-intro-video': {
    name: 'Child Intro Video',
    icon: '🎥',
    description: 'Review and approve introduction videos from sponsored children',
  },
  'child-update-message': {
    name: 'Child Update Message',
    icon: '📝',
    description: 'Review and approve update messages from sponsored children',
  },
  'child-reply-message': {
    name: 'Child Reply Message',
    icon: '💌',
    description: 'Review and approve reply messages from sponsored children',
  },
};

export default function CategoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // Redirect to christmas-card page if that's the category
  useEffect(() => {
    if (category === 'christmas-card') {
      router.push('/review/christmas-card');
    }
  }, [category, router]);

  if (isLoading || !user) {
    return (
      <div id="category-loading" className="min-h-screen flex items-center justify-center bg-background">
        <div id="category-loading-spinner" className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const info = categoryInfo[category];

  if (!info) {
    return (
      <div id="category-not-found-page" className="min-h-screen bg-background pt-16">
        <Sidebar />
        <main id="category-not-found-main" className="ml-64 p-8">
          <div id="category-not-found-content" className="max-w-2xl mx-auto text-center py-20">
            <div id="category-not-found-icon" className="text-6xl mb-6">❓</div>
            <h1 id="category-not-found-title" className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p id="category-not-found-message" className="text-muted mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              id="category-not-found-back-btn"
              href="/review"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Reviews
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id={`category-${category}-page`} className="min-h-screen bg-background pt-16">
      <Sidebar />
      
      <main id={`category-${category}-main`} className="ml-64 p-8">
        <div id={`category-${category}-container`} className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div id={`category-${category}-breadcrumb`} className="flex items-center gap-2 text-sm text-muted mb-8">
            <Link id={`category-${category}-breadcrumb-reviews`} href="/review" className="hover:text-foreground transition-colors">Reviews</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span id={`category-${category}-breadcrumb-current`} className="text-foreground">{info.name}</span>
          </div>

          {/* Under Construction Card */}
          <div id={`category-${category}-card`} className="bg-card-bg rounded-3xl border border-border p-12 text-center">
            {/* Animated Icon */}
            <div id={`category-${category}-icon-wrapper`} className="relative inline-block mb-8">
              <div id={`category-${category}-icon`} className="text-8xl animate-bounce">{info.icon}</div>
              <div id={`category-${category}-icon-shadow`} className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/10 rounded-full blur-sm"></div>
            </div>

            {/* Construction Icon */}
            <div id={`category-${category}-construction-icons`} className="flex items-center justify-center gap-3 mb-6">
              <span id={`category-${category}-construction-icon-1`} className="text-4xl">🚧</span>
              <span id={`category-${category}-construction-icon-2`} className="text-4xl">👷</span>
              <span id={`category-${category}-construction-icon-3`} className="text-4xl">🔨</span>
            </div>

            <h1 id={`category-${category}-title`} className="text-3xl font-bold text-foreground mb-4">
              {info.name}
            </h1>
            
            <div id={`category-${category}-status-badge`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-600 font-medium mb-6">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Under Construction
            </div>

            <p id={`category-${category}-description`} className="text-lg text-muted mb-8 max-w-md mx-auto">
              {info.description}
            </p>

            <div id={`category-${category}-message-box`} className="bg-background rounded-2xl p-6 mb-8">
              <p id={`category-${category}-message-title`} className="text-foreground font-medium mb-2">
                We&apos;re working hard to bring you this feature!
              </p>
              <p id={`category-${category}-message-text`} className="text-sm text-muted">
                This page is currently under development. Check back soon for updates.
              </p>
            </div>

            {/* Progress indicator */}
            <div id={`category-${category}-progress`} className="mb-8">
              <div id={`category-${category}-progress-labels`} className="flex items-center justify-between text-sm mb-2">
                <span id={`category-${category}-progress-label`} className="text-muted">Development Progress</span>
                <span id={`category-${category}-progress-status`} className="text-primary font-medium">Coming Soon</span>
              </div>
              <div id={`category-${category}-progress-track`} className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                <div id={`category-${category}-progress-bar`} className="h-full w-1/4 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
              </div>
            </div>

            <Link
              id={`category-${category}-back-btn`}
              href="/review"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Reviews
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
