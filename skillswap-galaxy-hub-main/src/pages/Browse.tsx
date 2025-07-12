
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Star, MessageSquare, Calendar, Filter } from 'lucide-react';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - in real app would come from API
  const users = [
    {
      id: '1',
      name: 'Sarah Chen',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=faces',
      location: 'San Francisco, CA',
      rating: 4.9,
      points: 320,
      badges: ['Photography Expert', 'Helper'],
      skillsOffered: ['Photography', 'Lightroom', 'Portrait Photography'],
      skillsWanted: ['React', 'Web Development'],
      availability: true,
      bio: 'Professional photographer with 8 years of experience. Love teaching composition and lighting techniques.'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      location: 'New York, NY',
      rating: 4.7,
      points: 280,
      badges: ['Code Master', 'Mentor'],
      skillsOffered: ['Python', 'Machine Learning', 'Data Science'],
      skillsWanted: ['UI/UX Design', 'Figma'],
      availability: true,
      bio: 'Data scientist by day, teacher by passion. Specializing in ML algorithms and Python optimization.'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
      location: 'London, UK',
      rating: 4.8,
      points: 450,
      badges: ['Design Guru', 'Creative', 'Skill Master'],
      skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      skillsWanted: ['Frontend Development', 'TypeScript'],
      availability: false,
      bio: 'Senior UX designer with a passion for creating beautiful, functional interfaces. 10+ years experience.'
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      location: 'Austin, TX',
      rating: 4.6,
      points: 190,
      badges: ['Music Mentor', 'Helper'],
      skillsOffered: ['Guitar', 'Music Theory', 'Song Writing'],
      skillsWanted: ['Video Editing', 'Audio Production'],
      availability: true,
      bio: 'Musician and music teacher. Been playing guitar for 15 years and love sharing the joy of music.'
    },
    {
      id: '5',
      name: 'Lisa Park',
      photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=faces',
      location: 'Seattle, WA',
      rating: 4.9,
      points: 380,
      badges: ['Language Expert', 'Cultural Bridge'],
      skillsOffered: ['Korean Language', 'Japanese', 'Translation'],
      skillsWanted: ['Spanish', 'Public Speaking'],
      availability: true,
      bio: 'Native Korean speaker, fluent in Japanese. Love helping others learn Asian languages and culture.'
    },
    {
      id: '6',
      name: 'David Kim',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
      location: 'Vancouver, CA',
      rating: 4.5,
      points: 220,
      badges: ['Code Ninja', 'Problem Solver'],
      skillsOffered: ['React', 'Node.js', 'Full Stack Development'],
      skillsWanted: ['DevOps', 'AWS', 'Docker'],
      availability: true,
      bio: 'Full-stack developer with 6 years experience. Passionate about clean code and modern web technologies.'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'available' && user.availability) ||
      (selectedFilter === 'high-rated' && user.rating >= 4.8);

    return matchesSearch && matchesFilter;
  });

  const handleRequestSwap = (userId: string, userName: string) => {
    console.log(`Requesting swap with ${userName} (${userId})`);
    // In real app, would send request to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Browse Skills
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Discover amazing people and their skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                size="sm"
              >
                All Users
              </Button>
              <Button
                variant={selectedFilter === 'available' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('available')}
                size="sm"
              >
                Available
              </Button>
              <Button
                variant={selectedFilter === 'high-rated' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('high-rated')}
                size="sm"
              >
                Top Rated
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            Found {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
          </p>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.photo} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {user.availability && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Rating and Points */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{user.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {user.points} pts
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                  {user.bio}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1">
                  {user.badges.slice(0, 2).map((badge) => (
                    <Badge key={badge} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {user.badges.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.badges.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Skills Offered */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Offers:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill) => (
                      <Badge key={skill} className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                        {skill}
                      </Badge>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                        +{user.skillsOffered.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Wants:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.skillsWanted.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleRequestSwap(user.id, user.name)}
                  disabled={!user.availability}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {user.availability ? 'Request Swap' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Try adjusting your search terms or filters to find more users.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
