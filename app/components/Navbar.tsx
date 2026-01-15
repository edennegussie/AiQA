'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 h-16 bg-navbar-bg border-b border-border backdrop-blur-sm bg-opacity-95">
      <div id="navbar-container" className="h-full px-6 flex items-center justify-between">
        {/* Left side - Logo */}
        <div id="navbar-left" className="flex items-center">
          <Link id="navbar-logo-link" href={user ? '/home' : '/'} className="flex items-center gap-3 group">
            <div id="navbar-logo-icon" className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
              </svg>
            </div>
            <span id="navbar-logo-text" className="text-xl font-semibold bg-gradient-to-r from-primary-dark to-secondary bg-clip-text text-transparent">
              AiQA
            </span>
          </Link>
        </div>

        {/* Right side - User info and Actions */}
        <div id="navbar-right" className="flex items-center gap-4">
          {user && !isLoading ? (
            <>
              <button id="navbar-notifications-btn" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-muted hover:text-foreground hover:bg-border/50 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              
              {/* User info */}
              <div id="navbar-user-info" className="hidden sm:flex items-center gap-3 pr-4 border-r border-border">
                <div id="navbar-user-details" className="flex flex-col items-end">
                  <span id="navbar-user-name" className="text-sm font-medium text-foreground">{user.name}</span>
                  <span id="navbar-user-email" className="text-xs text-muted">{user.email}</span>
                </div>
                <div id="navbar-user-avatar" className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white font-medium text-sm shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <button
                id="navbar-logout-btn"
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all duration-200 hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </>
          ) : !isLoading && (
            <Link
              id="navbar-signin-link"
              href="/"
              className="bg-primary hover:bg-primary-dark px-5 py-2.5 rounded-xl text-white font-medium text-sm transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
