import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, BookOpen, Clock, Target, TrendingUp } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  pdfCount: number;
  studyTime: number;
  priority: 'high' | 'medium' | 'low';
}

const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'Advanced Calculus',
    description: 'Integration, differentiation, and complex analysis',
    color: 'bg-primary',
    progress: 72,
    pdfCount: 5,
    studyTime: 720,
    priority: 'high'
  },
  {
    id: '2',
    name: 'Quantum Physics',
    description: 'Quantum mechanics fundamentals and applications',
    color: 'bg-focus',
    progress: 58,
    pdfCount: 3,
    studyTime: 480,
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Organic Chemistry',
    description: 'Molecular structures and reaction mechanisms',
    color: 'bg-success',
    progress: 41,
    pdfCount: 7,
    studyTime: 360,
    priority: 'medium'
  },
  {
    id: '4',
    name: 'Linear Algebra',
    description: 'Vector spaces, matrices, and transformations',
    color: 'bg-accent',
    progress: 89,
    pdfCount: 4,
    studyTime: 540,
    priority: 'low'
  }
];

const Topics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [topics] = useState(mockTopics);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}h studied`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Topics</h1>
          <p className="text-muted-foreground">
            Organize your study materials by subject
          </p>
        </div>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Topic
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Sort</Button>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="study-card group cursor-pointer hover:shadow-lg">
            <div className="space-y-4">
              {/* Topic Header */}
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${topic.color} flex items-center justify-center`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Badge className={getPriorityColor(topic.priority)}>
                  {topic.priority}
                </Badge>
              </div>

              {/* Topic Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{topic.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{topic.pdfCount} PDFs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatStudyTime(topic.studyTime)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Target className="h-4 w-4 mr-1" />
                  Study
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Stats
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Topics;