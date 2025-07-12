import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Zap, 
  Crown, 
  Medal, 
  Award, 
  TrendingUp,
  Calendar,
  Users
} from 'lucide-react';

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');

  // Mock data - in real app would come from API
  const topUsers = [
    {
      id: '1',
      name: 'Emma Wilson',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
      points: 2450,
      level: 'Skill Master',
      badges: ['Design Guru', 'Mentor', 'Top Contributor'],
      skillsShared: 48,
      rating: 4.9,
      rank: 1,
      monthlyPoints: 320
    },
    {
      id: '2',
      name: 'Mike Johnson',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      points: 2280,
      level: 'Expert',
      badges: ['Code Master', 'Problem Solver'],
      skillsShared: 42,
      rating: 4.8,
      rank: 2,
      monthlyPoints: 290
    },
    {
      id: '3',
      name: 'Sarah Chen',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=faces',
      points: 2150,
      level: 'Expert',
      badges: ['Photography Expert', 'Creative'],
      skillsShared: 38,
      rating: 4.9,
      rank: 3,
      monthlyPoints: 275
    },
    {
      id: '4',
      name: 'Lisa Park',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces',
      points: 1890,
      level: 'Advanced',
      badges: ['Language Expert', 'Cultural Bridge'],
      skillsShared: 35,
      rating: 4.8,
      rank: 4,
      monthlyPoints: 245
    },
    {
      id: '5',
      name: 'Alex Rodriguez',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      points: 1650,
      level: 'Advanced',
      badges: ['Music Mentor', 'Helper'],
      skillsShared: 29,
      rating: 4.7,
      rank: 5,
      monthlyPoints: 220
    },
    {
      id: '6',
      name: 'David Kim',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
      points: 1420,
      level: 'Intermediate',
      badges: ['Code Ninja', 'Team Player'],
      skillsShared: 24,
      rating: 4.6,
      rank: 6,
      monthlyPoints: 190
    },
    {
      id: '7',
      name: 'Maria Garcia',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces',
      points: 1180,
      level: 'Intermediate',
      badges: ['Language Helper', 'Communicator'],
      skillsShared: 20,
      rating: 4.5,
      rank: 7,
      monthlyPoints: 165
    },
    {
      id: '8',
      name: 'James Wilson',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces',
      points: 980,
      level: 'Rising Star',
      badges: ['Helper', 'Quick Learner'],
      skillsShared: 16,
      rating: 4.4,
      rank: 8,
      monthlyPoints: 140
    }
  ];

  const badges = [
    {
      name: 'Skill Master',
      description: 'Complete 50+ successful skill swaps',
      icon: Crown,
      rarity: 'legendary',
      holders: 12
    },
    {
      name: 'Expert Teacher',
      description: 'Maintain 4.8+ rating with 20+ reviews',
      icon: Award,
      rarity: 'epic',
      holders: 28
    },
    {
      name: 'Community Helper',
      description: 'Help 25+ people learn new skills',
      icon: Users,
      rarity: 'rare',
      holders: 156
    },
    {
      name: 'Quick Learner',
      description: 'Learn 10+ skills in 30 days',
      icon: TrendingUp,
      rarity: 'common',
      holders: 342
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-slate-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-slate-600 dark:text-slate-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800';
      case 2:
        return 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border-slate-200 dark:border-slate-700';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800';
      default:
        return 'hover:shadow-md transition-shadow';
    }
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'epic':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 'rare':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default:
        return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Celebrate our top skill sharers and their achievements
          </p>
        </div>

        <Tabs defaultValue="rankings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rankings" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Rankings
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Badges
            </TabsTrigger>
          </TabsList>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="space-y-6">
            {/* Period Selector */}
            <div className="flex justify-center space-x-2">
              <Button
                variant={selectedPeriod === 'all-time' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('all-time')}
                size="sm"
              >
                All Time
              </Button>
              <Button
                variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
                onClick={() => setSelectedPeriod('monthly')}
                size="sm"
              >
                This Month
              </Button>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {topUsers.slice(0, 3).map((user, index) => {
                const positions = [1, 0, 2]; // Center the #1, left #2, right #3
                const actualIndex = positions.indexOf(index);
                const actualUser = topUsers[actualIndex];
                
                return (
                  <Card 
                    key={actualUser.id} 
                    className={`text-center ${getRankBg(actualUser.rank)} ${
                      actualUser.rank === 1 ? 'md:scale-110 md:z-10 relative' : ''
                    }`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-center mb-2">
                        {getRankIcon(actualUser.rank)}
                      </div>
                      <Avatar className="w-20 h-20 mx-auto mb-3">
                        <AvatarImage src={actualUser.photo} alt={actualUser.name} />
                        <AvatarFallback className="text-xl">
                          {actualUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">{actualUser.name}</CardTitle>
                      <CardDescription>{actualUser.level}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-1">
                          <Zap className="h-4 w-4 text-indigo-600" />
                          <span className="font-semibold">
                            {selectedPeriod === 'monthly' ? actualUser.monthlyPoints : actualUser.points} pts
                          </span>
                        </div>
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{actualUser.rating} rating</span>
                        </div>
                        <div className="flex justify-center">
                          <Badge variant="secondary" className="text-xs">
                            {actualUser.skillsShared} skills shared
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Rest of the Rankings */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Complete Rankings
              </h3>
              {topUsers.map((user) => (
                <Card key={user.id} className={getRankBg(user.rank)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">
                          {getRankIcon(user.rank)}
                        </div>
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
                            {user.level}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {selectedPeriod === 'monthly' ? user.monthlyPoints : user.points}
                          </div>
                          <div className="text-xs text-slate-500">Points</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{user.rating}</span>
                          </div>
                          <div className="text-xs text-slate-500">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{user.skillsShared}</div>
                          <div className="text-xs text-slate-500">Skills</div>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {user.badges.slice(0, 3).map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Achievement Badges
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Unlock these badges by being an active member of our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {badges.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <Card key={badge.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${getBadgeColor(badge.rarity)}`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{badge.name}</CardTitle>
                          <Badge className={`${getBadgeColor(badge.rarity)} text-xs`}>
                            {badge.rarity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        {badge.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          {badge.holders} people have this badge
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {((badge.holders / 1000) * 100).toFixed(1)}% of users
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Your Progress */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Your Progress
                </CardTitle>
                <CardDescription>
                  Keep sharing skills to unlock more badges!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      150
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Total Points
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      2
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Badges Unlocked
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      12
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Skills Shared
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      4.8
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Average Rating
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

export default Leaderboard;
