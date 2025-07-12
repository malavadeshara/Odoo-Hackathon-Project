
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock,
  Filter,
  Users,
  MessageCircle,
  ChevronDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=faces",
      rating: 4.9,
      skillsOffered: ["Python", "Data Science", "Machine Learning"],
      skillsWanted: ["React", "UI Design"],
      availability: true,
      responseTime: "Usually responds in 2 hours",
      completedSessions: 47,
      bio: "Data scientist with 5+ years experience. Love teaching Python and ML concepts!"
    },
    {
      id: 2,
      name: "Mike Chen",
      location: "New York, NY",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      rating: 4.8,
      skillsOffered: ["React", "JavaScript", "Node.js"],
      skillsWanted: ["Python", "DevOps"],
      availability: true,
      responseTime: "Usually responds in 1 hour",
      completedSessions: 32,
      bio: "Full-stack developer passionate about modern web technologies and clean code."
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "Austin, TX",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
      rating: 4.7,
      skillsOffered: ["UI Design", "Figma", "UX Research"],
      skillsWanted: ["React", "JavaScript"],
      availability: false,
      responseTime: "Usually responds in 4 hours",
      completedSessions: 28,
      bio: "UX/UI designer with a passion for creating beautiful and functional interfaces."
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seattle, WA",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
      rating: 4.9,
      skillsOffered: ["DevOps", "AWS", "Docker"],
      skillsWanted: ["Machine Learning", "Data Science"],
      availability: true,
      responseTime: "Usually responds in 30 minutes",
      completedSessions: 56,
      bio: "DevOps engineer helping teams scale their applications efficiently."
    },
    {
      id: 5,
      name: "Lisa Chang",
      location: "Los Angeles, CA",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
      rating: 4.6,
      skillsOffered: ["Photography", "Photoshop", "Creative Direction"],
      skillsWanted: ["Web Development", "React"],
      availability: true,
      responseTime: "Usually responds in 3 hours",
      completedSessions: 21,
      bio: "Creative photographer and visual artist looking to expand into web development."
    },
    {
      id: 6,
      name: "Alex Rivera",
      location: "Miami, FL",
      photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
      rating: 4.8,
      skillsOffered: ["Spanish", "Marketing", "Content Creation"],
      skillsWanted: ["Programming", "Data Analysis"],
      availability: true,
      responseTime: "Usually responds in 1 hour",
      completedSessions: 39,
      bio: "Marketing professional and native Spanish speaker eager to learn programming."
    }
  ];

  const allSkills = [
    "React", "JavaScript", "Python", "UI Design", "Machine Learning", 
    "Data Science", "Node.js", "DevOps", "AWS", "Docker", "Figma", 
    "UX Research", "Photography", "Photoshop", "Spanish", "Marketing"
  ];

  const locations = [
    "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", 
    "Los Angeles, CA", "Miami, FL", "Chicago, IL", "Boston, MA"
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === 'all' || 
                        user.skillsOffered.includes(selectedSkill) || 
                        user.skillsWanted.includes(selectedSkill);
    
    const matchesLocation = selectedLocation === 'all' || user.location === selectedLocation;
    
    return matchesSearch && matchesSkill && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Browse Skill Partners
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Find the perfect match for your skill swap journey
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Skill Filter */}
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            Showing {filteredUsers.length} of {users.length} skill partners
          </p>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-indigo-100 dark:ring-indigo-800">
                      <AvatarImage src={user.photo} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-slate-900 dark:text-white">
                        {user.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {user.availability && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating and Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-slate-900 dark:text-white">
                      {user.rating}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      ({user.completedSessions} sessions)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                    <Clock className="h-3 w-3" />
                    <span>{user.availability ? 'Available' : 'Busy'}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                  {user.bio}
                </p>

                {/* Skills Offered */}
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Offers:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill) => (
                      <Badge key={skill} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Skills Wanted */}
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Wants to learn:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-blue-200 text-blue-800 dark:border-blue-700 dark:text-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Response Time */}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user.responseTime}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <Users className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No skill partners found
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('all');
                setSelectedLocation('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
