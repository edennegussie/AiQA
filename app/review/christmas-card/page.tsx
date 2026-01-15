'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';

interface ChristmasCardData {
  id: number;
  childId: string;
  childName: string;
  childPhoto: string;
  gender: string;
  ageGroup: string;
  field: string;
  community: string;
  dueDate: string;
  submittedOn: string;
}

export default function ChristmasCardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div id="christmas-card-loading" className="min-h-screen flex items-center justify-center bg-background">
        <div id="christmas-card-loading-spinner" className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const data: ChristmasCardData[] = [
    { id: 1, childId: 'CH-001', childName: 'Maria Santos', childPhoto: '/child1.jpg', gender: 'Female', ageGroup: '6-8', field: 'Education', community: 'San Pedro', dueDate: '2025-12-15', submittedOn: '2025-01-10' },
    { id: 2, childId: 'CH-002', childName: 'Carlos Rivera', childPhoto: '/child2.jpg', gender: 'Male', ageGroup: '9-11', field: 'Health', community: 'Santa Maria', dueDate: '2025-12-15', submittedOn: '2025-01-12' },
    { id: 3, childId: 'CH-003', childName: 'Sofia Lopez', childPhoto: '/child3.jpg', gender: 'Female', ageGroup: '12-14', field: 'Education', community: 'San Juan', dueDate: '2025-12-15', submittedOn: '2025-01-08' },
    { id: 4, childId: 'CH-004', childName: 'Diego Martinez', childPhoto: '/child4.jpg', gender: 'Male', ageGroup: '6-8', field: 'Nutrition', community: 'La Paz', dueDate: '2025-12-15', submittedOn: '2025-01-14' },
    { id: 5, childId: 'CH-005', childName: 'Ana Garcia', childPhoto: '/child5.jpg', gender: 'Female', ageGroup: '9-11', field: 'Education', community: 'San Pedro', dueDate: '2025-12-15', submittedOn: '2025-01-11' },
    { id: 6, childId: 'CH-006', childName: 'Luis Hernandez', childPhoto: '/child6.jpg', gender: 'Male', ageGroup: '12-14', field: 'Health', community: 'Santa Maria', dueDate: '2025-12-15', submittedOn: '2025-01-09' },
    { id: 7, childId: 'CH-007', childName: 'Isabella Flores', childPhoto: '/child7.jpg', gender: 'Female', ageGroup: '6-8', field: 'Nutrition', community: 'San Juan', dueDate: '2025-12-15', submittedOn: '2025-01-13' },
    { id: 8, childId: 'CH-008', childName: 'Miguel Torres', childPhoto: '/child8.jpg', gender: 'Male', ageGroup: '9-11', field: 'Education', community: 'La Paz', dueDate: '2025-12-15', submittedOn: '2025-01-15' },
  ];

  return (
    <div id="christmas-card-page" className="min-h-screen bg-background pt-16">
      <Sidebar />
      
      <main id="christmas-card-main" className="ml-64 p-8">
        <div id="christmas-card-container" className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div id="christmas-card-breadcrumb" className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link id="christmas-card-breadcrumb-home" href="/home" className="hover:text-foreground transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span id="christmas-card-breadcrumb-current" className="text-foreground">Christmas Card</span>
          </div>

          {/* Header */}
          <div id="christmas-card-header" className="mb-8">
            <h1 id="christmas-card-title" className="text-3xl font-bold text-foreground mb-2">Christmas Card</h1>
            <p id="christmas-card-subtitle" className="text-muted">Review and manage Christmas card submissions</p>
          </div>

          {/* Table */}
          <div id="christmas-card-table-container" className="bg-card-bg rounded-2xl border border-border overflow-hidden">
            <div id="christmas-card-table-wrapper" className="overflow-x-auto">
              <table id="christmas-card-table" className="w-full">
                <thead id="christmas-card-table-head">
                  <tr id="christmas-card-table-header-row" className="bg-foreground/5 border-b border-border">
                    <th id="christmas-card-th-action" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Action</th>
                    <th id="christmas-card-th-photo" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Child Photo</th>
                    <th id="christmas-card-th-name" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Child Name & ID</th>
                    <th id="christmas-card-th-gender" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Gender</th>
                    <th id="christmas-card-th-age" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Age Group</th>
                    <th id="christmas-card-th-field" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Field</th>
                    <th id="christmas-card-th-community" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Community</th>
                    <th id="christmas-card-th-due" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Due Date</th>
                    <th id="christmas-card-th-submitted" className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Submitted On</th>
                  </tr>
                </thead>
                <tbody id="christmas-card-table-body" className="divide-y divide-border">
                  {data.map((row) => (
                    <tr 
                      key={row.id} 
                      id={`christmas-card-row-${row.id}`}
                      className="hover:bg-foreground/5 transition-colors"
                    >
                      <td id={`christmas-card-row-${row.id}-action`} className="px-6 py-4">
                        <button 
                          id={`christmas-card-row-${row.id}-review-btn`}
                          className="px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                        >
                          Review
                        </button>
                      </td>
                      <td id={`christmas-card-row-${row.id}-photo`} className="px-6 py-4">
                        <div 
                          id={`christmas-card-row-${row.id}-photo-avatar`}
                          className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-medium"
                        >
                          {row.childName.charAt(0)}
                        </div>
                      </td>
                      <td id={`christmas-card-row-${row.id}-name`} className="px-6 py-4">
                        <div id={`christmas-card-row-${row.id}-name-text`} className="font-medium text-foreground">{row.childName}</div>
                        <div id={`christmas-card-row-${row.id}-id-text`} className="text-sm text-muted">{row.childId}</div>
                      </td>
                      <td id={`christmas-card-row-${row.id}-gender`} className="px-6 py-4 text-foreground">{row.gender}</td>
                      <td id={`christmas-card-row-${row.id}-age`} className="px-6 py-4 text-foreground">{row.ageGroup}</td>
                      <td id={`christmas-card-row-${row.id}-field`} className="px-6 py-4 text-foreground">{row.field}</td>
                      <td id={`christmas-card-row-${row.id}-community`} className="px-6 py-4 text-foreground">{row.community}</td>
                      <td id={`christmas-card-row-${row.id}-due`} className="px-6 py-4 text-foreground">{row.dueDate}</td>
                      <td id={`christmas-card-row-${row.id}-submitted`} className="px-6 py-4 text-foreground">{row.submittedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div id="christmas-card-pagination" className="flex items-center justify-between mt-6">
            <p id="christmas-card-pagination-info" className="text-sm text-muted">
              Showing <span className="font-medium text-foreground">{data.length}</span> entries
            </p>
            <div id="christmas-card-pagination-buttons" className="flex items-center gap-2">
              <button 
                id="christmas-card-pagination-prev"
                className="px-4 py-2 rounded-lg border border-border bg-card-bg text-muted hover:text-foreground hover:border-foreground/20 transition-colors disabled:opacity-50" 
                disabled
              >
                Previous
              </button>
              <button 
                id="christmas-card-pagination-next"
                className="px-4 py-2 rounded-lg border border-border bg-card-bg text-muted hover:text-foreground hover:border-foreground/20 transition-colors disabled:opacity-50" 
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
