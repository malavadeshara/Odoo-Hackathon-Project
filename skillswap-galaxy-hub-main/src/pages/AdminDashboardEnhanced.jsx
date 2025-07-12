import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  MessageSquare, 
  Flag, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3,
  Calendar,
  Star,
  Ban,
  Download,
  Send,
  Search,
  Filter,
  UserX,
  MessageCircle,
  FileText,
  Trash2,
  UserCheck
} from 'lucide-react';

const AdminDashboardEnhanced = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for enhanced dashboard
  const stats = [
    {
      title: "Total Users",
      value: "2,547",
      change: "+12% this month",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Swaps",
      value: "186",
      change: "+8% this week",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      title: "Pending Reports",
      value: "7",
      change: "-2 from yesterday",
      icon: Flag,
      color: "text-red-600"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+1.2% this month",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const allUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joinDate: "2024-01-15",
      status: "active",
      swaps: 12,
      rating: 4.8,
      lastActive: "2024-01-20",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      banned: false
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      joinDate: "2024-01-14",
      status: "active",
      swaps: 8,
      rating: 4.6,
      lastActive: "2024-01-19",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      banned: false
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      joinDate: "2024-01-13",
      status: "banned",
      swaps: 2,
      rating: 2.1,
      lastActive: "2024-01-16",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      banned: true
    }
  ];

  const swapRequests = [
    {
      id: 1,
      requester: "Sarah Johnson",
      responder: "Mike Chen",
      skillOffered: "React Development",
      skillWanted: "UI/UX Design",
      status: "pending",
      date: "2024-01-20",
      priority: "high"
    },
    {
      id: 2,
      requester: "Emma Wilson",
      responder: "Alex Rivera",
      skillOffered: "Python",
      skillWanted: "Data Science",
      status: "accepted",
      date: "2024-01-19",
      priority: "medium"
    },
    {
      id: 3,
      requester: "David Kim",
      responder: "Lisa Chang",
      skillOffered: "Digital Marketing",
      skillWanted: "Photography",
      status: "cancelled",
      date: "2024-01-18",
      priority: "low"
    }
  ];

  const spamReports = [
    {
      id: 1,
      user: "John Spam",
      skill: "Get Rich Quick Schemes",
      description: "Make $1000/day with this one weird trick! Click here to learn more!!!",
      reportedBy: "Multiple Users",
      date: "2024-01-20",
      status: "pending"
    },
    {
      id: 2,
      user: "Fake Guru",
      skill: "Cryptocurrency Mining",
      description: "I'll teach you how to mine Bitcoin with your phone! 100% guaranteed returns!",
      reportedBy: "Sarah M.",
      date: "2024-01-19",
      status: "pending"
    }
  ];

  const handleBanUser = (userId) => {
    console.log(`Banning user ${userId}`);
    // Handle ban logic
  };

  const handleUnbanUser = (userId) => {
    console.log(`Unbanning user ${userId}`);
    // Handle unban logic
  };

  const handleSwapAction = (swapId, action) => {
    console.log(`${action} swap ${swapId}`);
    // Handle swap actions
  };

  const handleRejectSpam = (reportId) => {
    console.log(`Rejecting spam report ${reportId}`);
    // Handle spam rejection
  };

  const handleSendMessage = () => {
    console.log('Sending platform-wide message');
    // Handle message sending
  };

  const handleDownloadReport = (type) => {
    console.log(`Downloading ${type} report`);
    // Handle report download
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && !user.banned) ||
                         (selectedFilter === 'banned' && user.banned);
    return matchesSearch && matchesFilter;
  });

  if (!user?.role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Card className="max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 text-destructive mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete control panel for SkillSync platform management
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Administrator
              </Badge>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-muted/50">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Fixed Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex items-center justify-start h-14 rounded-xl bg-muted/60 backdrop-blur-sm p-2 shadow-sm border-0 w-full max-w-none overflow-x-auto">
              <div className="flex items-center gap-1 px-2 whitespace-nowrap">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm shrink-0"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm shrink-0"
                >
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="swaps" 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm shrink-0"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Swaps</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="spam" 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm shrink-0"
                >
                  <Flag className="h-4 w-4" />
                  <span>Spam Control</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="messages" 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Messages</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm shrink-0"
                >
                  <FileText className="h-4 w-4" />
                  <span>Reports</span>
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Enhanced Recent Activity Card */}
              <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    Platform Activity
                  </CardTitle>
                  <CardDescription className="text-base">Recent platform statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">New Users Today</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 px-3 py-1">
                      +23
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">Sessions Completed</span>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-3 py-1">
                      47
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">Active Connections</span>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 px-3 py-1">
                      186
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-foreground">Avg. Session Rating</span>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced System Health Card */}
              <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    System Health
                  </CardTitle>
                  <CardDescription className="text-base">Platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">Server Status</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 px-3 py-1">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">Database</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 px-3 py-1">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">API Response Time</span>
                    <span className="font-bold text-lg text-foreground">124ms</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-foreground">Uptime</span>
                    <span className="font-bold text-lg text-foreground">99.9%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-8">
            <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">User Management</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Manage all platform users with ban/unban capabilities
                    </CardDescription>
                  </div>
                </div>
                
                {/* Enhanced Search and Filter */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 text-base bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-3 border border-border/50 rounded-lg bg-background text-foreground h-12 min-w-[180px] text-base focus:border-primary focus:outline-none"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active Users</option>
                    <option value="banned">Banned Users</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="h-14 px-6 font-semibold text-foreground">User</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Email</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Joined</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Swaps</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Rating</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Status</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-border/50 hover:bg-muted/50">
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.photo} alt={user.name} />
                                <AvatarFallback className="font-semibold">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-semibold text-foreground">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-muted-foreground">{user.email}</TableCell>
                          <TableCell className="px-6 py-4 text-muted-foreground">{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="px-6 py-4">
                            <span className="font-semibold text-foreground">{user.swaps}</span>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-foreground">{user.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge 
                              variant={user.banned ? 'destructive' : 'default'}
                              className="px-3 py-1 font-medium"
                            >
                              {user.banned ? 'Banned' : 'Active'}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => console.log(`View user ${user.id}`)}
                                className="h-9 w-9 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {user.banned ? (
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUnbanUser(user.id)}
                                  className="h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <UserCheck className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button 
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleBanUser(user.id)}
                                  className="h-9 w-9 p-0"
                                >
                                  <Ban className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-8">
            <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Swap Request Management</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Monitor and manage all skill swap requests
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Requester</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Responder</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Skills Exchange</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Date</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Status</TableHead>
                        <TableHead className="h-14 px-6 font-semibold text-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {swapRequests.map((swap) => (
                        <TableRow key={swap.id} className="border-border/50 hover:bg-muted/50">
                          <TableCell className="px-6 py-4 font-semibold text-foreground">{swap.requester}</TableCell>
                          <TableCell className="px-6 py-4 text-muted-foreground">{swap.responder}</TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="text-green-600 font-medium">Offers:</span> 
                                <span className="ml-1 text-foreground">{swap.skillOffered}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-blue-600 font-medium">Wants:</span> 
                                <span className="ml-1 text-foreground">{swap.skillWanted}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-muted-foreground">{new Date(swap.date).toLocaleDateString()}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge 
                              variant={
                                swap.status === 'pending' ? 'default' :
                                swap.status === 'accepted' ? 'default' : 'secondary'
                              }
                              className={`px-3 py-1 font-medium ${
                                swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200' :
                                swap.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                              }`}
                            >
                              {swap.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleSwapAction(swap.id, 'view')}
                                className="h-9 w-9 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {swap.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleSwapAction(swap.id, 'approve')}
                                    className="h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleSwapAction(swap.id, 'cancel')}
                                    className="h-9 w-9 p-0"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spam" className="space-y-8">
            <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <Flag className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Spam Control Center</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Review and reject spam skill descriptions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {spamReports.map((report) => (
                    <div key={report.id} className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-200/50 dark:border-red-800/50">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-foreground mb-2">
                            Spam Report: {report.skill}
                          </h4>
                          <p className="text-muted-foreground">
                            Reported by: <span className="font-medium">{report.reportedBy}</span> • 
                            User: <span className="font-medium">{report.user}</span>
                          </p>
                        </div>
                        <Badge variant="destructive" className="px-3 py-1 font-medium">
                          Spam Detected
                        </Badge>
                      </div>
                      <div className="p-4 bg-background/80 rounded-lg border mb-4">
                        <p className="text-foreground">
                          "{report.description}"
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(report.date).toLocaleDateString()}
                        </span>
                        <div className="flex gap-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => console.log(`Review report ${report.id}`)}
                            className="h-9"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectSpam(report.id)}
                            className="h-9"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Reject & Ban
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => console.log(`Ignore report ${report.id}`)}
                            className="h-9"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Ignore
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-8">
            <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Platform-Wide Messaging</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Send important announcements to all users
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">
                    Message Title
                  </label>
                  <Input
                    placeholder="Enter message title..."
                    className="h-12 text-base bg-background border-border/50 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground">
                    Message Content
                  </label>
                  <textarea
                    placeholder="Enter your platform-wide message here..."
                    rows={8}
                    className="w-full px-4 py-3 border border-border/50 rounded-lg bg-background text-foreground resize-none text-base focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-foreground font-medium">Send as urgent notification</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-foreground font-medium">Send email notification</span>
                  </label>
                </div>

                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 h-12 px-8 text-base font-semibold"
                >
                  <Send className="h-5 w-5 mr-3" />
                  Send Platform Message
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <Card className="shadow-md border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Download Reports</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Generate and download CSV reports for analysis
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <Card className="p-8 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 w-fit mx-auto mb-6">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-xl text-blue-900 dark:text-blue-100 mb-3">
                        Users Report
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 mb-6 leading-relaxed">
                        Complete user data with registration info, activity, and stats
                      </p>
                      <Button
                        onClick={() => handleDownloadReport('users')}
                        className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
                      >
                        <Download className="h-5 w-5 mr-3" />
                        Download CSV
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-8 bg-green-50/50 dark:bg-green-900/10 border-green-200/50 dark:border-green-800/50 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20 w-fit mx-auto mb-6">
                        <MessageSquare className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-xl text-green-900 dark:text-green-100 mb-3">
                        Swaps Report
                      </h3>
                      <p className="text-green-700 dark:text-green-300 mb-6 leading-relaxed">
                        All skill swap requests with status and completion data
                      </p>
                      <Button
                        onClick={() => handleDownloadReport('swaps')}
                        className="w-full bg-green-600 hover:bg-green-700 h-12 text-base font-semibold"
                      >
                        <Download className="h-5 w-5 mr-3" />
                        Download CSV
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-8 bg-purple-50/50 dark:bg-purple-900/10 border-purple-200/50 dark:border-purple-800/50 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900/20 w-fit mx-auto mb-6">
                        <Star className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-xl text-purple-900 dark:text-purple-100 mb-3">
                        Feedback Report
                      </h3>
                      <p className="text-purple-700 dark:text-purple-300 mb-6 leading-relaxed">
                        User feedback and ratings for all completed swaps
                      </p>
                      <Button
                        onClick={() => handleDownloadReport('feedback')}
                        className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-base font-semibold"
                      >
                        <Download className="h-5 w-5 mr-3" />
                        Download CSV
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Enhanced Custom Date Range */}
                <div className="p-8 bg-muted/30 rounded-xl border border-border/50">
                  <h4 className="font-semibold text-xl text-foreground mb-6">
                    Custom Date Range
                  </h4>
                  <div className="flex flex-col lg:flex-row gap-6 items-end">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-foreground block mb-3">From Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-border/50 rounded-lg bg-background text-foreground h-12 text-base focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-foreground block mb-3">To Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-border/50 rounded-lg bg-background text-foreground h-12 text-base focus:border-primary focus:outline-none"
                      />
                    </div>
                    <Button variant="outline" className="h-12 px-8 text-base font-semibold border-border/50">
                      Generate Custom Report
                    </Button>
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

export default AdminDashboardEnhanced;
