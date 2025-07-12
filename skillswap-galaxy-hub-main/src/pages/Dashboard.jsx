
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Trophy, 
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const recentActivity = [
    {
      id: 1,
      type: 'swap',
      description: 'Completed Python lesson with Sarah Johnson',
      time: '2 hours ago',
      points: 15
    },
    {
      id: 2,
      type: 'request',
      description: 'New swap request from Mike Chen for React tutoring',
      time: '5 hours ago',
      action: 'pending'
    },
    {
      id: 3,
      type: 'achievement',
      description: 'Earned "Mentor" badge for completing 10 sessions',
      time: '1 day ago',
      badge: 'Mentor'
    },
    {
      id: 4,
      type: 'feedback',
      description: 'Received 5-star rating from Alex Rivera',
      time: '2 days ago',
      rating: 5
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      skill: 'JavaScript',
      partner: 'Emma Wilson',
      date: 'Today, 3:00 PM',
      type: 'teaching',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces'
    },
    {
      id: 2,
      skill: 'UI Design',
      partner: 'David Kim',
      date: 'Tomorrow, 10:00 AM',
      type: 'learning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces'
    },
    {
      id: 3,
      skill: 'Python',
      partner: 'Lisa Chang',
      date: 'Friday, 2:00 PM',
      type: 'teaching',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces'
    }
  ];

  const skillProgress = [
    { skill: 'React', level: 85, sessions: 12 },
    { skill: 'Python', level: 60, sessions: 8 },
    { skill: 'UI Design', level: 40, sessions: 5 },
    { skill: 'Node.js', level: 25, sessions: 3 }
  ];

  const stats = [
    {
      title: "Total Points",
      value: user?.points || 150,
      icon: Trophy,
      change: "+25 this week",
      color: "text-yellow-600"
    },
    {
      title: "Skills Learned",
      value: 8,
      icon: Target,
      change: "+2 this month",
      color: "text-blue-600"
    },
    {
      title: "Sessions Completed",
      value: 24,
      icon: CheckCircle,
      change: "+5 this week",
      color: "text-green-600"
    },
    {
      title: "Average Rating",
      value: user?.rating || 4.8,
      icon: Star,
      change: "+0.2 this month",
      color: "text-purple-600"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photo} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl">
                {user.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user.name}!
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                {user.location} • {user.availability ? 'Available' : 'Busy'}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>
                  Your scheduled skill swap sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session.avatar} alt={session.partner} />
                          <AvatarFallback>{session.partner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {session.skill} with {session.partner}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {session.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant={session.type === 'teaching' ? 'default' : 'secondary'}>
                        {session.type === 'teaching' ? 'Teaching' : 'Learning'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Progress */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Skill Progress
                </CardTitle>
                <CardDescription>
                  Track your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {skill.skill}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {skill.sessions} sessions
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {skill.level}% complete
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-slate-900 dark:text-white">
                          {activity.description}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          {activity.time}
                        </p>
                        {activity.points && (
                          <Badge className="mt-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            +{activity.points} points
                          </Badge>
                        )}
                        {activity.rating && (
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {user.badges?.map((badge, index) => (
                    <div key={index} className="text-center p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg">
                      <Award className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {badge}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
