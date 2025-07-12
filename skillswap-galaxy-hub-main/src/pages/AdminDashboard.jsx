
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock admin data
  const stats = [
    {
      title: "Total Users",
      value: "2,547",
      change: "+12% this month",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Sessions",
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

  const pendingReports = [
    {
      id: 1,
      reporter: "Sarah Johnson",
      reported: "Mike Chen",
      type: "Inappropriate Behavior",
      description: "User was unprofessional during session",
      date: "2024-01-15",
      status: "pending",
      severity: "medium"
    },
    {
      id: 2,
      reporter: "Emma Wilson",
      reported: "Alex Rivera",
      type: "No Show",
      description: "Didn't attend scheduled session without notice",
      date: "2024-01-14",
      status: "pending",
      severity: "low"
    },
    {
      id: 3,
      reporter: "David Kim",
      reported: "Lisa Chang",
      type: "Spam/Scam",
      description: "Trying to sell products during skill swap",
      date: "2024-01-13",
      status: "pending",
      severity: "high"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joinDate: "2024-01-15",
      status: "active",
      sessions: 0,
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      joinDate: "2024-01-14",
      status: "pending",
      sessions: 0,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      joinDate: "2024-01-13",
      status: "active",
      sessions: 2,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
    }
  ];

  const handleReportAction = (reportId, action) => {
    console.log(`${action} report ${reportId}`);
    // Handle report actions
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`);
    // Handle user actions
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Access Denied
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Monitor and manage the SkillSync platform
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {stat.change}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Activity
                  </CardTitle>
                  <CardDescription>Recent platform statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">New Users Today</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      +23
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Sessions Completed</span>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      47
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Active Connections</span>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      186
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Avg. Session Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    System Health
                  </CardTitle>
                  <CardDescription>Platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Server Status</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Database</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Optimal
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">API Response Time</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">124ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Uptime</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">99.9%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Pending Reports
                </CardTitle>
                <CardDescription>
                  User reports requiring admin attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div key={report.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {report.type}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {report.reporter} reported {report.reported}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            report.severity === 'high' ? 'destructive' :
                            report.severity === 'medium' ? 'default' : 'secondary'
                          }
                        >
                          {report.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(report.date).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReportAction(report.id, 'view')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReportAction(report.id, 'resolve')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReportAction(report.id, 'escalate')}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Escalate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Users
                </CardTitle>
                <CardDescription>
                  Newly registered users requiring approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.photo} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {user.email}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Joined {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'}
                        >
                          {user.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'view')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserAction(user.id, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Platform usage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400">
                    [Chart placeholder - Would integrate with analytics service]
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Popular Skills</CardTitle>
                  <CardDescription>Most requested skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: 'React', count: 45 },
                    { skill: 'Python', count: 38 },
                    { skill: 'UI Design', count: 32 },
                    { skill: 'JavaScript', count: 28 },
                    { skill: 'Data Science', count: 24 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-900 dark:text-white">{item.skill}</span>
                      <Badge>{item.count} requests</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
