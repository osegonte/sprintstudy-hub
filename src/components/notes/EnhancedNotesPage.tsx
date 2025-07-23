import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  Folder, 
  Hash, 
  Link2, 
  Save, 
  Paperclip,
  BookOpen,
  StickyNote,
  Calendar,
  Filter
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'summary' | 'question' | 'idea';
  folder?: string;
  tags: string[];
  linkedPdf?: string;
  linkedNotes: string[];
  createdAt: string;
  updatedAt: string;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Linear Transformations',
    content: `# Linear Transformations

Key concepts from today's study:

- **Matrix representation**: [T] represents transformation T
- **Kernel & Image**: Critical properties for understanding transformations
- **Composition**: T∘S = [T][S] (matrix multiplication)

## Important Formulas
- det(T) = determinant of transformation matrix
- rank(T) + nullity(T) = dim(domain)

See also: [[Vector Spaces]]
Linked from: [[PDF: Linear Algebra - Chapter 7]]`,
    type: 'summary',
    folder: 'Mathematics',
    tags: ['linear-algebra', 'transformations', 'matrices'],
    linkedPdf: 'Linear Algebra Textbook',
    linkedNotes: ['2'],
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-18T15:45:00Z'
  },
  {
    id: '2',
    title: 'Vector Spaces',
    content: `# Vector Spaces

A vector space V over field F satisfies:
1. Closure under addition and scalar multiplication
2. Associativity and commutativity of addition
3. Existence of zero vector and additive inverses
4. Distributivity of scalar multiplication

Examples:
- R^n (standard n-dimensional space)
- Polynomial spaces P_n
- Function spaces C[a,b]`,
    type: 'summary',
    folder: 'Mathematics',
    tags: ['linear-algebra', 'vector-spaces', 'fundamentals'],
    linkedNotes: ['1'],
    createdAt: '2024-01-17T10:15:00Z',
    updatedAt: '2024-01-17T11:30:00Z'
  },
  {
    id: '3',
    title: 'Study Schedule Optimization',
    content: `# Pomodoro Technique Enhancement

Idea: Use 45-minute study blocks instead of 25 minutes for complex mathematical concepts.

Benefits:
- Deeper focus on challenging problems
- Less context switching for proofs
- Better flow state maintenance

Test with calculus problems next week.`,
    type: 'idea',
    folder: 'Study Methods',
    tags: ['productivity', 'pomodoro', 'focus'],
    linkedNotes: [],
    createdAt: '2024-01-16T09:00:00Z',
    updatedAt: '2024-01-16T09:15:00Z'
  }
];

const folders = ['All Notes', 'Mathematics', 'Physics', 'Chemistry', 'Study Methods'];
const commonTags = ['important', 'review', 'formula', 'concept', 'example', 'question'];

export const EnhancedNotesPage = () => {
  const [notes] = useState(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All Notes');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(selectedNote?.content || '');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'All Notes' || note.folder === selectedFolder;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => note.tags.includes(tag));
    return matchesSearch && matchesFolder && matchesTags;
  });

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (selectedNote) {
      // Here you would update the note content via API
      setIsEditing(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary': return '📋';
      case 'question': return '❓';
      case 'idea': return '💡';
      default: return '📝';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Search and Actions */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Notes</h2>
            <Button size="sm" className="ml-auto">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Folders */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Folder className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Folders</span>
          </div>
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                  selectedFolder === folder
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {folder}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {commonTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <Badge
                  key={tag}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  #{tag}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteSelect(note)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedNote?.id === note.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">{getTypeIcon(note.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{note.title}</h4>
                    <p className="text-xs opacity-70">{note.folder}</p>
                  </div>
                </div>
                <p className="text-xs opacity-70 line-clamp-2 mb-2">
                  {note.content.replace(/[#*\[\]]/g, '').substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>{formatDate(note.updatedAt)}</span>
                  <div className="flex gap-1">
                    {note.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Editor Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(selectedNote.type)}</span>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{selectedNote.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatDate(selectedNote.updatedAt)}</span>
                    {selectedNote.linkedPdf && (
                      <>
                        <span>•</span>
                        <BookOpen className="h-3 w-3" />
                        <span>{selectedNote.linkedPdf}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm">
                      <Link2 className="h-4 w-4 mr-1" />
                      Link
                    </Button>
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-1" />
                      Attach
                    </Button>
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {isEditing ? (
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full h-full min-h-96 resize-none border-0 focus:ring-0 text-base leading-relaxed"
                  placeholder="Start writing your note..."
                />
              ) : (
                <div className="prose prose-slate max-w-none">
                  <div className="whitespace-pre-wrap text-base leading-relaxed">
                    {selectedNote.content}
                  </div>
                </div>
              )}
            </div>

            {/* Tags and Links */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-1">
                    {selectedNote.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedNote.linkedNotes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Links to {selectedNote.linkedNotes.length} notes
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <StickyNote className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-foreground">Select a note to view</h3>
                <p className="text-muted-foreground">
                  Choose a note from the sidebar or create a new one
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Note
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};