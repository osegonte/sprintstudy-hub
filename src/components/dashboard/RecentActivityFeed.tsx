import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Plus, Target, BookOpen, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'completion' | 'addition' | 'goal' | 'session';
  title: string;
  description?: string;
  timestamp: string;
  badge?: string;
}

interface RecentActivityFeedProps {
  activities?: ActivityItem[];
}

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'completion',
    title: 'Completed Chapter 12: Integration Techniques',
    description: 'Mathematics - Advanced Calculus',
    timestamp: '2 hours ago',
    badge: 'Mathematics'
  },
  {
    id: '2',
    type: 'addition',
    title: 'Added 5 new highlights',
    description: 'Quantum Mechanics Fundamentals',
    timestamp: '4 hours ago',
    badge: 'Physics'
  },
  {
    id: '3',
    type: 'goal',
    title: 'Goal milestone reached',
    description: 'Study 20 hours this week - 18/20 completed',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    type: 'session',
    title: '2.5 hour study session completed',
    description: 'Focus score: 92% • Productivity: High',
    timestamp: 'Yesterday'
  }
];

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({
  activities = defaultActivities
}) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'completion':
        return CheckCircle;
      case 'addition':
        return Plus;
      case 'goal':
        return Target;
      case 'session':
        return Clock;
      default:
        return BookOpen;
    }
  };

  const getIconColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'completion':
        return 'text-success';
      case 'addition':
        return 'text-primary';
      case 'goal':
        return 'text-warning';
      case 'session':
        return 'text-focus';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="study-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        
        <div className="space-y-3">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type);
            const iconColor = getIconColor(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-secondary ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  {activity.description && (
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    {activity.badge && (
                      <Badge variant="outline" className="text-xs">
                        {activity.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-border">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View all activity →
          </button>
        </div>
      </div>
    </Card>
  );
};