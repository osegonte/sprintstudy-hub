import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  Coffee, 
  BookOpen, 
  Target,
  Clock,
  Brain,
  TrendingUp
} from 'lucide-react';

const StudySession = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTime, setSessionTime] = useState(0); // in seconds
  const [focusScore, setFocusScore] = useState(85);
  const [currentTopic] = useState('Advanced Calculus');
  const [targetDuration] = useState(120); // 2 hours in minutes

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSessionTime(time => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const sessionMinutes = sessionTime / 60;
    return Math.min((sessionMinutes / targetDuration) * 100, 100);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    // Here you would typically save the session data
  };

  if (!isActive) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Start Study Session</h1>
          <p className="text-muted-foreground">
            Ready to focus? Choose your topic and begin studying.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="study-card">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{currentTopic}</h3>
                <p className="text-sm text-muted-foreground">Target: {targetDuration} minutes</p>
              </div>

              <Button onClick={handleStart} className="w-full gradient-primary text-white" size="lg">
                <Play className="h-5 w-5 mr-2" />
                Start Session
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="bg-success-muted text-success">
          Active Session
        </Badge>
        <h1 className="text-2xl font-bold text-foreground">{currentTopic}</h1>
      </div>

      {/* Main Timer */}
      <div className="max-w-2xl mx-auto">
        <Card className="study-card">
          <div className="text-center space-y-6">
            {/* Timer Display */}
            <div className="space-y-4">
              <div className="text-6xl font-mono font-bold text-focus">
                {formatTime(sessionTime)}
              </div>
              <Progress value={getProgressPercentage()} className="w-full h-2" />
              <p className="text-sm text-muted-foreground">
                {Math.round(sessionTime / 60)} / {targetDuration} minutes
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {isPaused ? (
                <Button onClick={handleResume} className="gradient-primary text-white" size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button onClick={handlePause} variant="outline" size="lg">
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button variant="outline" size="lg">
                <Coffee className="h-5 w-5 mr-2" />
                Break
              </Button>
              
              <Button onClick={handleStop} variant="destructive" size="lg">
                <Square className="h-5 w-5 mr-2" />
                End Session
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <Card className="study-card text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary-muted rounded-lg flex items-center justify-center mx-auto">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Focus Score</p>
            <p className="text-2xl font-bold text-foreground">{focusScore}%</p>
          </div>
        </Card>

        <Card className="study-card text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-focus-muted rounded-lg flex items-center justify-center mx-auto">
              <Target className="h-6 w-6 text-focus" />
            </div>
            <p className="text-sm text-muted-foreground">Pages Read</p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
        </Card>

        <Card className="study-card text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-success-muted rounded-lg flex items-center justify-center mx-auto">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <p className="text-sm text-muted-foreground">Productivity</p>
            <p className="text-2xl font-bold text-foreground">High</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudySession;