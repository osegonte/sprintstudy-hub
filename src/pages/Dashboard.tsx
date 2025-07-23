import React from 'react';
import { QuickStatsRow } from '@/components/dashboard/QuickStatsRow';
import { StudySessionQuickStart } from '@/components/dashboard/StudySessionQuickStart';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { ProgressChartsSection } from '@/components/dashboard/ProgressChartsSection';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your study progress overview.
        </p>
      </div>

      {/* Quick Stats */}
      <QuickStatsRow />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Study Session */}
        <div className="lg:col-span-1">
          <StudySessionQuickStart />
        </div>

        {/* Right Column - Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivityFeed />
        </div>
      </div>

      {/* Progress Charts */}
      <ProgressChartsSection />
    </div>
  );
};

export default Dashboard;