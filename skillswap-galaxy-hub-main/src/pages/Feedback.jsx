
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Send,
  Filter,
  Search,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const Feedback = () => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    skillSession: ''
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const feedbackData = [
    {
      id: 1,
      reviewer: {
        name: "Sarah Johnson",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces"
      },
      reviewee: {
        name: "Mike Chen",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
      },
      rating: 5,
      skill: "React",
      comment: "Excellent teacher! Mike explained React concepts clearly and patiently. His hands-on approach really helped me understand hooks and state management.",
      date: "2024-01-15",
      helpful: 12,
      session: "React Fundamentals"
    },
    {
      id: 2,
      reviewer: {
        name: "Emma Wilson",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
      },
      reviewee: {
        name: "David Kim",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
      },
      rating: 4,
      skill: "UI Design",
      comment: "Great design insights and practical tips. David's feedback on my portfolio was very constructive. Would definitely recommend!",
      date: "2024-01-12",
      helpful: 8,
      session: "Portfolio Review"
    },
    {
      id: 3,
      reviewer: {
        name: "Alex Rivera",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces"
      },
      reviewee: {
        name: "Lisa Chang",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces"
      },
      rating: 5,
      skill: "Photography",
      comment: "Lisa's photography workshop was amazing! She covered everything from composition to lighting. My photos have improved dramatically.",
      date: "2024-01-10",
      helpful: 15,
      session: "Portrait Photography Basics"
    },
    {
      id: 4,
      reviewer: {
        name: "Mike Chen",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
      },
      reviewee: {
        name: "Sarah Johnson",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces"
      },
      rating: 5,
      skill: "Python",
      comment: "Sarah is an exceptional Python instructor. Her data science examples were practical and engaging. Learned so much in just one session!",
      date: "2024-01-08",
      helpful: 20,
      session: "Python for Data Science"
    },
    {
      id: 5,
      reviewer: {
        name: "David Kim",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
      },
      reviewee: {
        name: "Emma Wilson",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
      },
      rating: 4,
      skill: "UX Research",
      comment: "Emma provided great insights into user research methodologies. The session was well-structured and informative.",
      date: "2024-01-05",
      helpful: 6,
      session: "User Research Methods"
    }
  ];

  const recentSessions = [
    { id: 1, skill: "React", partner: "Mike Chen", date: "2024-01-15" },
    { id: 2, skill: "Python", partner: "Sarah Johnson", date: "2024-01-12" },
    { id: 3, skill: "UI Design", partner: "Emma Wilson", date: "2024-01-10" }
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback"
    });
    
    setNewReview({
      rating: 0,
      comment: '',
      skillSession: ''
    });
  };

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.reviewee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'recent' && new Date(feedback.date) > new Date('2024-01-10')) ||
                         (filter === 'high-rated' && feedback.rating >= 4);
    
    return matchesSearch && matchesFilter;
  });

  const StarRating = ({ rating, onRatingChange, readonly = false }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            star <= rating 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Feedback & Reviews
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Share your experience and help others learn
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search and Filter */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter reviews" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reviews</SelectItem>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="high-rated">High Rated (4+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredFeedback.map((feedback) => (
                <Card key={feedback.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={feedback.reviewer.photo} alt={feedback.reviewer.name} />
                          <AvatarFallback>
                            {feedback.reviewer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {feedback.reviewer.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            reviewed {feedback.reviewee.name} for {feedback.skill}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <StarRating rating={feedback.rating} readonly />
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          {new Date(feedback.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Badge className="mb-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {feedback.session}
                      </Badge>
                      <p className="text-slate-700 dark:text-slate-300">
                        {feedback.comment}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Helpful ({feedback.helpful})
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredFeedback.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  No reviews found
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Leave a Review */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Leave a Review
                </CardTitle>
                <CardDescription>
                  Share your experience with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Session
                    </label>
                    <Select 
                      value={newReview.skillSession} 
                      onValueChange={(value) => setNewReview(prev => ({ ...prev, skillSession: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a recent session" />
                      </SelectTrigger>
                      <SelectContent>
                        {recentSessions.map((session) => (
                          <SelectItem key={session.id} value={session.id.toString()}>
                            {session.skill} with {session.partner}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Rating
                    </label>
                    <StarRating 
                      rating={newReview.rating} 
                      onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Comment
                    </label>
                    <Textarea
                      placeholder="Share your thoughts about the session..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Review Stats */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Review Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Total Reviews</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{feedbackData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-300">Average Rating</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={4.6} readonly />
                    <span className="font-semibold text-slate-900 dark:text-white">4.6</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = feedbackData.filter(f => f.rating === stars).length;
                    const percentage = (count / feedbackData.length) * 100;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm w-8">{stars}★</span>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300 w-8">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
