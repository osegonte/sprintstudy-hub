import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Clock, Target } from 'lucide-react';

interface ProgressChartsSectionProps {
  focusTrend?: number[];
  studyTimeTrend?: number[];
  goalCompletionTrend?: number[];
}

export const ProgressChartsSection: React.FC<ProgressChartsSectionProps> = ({
  focusTrend = [82, 85, 79, 88, 92, 87, 90],
  studyTimeTrend = [120, 95, 140, 110, 160, 85, 125],
  goalCompletionTrend = [60, 75, 80, 70, 85, 90, 88]
}) => {
  const chartTabs = [
    {
      id: 'focus',
      label: 'Focus Trends',
      icon: TrendingUp,
      data: focusTrend,
      color: 'text-primary',
      description: 'Your focus score over the last 7 days'
    },
    {
      id: 'time',
      label: 'Study Time',
      icon: Clock,
      data: studyTimeTrend,
      color: 'text-focus',
      description: 'Daily study time in minutes'
    },
    {
      id: 'goals',
      label: 'Goal Progress',
      icon: Target,
      data: goalCompletionTrend,
      color: 'text-success',
      description: 'Goal completion percentage'
    }
  ];

  const SimpleChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return (
      <div className="flex items-end gap-2 h-24">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className={`flex-1 bg-gradient-to-t from-current to-current/60 rounded-sm ${color} opacity-80 hover:opacity-100 transition-opacity`}
              style={{ height: `${height}%` }}
              title={`Day ${index + 1}: ${value}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Card className="study-card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Progress Overview</h3>
        
        <Tabs defaultValue="focus" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {chartTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {chartTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{tab.description}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {tab.data[tab.data.length - 1]}
                    {tab.id === 'focus' || tab.id === 'goals' ? '%' : 'min'}
                  </p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${tab.color}`}>
                  <TrendingUp className="h-4 w-4" />
                  <span>+12%</span>
                </div>
              </div>
              
              <SimpleChart data={tab.data} color={tab.color} />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>7 days ago</span>
                <span>Today</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
};