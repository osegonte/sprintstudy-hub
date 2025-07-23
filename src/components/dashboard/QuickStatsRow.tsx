import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Flame, Brain, Target } from 'lucide-react';

interface QuickStatsRowProps {
  todayStudyTime?: number;
  currentStreak?: number;
  focusScore?: number;
  activeGoals?: number;
}

export const QuickStatsRow: React.FC<QuickStatsRowProps> = ({
  todayStudyTime = 85,
  currentStreak = 15,
  focusScore = 87,
  activeGoals = 6
}) => {
  const stats = [
    {
      title: "Today's Study Time",
      value: `${todayStudyTime}min`,
      icon: Clock,
      color: 'text-focus',
      bgColor: 'bg-focus-muted'
    },
    {
      title: "Current Streak",
      value: `${currentStreak} days`,
      icon: Flame,
      color: 'text-warning',
      bgColor: 'bg-warning-muted'
    },
    {
      title: "Focus Score",
      value: `${focusScore}%`,
      icon: Brain,
      color: 'text-primary',
      bgColor: 'bg-primary-muted'
    },
    {
      title: "Active Goals",
      value: activeGoals.toString(),
      icon: Target,
      color: 'text-success',
      bgColor: 'bg-success-muted'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="study-card">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};