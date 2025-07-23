import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudySessionQuickStartProps {
  isSessionActive?: boolean;
  currentSessionTime?: number;
  lastStudiedTopic?: string;
}

export const StudySessionQuickStart: React.FC<StudySessionQuickStartProps> = ({
  isSessionActive = false,
  currentSessionTime = 0,
  lastStudiedTopic = "Advanced Calculus"
}) => {
  const navigate = useNavigate();
  const [sessionTime, setSessionTime] = useState(currentSessionTime);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleStartSession = () => {
    navigate('/study');
  };

  return (
    <Card className="study-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Study Session</h3>
          {isSessionActive && (
            <Badge variant="secondary" className="bg-success-muted text-success">
              Active
            </Badge>
          )}
        </div>

        {isSessionActive ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-focus">
                {formatTime(sessionTime)}
              </div>
              <p className="text-sm text-muted-foreground">Current session</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                End Session
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Button onClick={handleStartSession} className="w-full gradient-primary text-white">
                <Play className="h-4 w-4 mr-2" />
                Start New Session
              </Button>
              <Button variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Resume Last: {lastStudiedTopic}
              </Button>
            </div>
            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={() => navigate('/topics')}>
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Topics
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};