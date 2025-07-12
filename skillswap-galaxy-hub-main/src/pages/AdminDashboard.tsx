
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  Download, 
  Ban, 
  Check, 
  X,
  Search,
  Send,
  BarChart3,
  Shield,
  Activity
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Redirect if not admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Access Denied
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              You don't have admin privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock data - in real app would come from API
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalSwaps: 5632,
    pendingReports: 8,
    newUsersToday: 23,
    swapsToday: 45
  };

  const users = [
    {
      id: '1',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
      joinDate: '2024-01-15',
      skillsCount: 12,
      rating: 4.8,
      status: 'active',
      reports: 0
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      joinDate: '2024-01-10',
      skillsCount: 8,
      rating: 4.7,
      status: 'active',
      reports: 1
    },
    {
      id: '3',
      name: 'John Spammer',
      email: 'spammer@example.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces',
      joinDate: '2024-01-20',
      skillsCount: 3,
      rating: 2.1,
      status: 'flagged',
      reports: 5
    }
  ];

  const swapRequests = [
    {
      id: '1',
      requester: 'Sarah Chen',
      responder: 'Alex Rodriguez',
      skillOffered: 'Photography',
      skillWanted: 'Guitar',
      status: 'pending',
      createdAt: '2024-01-12',
      flagged: false
    },
    {
      id: '2',
      requester: 'Mike Johnson',
      responder: 'Emma Wilson',
      skillOffered: 'Python',
      skillWanted: 'UI/UX Design',
      status: 'accepted',
      createdAt: '2024-01-11',
      flagged: false
    },
    {
      id: '3',
      requester: 'John Spammer',
      responder: 'Lisa Park',
      skillOffered: 'Get Rich Quick Scheme',
      skillWanted: 'Korean',
      status: 'pending',
      createdAt: '2024-01-10',
      flagged: true
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBanUser = (userId: string, userName: string) => {
    toast({
      title: "User Banned",
      description: `${userName} has been banned from the platform.`,
      variant: "destructive"
    });
  };

  const handleRejectSwap = (swapId: string) => {
    toast({
      title: "Swap Request Rejected",
      description: "The flagged swap request has been rejected.",
    });
  };

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) return;
    
    toast({
      title: "Broadcast Sent",
      description: `Message sent to all ${stats.activeUsers} active users.`,
    });
    setBroadcastMessage('');
  };

  const handleDownloadReport = (type: string) => {
    toast({
      title: "Download Started",
      description: `${type} report is being generated and will download shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage users, monitor activity, and maintain platform quality
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">+{stats.newUsersToday} today</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active Users</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Swaps</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.totalSwaps.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">+{stats.swapsToday} today</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Pending Reports</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.pendingReports}
                  </p>
                  <p className="text-xs text-red-600">Requires attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                Platform Broadcast
              </CardTitle>
              <CardDescription>
                Send a message to all active users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your message to all users..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                rows={3}
              />
              <Button onClick={handleSendBroadcast} disabled={!broadcastMessage.trim()}>
                Send to {stats.activeUsers} users
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="swaps" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Swap Requests
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => handleDownloadReport('Users')}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className={user.status === 'flagged' ? 'border-red-200 bg-red-50 dark:bg-red-900/10' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.photo} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {user.email}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {user.skillsCount} skills
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              ⭐ {user.rating}
                            </Badge>
                            {user.reports > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {user.reports} reports
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={user.status === 'flagged' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                          {user.status}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                        {user.status === 'flagged' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Ban className="h-4 w-4 mr-2" />
                                Ban User
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Ban User</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to ban {user.name}? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleBanUser(user.id, user.name)}>
                                  Confirm Ban
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Swap Requests Tab */}
          <TabsContent value="swaps" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleDownloadReport('Swaps')}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="space-y-4">
              {swapRequests.map((swap) => (
                <Card key={swap.id} className={swap.flagged ? 'border-red-200 bg-red-50 dark:bg-red-900/10' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{swap.requester}</span>
                          <span className="text-slate-400">→</span>
                          <span className="font-medium">{swap.responder}</span>
                          {swap.flagged && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Flagged
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium">Offers:</span> {swap.skillOffered} 
                          <span className="mx-2">•</span>
                          <span className="font-medium">Wants:</span> {swap.skillWanted}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Created {new Date(swap.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          swap.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          swap.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {swap.status}
                        </Badge>
                        {swap.flagged && (
                          <Button variant="destructive" size="sm" onClick={() => handleRejectSwap(swap.id)}>
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Download user activity reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleDownloadReport('User Activity')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Swaps</CardTitle>
                  <CardDescription>All completed and pending swaps</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleDownloadReport('Skill Swaps')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback & Ratings</CardTitle>
                  <CardDescription>User feedback and rating data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleDownloadReport('Feedback')}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Platform Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>Key metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((stats.activeUsers / stats.totalUsers) * 100)}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      User Engagement
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {(stats.totalSwaps / stats.totalUsers).toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Avg Swaps/User
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.swapsToday}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Swaps Today
                    </div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {stats.newUsersToday}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      New Users Today
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
