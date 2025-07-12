
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MessageSquare, Calendar, Award, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Feedback = () => {
  const { user } = useAuth();
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data - in real app would come from API
  const pendingFeedback = [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=faces',
        rating: 4.9
      },
      skillExchange: 'Photography ↔ React Development',
      completedDate: '2024-01-10',
      sessionDetails: 'We had a great 2-hour session where Sarah taught me lighting techniques and composition.'
    },
    {
      id: '2',
      user: {
        name: 'Mike Johnson',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
        rating: 4.7
      },
      skillExchange: 'Python ↔ UI/UX Design',
      completedDate: '2024-01-08',
      sessionDetails: 'Mike was very patient explaining Python concepts and data structures.'
    }
  ];

  const receivedFeedback = [
    {
      id: '3',
      fromUser: {
        name: 'Emma Wilson',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces'
      },
      rating: 5,
      comment: 'Excellent JavaScript teacher! Very clear explanations and great examples. Highly recommend!',
      skillTaught: 'JavaScript',
      date: '2024-01-05'
    },
    {
      id: '4',
      fromUser: {
        name: 'Alex Rodriguez',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces'
      },
      rating: 4,
      comment: 'Great web development session. Learned a lot about modern frameworks and best practices.',
      skillTaught: 'Web Development',
      date: '2024-01-03'
    },
    {
      id: '5',
      fromUser: {
        name: 'Lisa Park',
        photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces'
      },
      rating: 5,
      comment: 'Amazing React teacher! Patient, knowledgeable, and great at breaking down complex concepts.',
      skillTaught: 'React',
      date: '2024-01-01'
    }
  ];

  const handleSubmitFeedback = (swapId: string) => {
    if (selectedRating === 0) {
      toast({
        title: "Please select a rating",
        description: "Rating is required to submit feedback",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. It helps our community grow.",
    });

    setSelectedRating(0);
    setFeedbackText('');
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-500 fill-current'
                : 'text-slate-300 dark:text-slate-600'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : ''}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const averageRating = receivedFeedback.reduce((sum, fb) => sum + fb.rating, 0) / receivedFeedback.length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Feedback & Ratings
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Share your experience and see what others say about your teaching
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Average Rating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {receivedFeedback.length}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Total Reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {pendingFeedback.length}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Pending Feedback
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Give Feedback ({pendingFeedback.length})
            </TabsTrigger>
            <TabsTrigger value="received" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Received ({receivedFeedback.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Feedback Tab */}
          <TabsContent value="pending" className="space-y-4">
            {pendingFeedback.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No pending feedback
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Complete more skill swaps to leave feedback for your learning partners.
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingFeedback.map((swap) => (
                <Card key={swap.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={swap.user.photo} alt={swap.user.name} />
                          <AvatarFallback>
                            {swap.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{swap.user.name}</CardTitle>
                          <CardDescription>
                            {swap.skillExchange}
                          </CardDescription>
                          <div className="flex items-center space-x-1 mt-1">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-500">
                              Completed on {new Date(swap.completedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Session Details */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {swap.sessionDetails}
                      </p>
                    </div>

                    {/* Rating */}
                    <div>
                      <Label className="text-sm font-medium">
                        How would you rate this skill swap?
                      </Label>
                      <div className="mt-2">
                        {renderStars(selectedRating, true, setSelectedRating)}
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <Label htmlFor={`comment-${swap.id}`} className="text-sm font-medium">
                        Share your experience (optional)
                      </Label>
                      <Textarea
                        id={`comment-${swap.id}`}
                        placeholder="What did you learn? How was the teaching style? Any suggestions?"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleSubmitFeedback(swap.id)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Received Feedback Tab */}
          <TabsContent value="received" className="space-y-4">
            {receivedFeedback.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No feedback received yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Complete more skill swaps to receive feedback from your students.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Overall Rating Summary */}
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                          Your Teaching Rating
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          Based on {receivedFeedback.length} reviews
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                          {averageRating.toFixed(1)}
                        </div>
                        {renderStars(Math.round(averageRating))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                {receivedFeedback.map((feedback) => (
                  <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={feedback.fromUser.photo} alt={feedback.fromUser.name} />
                            <AvatarFallback>
                              {feedback.fromUser.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{feedback.fromUser.name}</CardTitle>
                            <CardDescription>
                              <Badge variant="secondary" className="text-xs">
                                {feedback.skillTaught}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          {renderStars(feedback.rating)}
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(feedback.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                        "{feedback.comment}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Feedback;
