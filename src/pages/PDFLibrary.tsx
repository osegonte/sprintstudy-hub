import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Search, 
  FileText, 
  BookOpen, 
  Clock,
  CheckCircle,
  Filter
} from 'lucide-react';

interface PDF {
  id: string;
  title: string;
  description: string;
  topic: string;
  pages: number;
  currentPage: number;
  fileSize: string;
  uploadDate: string;
  isCompleted: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const mockPDFs: PDF[] = [
  {
    id: '1',
    title: 'Calculus and Analytical Geometry',
    description: 'Comprehensive guide to advanced calculus concepts',
    topic: 'Mathematics',
    pages: 456,
    currentPage: 328,
    fileSize: '12.4 MB',
    uploadDate: '2024-01-15',
    isCompleted: false,
    difficulty: 'Hard'
  },
  {
    id: '2',
    title: 'Quantum Mechanics Fundamentals',
    description: 'Introduction to quantum physics principles',
    topic: 'Physics',
    pages: 234,
    currentPage: 234,
    fileSize: '8.7 MB',
    uploadDate: '2024-01-12',
    isCompleted: true,
    difficulty: 'Medium'
  },
  {
    id: '3',
    title: 'Organic Chemistry Reactions',
    description: 'Detailed analysis of organic reaction mechanisms',
    topic: 'Chemistry',
    pages: 312,
    currentPage: 128,
    fileSize: '15.2 MB',
    uploadDate: '2024-01-10',
    isCompleted: false,
    difficulty: 'Medium'
  },
  {
    id: '4',
    title: 'Linear Algebra Applications',
    description: 'Matrix operations and vector spaces',
    topic: 'Mathematics',
    pages: 189,
    currentPage: 167,
    fileSize: '6.8 MB',
    uploadDate: '2024-01-08',
    isCompleted: false,
    difficulty: 'Easy'
  }
];

const PDFLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pdfs] = useState(mockPDFs);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success text-success-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Hard':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'Mathematics':
        return 'bg-primary text-primary-foreground';
      case 'Physics':
        return 'bg-focus text-focus-foreground';
      case 'Chemistry':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  const getReadingProgress = (currentPage: number, totalPages: number) => {
    return Math.round((currentPage / totalPages) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">PDF Library</h1>
          <p className="text-muted-foreground">
            Manage your study materials and track reading progress
          </p>
        </div>
        <Button className="gradient-primary text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload PDF
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search PDFs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline">Sort</Button>
      </div>

      {/* PDF Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfs.map((pdf) => {
          const progress = getReadingProgress(pdf.currentPage, pdf.pages);
          
          return (
            <Card key={pdf.id} className="study-card group cursor-pointer hover:shadow-lg">
              <div className="space-y-4">
                {/* PDF Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getTopicColor(pdf.topic)}>
                        {pdf.topic}
                      </Badge>
                      <Badge className={getDifficultyColor(pdf.difficulty)}>
                        {pdf.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {pdf.isCompleted && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                </div>

                {/* PDF Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {pdf.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {pdf.description}
                  </p>
                </div>

                {/* Reading Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reading Progress</span>
                    <span className="font-medium text-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                  <p className="text-xs text-muted-foreground">
                    Page {pdf.currentPage} of {pdf.pages}
                  </p>
                </div>

                {/* PDF Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{pdf.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{pdf.fileSize}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {pdf.isCompleted ? 'Review' : 'Continue Reading'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">{pdfs.length}</p>
          <p className="text-sm text-muted-foreground">Total PDFs</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{pdfs.filter(pdf => pdf.isCompleted).length}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-focus">{pdfs.reduce((acc, pdf) => acc + pdf.currentPage, 0)}</p>
          <p className="text-sm text-muted-foreground">Pages Read</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {Math.round(pdfs.reduce((acc, pdf) => acc + (pdf.currentPage / pdf.pages), 0) / pdfs.length * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Avg Progress</p>
        </div>
      </div>
    </div>
  );
};

export default PDFLibrary;