import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Target, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'study_time' | 'reading' | 'topic_completion' | 'sessions';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'overdue';
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Study 20 Hours This Week',
    description: 'Complete focused study sessions to reach weekly target',
    type: 'study_time',
    target: 20,
    current: 16.5,
    unit: 'hours',
    deadline: '2024-01-21',
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    title: 'Finish Calculus Textbook',
    description: 'Complete reading of advanced calculus material',
    type: 'reading',
    target: 456,
    current: 328,
    unit: 'pages',
    deadline: '2024-02-15',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '3',
    title: 'Complete Quantum Physics',
    description: 'Finish all materials for quantum physics topic',
    type: 'topic_completion',
    target: 100,
    current: 100,
    unit: '%',
    deadline: '2024-01-15',
    priority: 'medium',
    status: 'completed'
  },
  {
    id: '4',
    title: '30 Study Sessions This Month',
    description: 'Maintain consistent daily study habits',
    type: 'sessions',
    target: 30,
    current: 18,
    unit: 'sessions',
    deadline: '2024-01-31',
    priority: 'low',
    status: 'active'
  }
];

const Goals = () => {
  const [goals] = useState(mockGoals);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'overdue':
        return 'bg-destructive text-destructive-foreground';
      case 'active':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-destructive';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-success';
      default:
        return 'border-l-muted';
    }
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'study_time':
        return Clock;
      case 'reading':
        return Target;
      case 'topic_completion':
        return CheckCircle;
      case 'sessions':
        return TrendingUp;
      default:
        return Target;
    }
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'all') return true;
    return goal.status === filter;
  });

  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'active').length,
    completed: goals.filter(g => g.status === 'completed').length,
    avgProgress: Math.round(goals.reduce((acc, goal) => acc + getProgress(goal.current, goal.target), 0) / goals.length)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Goals</h1>
          <p className="text-muted-foreground">
            Set and track your study objectives
          </p>
        </div>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Goals</p>
          </div>
        </Card>
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </Card>
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-success">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </Card>
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-focus">{stats.avgProgress}%</p>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All Goals
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => {
          const Icon = getGoalIcon(goal.type);
          const progress = getProgress(goal.current, goal.target);
          const deadlineText = formatDeadline(goal.deadline);
          
          return (
            <Card key={goal.id} className={`study-card border-l-4 ${getPriorityColor(goal.priority)}`}>
              <div className="space-y-4">
                {/* Goal Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-muted rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(goal.status)}>
                      {goal.status}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {goal.current} / {goal.target} {goal.unit}
                      </p>
                      <p className="text-xs text-muted-foreground">{deadlineText}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                </div>

                {/* Goal Actions */}
                {goal.status === 'active' && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Update Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Extend Deadline
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No goals found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all' 
              ? "You haven't set any goals yet. Create your first goal to start tracking your progress!"
              : `No ${filter} goals at the moment.`
            }
          </p>
          {filter === 'all' && (
            <Button className="gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Goals;