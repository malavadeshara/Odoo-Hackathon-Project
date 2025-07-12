import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Check, 
  X, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Trash2,
  Star,
  MapPin
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Requests = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('incoming');

  // Mock data - in real app would come from API
  const incomingRequests = [
    {
      id: '1',
      fromUser: {
        name: 'Sarah Chen',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=faces',
        location: 'San Francisco, CA',
        rating: 4.9,
        points: 320
      },
      skillOffered: 'Photography',
      skillWanted: 'React Development',
      message: 'Hi! I saw your React skills and would love to learn from you. I can teach you professional photography techniques in exchange.',
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      fromUser: {
        name: 'Mike Johnson',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
        location: 'New York, NY',
        rating: 4.7,
        points: 280
      },
      skillOffered: 'Python',
      skillWanted: 'UI/UX Design',
      message: 'Would love to exchange skills! I can help you with Python and data science concepts.',
      timestamp: '5 hours ago',
      status: 'pending'
    }
  ];

  const outgoingRequests = [
    {
      id: '3',
      toUser: {
        name: 'Emma Wilson',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
        location: 'London, UK',
        rating: 4.8,
        points: 450
      },
      skillOffered: 'JavaScript',
      skillWanted: 'UI/UX Design',
      message: 'Hi Emma, I would love to learn UI/UX design from you. I can teach you advanced JavaScript concepts.',
      timestamp: '1 day ago',
      status: 'pending'
    },
    {
      id: '4',
      toUser: {
        name: 'Alex Rodriguez',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
        location: 'Austin, TX',
        rating: 4.6,
        points: 190
      },
      skillOffered: 'Web Development',
      skillWanted: 'Guitar',
      message: 'Hey Alex! I would love to learn guitar from you. I can help you with web development in return.',
      timestamp: '3 days ago',
      status: 'pending'
    }
  ];

  const acceptedSwaps = [
    {
      id: '5',
      user: {
        name: 'Lisa Park',
        photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces',
        location: 'Seattle, WA',
        rating: 4.9,
        points: 380
      },
      skillExchange: 'Korean Language ↔ React Development',
      scheduledDate: '2024-01-15',
      status: 'scheduled'
    },
    {
      id: '6',
      user: {
        name: 'David Kim',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
        location: 'Vancouver, CA',
        rating: 4.5,
        points: 220
      },
      skillExchange: 'Node.js ↔ UI Design',
      scheduledDate: '2024-01-18',
      status: 'completed'
    }
  ];

  const handleAcceptRequest = (requestId) => {
    toast({
      title: "Request Accepted!",
      description: "The skill swap has been scheduled. Check your accepted swaps tab."
    });
  };

  const handleRejectRequest = (requestId) => {
    toast({
      title: "Request Rejected",
      description: "The request has been declined."
    });
  };

  const handleDeleteRequest = (requestId) => {
    toast({
      title: "Request Deleted",
      description: "Your outgoing request has been removed."
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Skill Swap Requests
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your incoming and outgoing skill swap requests
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Incoming ({incomingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Outgoing ({outgoingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Accepted ({acceptedSwaps.length})
            </TabsTrigger>
          </TabsList>

          {/* Incoming Requests */}
          <TabsContent value="incoming" className="space-y-4">
            {incomingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No incoming requests
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    When someone wants to swap skills with you, their requests will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              incomingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.fromUser.photo} alt={request.fromUser.name} />
                          <AvatarFallback>
                            {request.fromUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.fromUser.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.fromUser.location}
                          </CardDescription>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{request.fromUser.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {request.fromUser.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {request.timestamp}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Skill Exchange */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                          They offer: {request.skillOffered}
                        </Badge>
                        <span className="text-slate-400">↔</span>
                        <Badge variant="outline">
                          They want: {request.skillWanted}
                        </Badge>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Message:
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                        {request.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Outgoing Requests */}
          <TabsContent value="outgoing" className="space-y-4">
            {outgoingRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No outgoing requests
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Requests you send to other users will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              outgoingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.toUser.photo} alt={request.toUser.name} />
                          <AvatarFallback>
                            {request.toUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.toUser.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.toUser.location}
                          </CardDescription>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{request.toUser.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {request.toUser.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
                          Pending
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {request.timestamp}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Skill Exchange */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                          You offer: {request.skillOffered}
                        </Badge>
                        <span className="text-slate-400">↔</span>
                        <Badge variant="outline">
                          You want: {request.skillWanted}
                        </Badge>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Your message:
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                        {request.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Accepted Swaps */}
          <TabsContent value="accepted" className="space-y-4">
            {acceptedSwaps.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Check className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No accepted swaps
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Your scheduled skill swaps will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              acceptedSwaps.map((swap) => (
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
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {swap.user.location}
                          </CardDescription>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{swap.user.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {swap.user.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={swap.status === 'completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' 
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                        }
                      >
                        {swap.status === 'completed' ? 'Completed' : 'Scheduled'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Skill Exchange */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="text-center">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {swap.skillExchange}
                        </p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {new Date(swap.scheduledDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {swap.status === 'scheduled' && (
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Requests;
