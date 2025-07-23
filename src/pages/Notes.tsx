import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  StickyNote, 
  BookOpen,
  Calendar,
  Hash,
  Filter
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'summary' | 'question' | 'idea';
  topic?: string;
  pdfTitle?: string;
  createdAt: string;
  tags: string[];
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Integration by Parts Formula',
    content: 'Remember the formula: ∫u dv = uv - ∫v du. This is particularly useful for products of polynomials and exponentials.',
    type: 'summary',
    topic: 'Advanced Calculus',
    pdfTitle: 'Calculus and Analytical Geometry',
    createdAt: '2024-01-18',
    tags: ['calculus', 'integration', 'formula']
  },
  {
    id: '2',
    title: 'Quantum Superposition Question',
    content: 'How does quantum superposition relate to the wave function collapse? Need to review Schrödinger equation applications.',
    type: 'question',
    topic: 'Quantum Physics',
    createdAt: '2024-01-17',
    tags: ['quantum', 'superposition', 'wave-function']
  },
  {
    id: '3',
    title: 'Study Schedule Idea',
    content: 'Implement Pomodoro technique with 45-minute study blocks instead of 25 minutes for deeper focus on complex topics.',
    type: 'idea',
    createdAt: '2024-01-16',
    tags: ['productivity', 'study-technique']
  },
  {
    id: '4',
    title: 'Organic Reaction Mechanisms',
    content: 'Key patterns in nucleophilic substitution: SN1 vs SN2 mechanisms depend on substrate structure and reaction conditions.',
    type: 'summary',
    topic: 'Organic Chemistry',
    createdAt: '2024-01-15',
    tags: ['chemistry', 'reactions', 'mechanisms']
  }
];

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes] = useState(mockNotes);
  const [filterType, setFilterType] = useState<'all' | 'general' | 'summary' | 'question' | 'idea'>('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'summary':
        return 'bg-primary text-primary-foreground';
      case 'question':
        return 'bg-warning text-warning-foreground';
      case 'idea':
        return 'bg-success text-success-foreground';
      case 'general':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-accent text-accent-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary':
        return '📋';
      case 'question':
        return '❓';
      case 'idea':
        return '💡';
      case 'general':
        return '📝';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || note.type === filterType;
    return matchesSearch && matchesType;
  });

  const noteTypes = [
    { value: 'all', label: 'All Notes' },
    { value: 'summary', label: 'Summaries' },
    { value: 'question', label: 'Questions' },
    { value: 'idea', label: 'Ideas' },
    { value: 'general', label: 'General' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-muted-foreground">
            Capture and organize your study insights
          </p>
        </div>
        <Button className="gradient-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {noteTypes.map((type) => (
            <Button
              key={type.value}
              variant={filterType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(type.value as any)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Notes Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-foreground">{notes.length}</p>
            <p className="text-sm text-muted-foreground">Total Notes</p>
          </div>
        </Card>
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">{notes.filter(n => n.type === 'summary').length}</p>
            <p className="text-sm text-muted-foreground">Summaries</p>
          </div>
        </Card>
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-warning">{notes.filter(n => n.type === 'question').length}</p>
            <p className="text-sm text-muted-foreground">Questions</p>
          </div>
        </Card>
        <Card className="study-card text-center">
          <div className="space-y-2">
            <p className="text-2xl font-bold text-success">{notes.filter(n => n.type === 'idea').length}</p>
            <p className="text-sm text-muted-foreground">Ideas</p>
          </div>
        </Card>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="study-card group cursor-pointer hover:shadow-lg">
            <div className="space-y-4">
              {/* Note Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(note.type)}</span>
                  <Badge className={getTypeColor(note.type)}>
                    {note.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(note.createdAt)}
                </div>
              </div>

              {/* Note Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content}
                </p>
              </div>

              {/* Note Metadata */}
              {(note.topic || note.pdfTitle) && (
                <div className="space-y-1">
                  {note.topic && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      <span>{note.topic}</span>
                    </div>
                  )}
                  {note.pdfTitle && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <StickyNote className="h-3 w-3" />
                      <span className="truncate">{note.pdfTitle}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Hash className="h-2 w-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Share
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No notes found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterType !== 'all'
              ? "Try adjusting your search or filter to find more notes."
              : "Start taking notes to capture your study insights and ideas!"
            }
          </p>
          <Button className="gradient-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Note
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notes;