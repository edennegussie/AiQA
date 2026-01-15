'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  const recentReviews = [
    { id: 1, name: 'Authentication Module', status: 'completed', issues: 3, date: '2 hours ago' },
    { id: 2, name: 'Payment Integration', status: 'in_progress', issues: 7, date: '5 hours ago' },
    { id: 3, name: 'User Dashboard', status: 'pending', issues: 0, date: 'Yesterday' },
    { id: 4, name: 'API Gateway', status: 'completed', issues: 1, date: '2 days ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'in_progress':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted/10 text-muted';
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-primary">{user.name}</span>
            </h1>
            <p className="text-muted">Here&apos;s what&apos;s happening with your code reviews today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Reviews', value: '124', change: '+12%', icon: '📊', color: 'primary' },
              { label: 'Issues Found', value: '47', change: '-5%', icon: '🔍', color: 'secondary' },
              { label: 'Code Quality', value: '92%', change: '+3%', icon: '✨', color: 'primary' },
              { label: 'Time Saved', value: '36h', change: '+8%', icon: '⏱️', color: 'secondary' },
            ].map((stat, i) => (
              <div
                key={i}
                className="card-hover p-6 rounded-2xl bg-card-bg border border-border"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className={`text-3xl font-bold ${stat.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Reviews */}
            <div className="lg:col-span-2">
              <div className="bg-card-bg rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Reviews</h2>
                  <button className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
                    View all →
                  </button>
                </div>
                <div className="space-y-4">
                  {recentReviews.map((review, i) => (
                    <div
                      key={review.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-background hover:bg-foreground/5 transition-colors cursor-pointer animate-slide-in"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{review.name}</p>
                          <p className="text-sm text-muted">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {review.issues > 0 && (
                          <span className="text-sm text-muted">
                            {review.issues} issue{review.issues > 1 ? 's' : ''}
                          </span>
                        )}
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(review.status)}`}>
                          {getStatusText(review.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity & Quick Actions */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card-bg rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Start New Review
                  </button>
                  <button className="w-full btn-secondary text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Code
                  </button>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-card-bg rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: 'Review completed', target: 'Auth Module', time: '2h ago', type: 'success' },
                    { action: 'Issue detected', target: 'Payment API', time: '4h ago', type: 'warning' },
                    { action: 'Code uploaded', target: 'Dashboard v2', time: '6h ago', type: 'info' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-primary' :
                        activity.type === 'warning' ? 'bg-secondary' : 'bg-muted'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          {activity.action} <span className="text-primary font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
