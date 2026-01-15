'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

interface Review {
  id: number;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  issues: number;
  severity: 'low' | 'medium' | 'high';
  date: string;
  language: string;
  linesOfCode: number;
}

export default function ReviewPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const reviews: Review[] = [
    { id: 1, name: 'Authentication Module', description: 'User login and session management', status: 'completed', issues: 3, severity: 'low', date: '2 hours ago', language: 'TypeScript', linesOfCode: 1240 },
    { id: 2, name: 'Payment Integration', description: 'Stripe payment processing flow', status: 'in_progress', issues: 7, severity: 'high', date: '5 hours ago', language: 'TypeScript', linesOfCode: 890 },
    { id: 3, name: 'User Dashboard', description: 'Main dashboard component refactor', status: 'pending', issues: 0, severity: 'medium', date: 'Yesterday', language: 'React', linesOfCode: 2100 },
    { id: 4, name: 'API Gateway', description: 'REST API endpoint handlers', status: 'completed', issues: 1, severity: 'low', date: '2 days ago', language: 'Node.js', linesOfCode: 560 },
    { id: 5, name: 'Database Models', description: 'Prisma schema and migrations', status: 'completed', issues: 2, severity: 'medium', date: '3 days ago', language: 'Prisma', linesOfCode: 340 },
    { id: 6, name: 'WebSocket Handler', description: 'Real-time communication module', status: 'in_progress', issues: 5, severity: 'high', date: '4 days ago', language: 'TypeScript', linesOfCode: 720 },
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = selectedFilter === 'all' || review.status === selectedFilter;
    const matchesSearch = review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'in_progress':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted/10 text-muted border-muted/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Code Reviews</h1>
              <p className="text-muted">Manage and track all your code review sessions</p>
            </div>
            <button className="btn-primary text-white font-medium py-3 px-6 rounded-xl flex items-center gap-2 w-fit">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Review
            </button>
          </div>

          {/* Filters and Search */}
          <div className="bg-card-bg rounded-2xl border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 p-1 bg-background rounded-xl">
                {['all', 'completed', 'in_progress', 'pending'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-primary text-white shadow-md'
                        : 'text-muted hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter === 'in_progress' ? 'In Progress' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total', value: reviews.length, color: 'text-foreground' },
              { label: 'Completed', value: reviews.filter(r => r.status === 'completed').length, color: 'text-primary' },
              { label: 'In Progress', value: reviews.filter(r => r.status === 'in_progress').length, color: 'text-secondary' },
              { label: 'Pending', value: reviews.filter(r => r.status === 'pending').length, color: 'text-muted' },
            ].map((stat, i) => (
              <div key={i} className="bg-card-bg rounded-xl border border-border p-4 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="bg-card-bg rounded-2xl border border-border p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No reviews found</h3>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredReviews.map((review, i) => (
                <div
                  key={review.id}
                  className="card-hover bg-card-bg rounded-2xl border border-border p-6 cursor-pointer animate-slide-in"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">{review.name}</h3>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusColor(review.status)}`}>
                            {getStatusText(review.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted mb-3">{review.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1.5 text-muted">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {review.language}
                          </span>
                          <span className="flex items-center gap-1.5 text-muted">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {review.linesOfCode.toLocaleString()} lines
                          </span>
                          <span className="flex items-center gap-1.5 text-muted">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 md:flex-shrink-0">
                      {/* Issues Badge */}
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${review.issues > 0 ? getSeverityColor(review.severity) : 'text-primary'}`}>
                          {review.issues}
                        </div>
                        <p className="text-xs text-muted">Issues</p>
                      </div>

                      {/* Severity Indicator */}
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${
                          review.severity === 'high' ? 'bg-red-500' :
                          review.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <p className="text-xs text-muted capitalize">{review.severity}</p>
                      </div>

                      {/* Action Button */}
                      <button className="p-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted">
              Showing <span className="font-medium text-foreground">{filteredReviews.length}</span> of <span className="font-medium text-foreground">{reviews.length}</span> reviews
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-border bg-card-bg text-muted hover:text-foreground hover:border-foreground/20 transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg border border-border bg-card-bg text-muted hover:text-foreground hover:border-foreground/20 transition-colors disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
