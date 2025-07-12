
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Calendar, MapPin, Star, Plus, Trophy, Zap, BookOpen, Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  if (!user) return null;

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      const updatedSkills = [...user.skillsOffered, newSkillOffered.trim()];
      updateUser({ skillsOffered: updatedSkills });
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      const updatedSkills = [...user.skillsWanted, newSkillWanted.trim()];
      updateUser({ skillsWanted: updatedSkills });
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (skillToRemove: string) => {
    const updatedSkills = user.skillsOffered.filter(skill => skill !== skillToRemove);
    updateUser({ skillsOffered: updatedSkills });
  };

  const removeSkillWanted = (skillToRemove: string) => {
    const updatedSkills = user.skillsWanted.filter(skill => skill !== skillToRemove);
    updateUser({ skillsWanted: updatedSkills });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your skills and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location || 'Location not set'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {user.points}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Points</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-1">
                        <Star className="h-5 w-5" />
                        {user.rating}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Rating</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.badges.map((badge) => (
                        <Badge key={badge} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                          <Trophy className="h-3 w-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <Label htmlFor="availability" className="font-medium">
                        Available for swaps
                      </Label>
                      <p className="text-sm text-slate-500">
                        Let others know you're active
                      </p>
                    </div>
                    <Switch
                      id="availability"
                      checked={user.availability}
                      onCheckedChange={(checked) => updateUser({ availability: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-indigo-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Skills Offered</span>
                  <span className="font-semibold">{user.skillsOffered.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Skills Wanted</span>
                  <span className="font-semibold">{user.skillsWanted.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Successful Swaps</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Pending Requests</span>
                  <span className="font-semibold">3</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills Offered */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Skills I Offer
                </CardTitle>
                <CardDescription>
                  Share your expertise with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20"
                        onClick={() => removeSkillOffered(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                    {user.skillsOffered.length === 0 && (
                      <p className="text-slate-500">No skills added yet</p>
                    )}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill I Offer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a Skill You Offer</DialogTitle>
                        <DialogDescription>
                          What skill would you like to teach others?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="skill-offered">Skill Name</Label>
                          <Input
                            id="skill-offered"
                            placeholder="e.g., React Development, Guitar, Cooking"
                            value={newSkillOffered}
                            onChange={(e) => setNewSkillOffered(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                          />
                        </div>
                        <Button onClick={addSkillOffered} className="w-full">
                          Add Skill
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Skills Wanted */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Skills I Want to Learn
                </CardTitle>
                <CardDescription>
                  What would you like to learn from others?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20"
                        onClick={() => removeSkillWanted(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                    {user.skillsWanted.length === 0 && (
                      <p className="text-slate-500">No skills added yet</p>
                    )}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill I Want
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a Skill You Want to Learn</DialogTitle>
                        <DialogDescription>
                          What skill would you like to learn from others?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="skill-wanted">Skill Name</Label>
                          <Input
                            id="skill-wanted"
                            placeholder="e.g., Python, Photography, Spanish"
                            value={newSkillWanted}
                            onChange={(e) => setNewSkillWanted(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                          />
                        </div>
                        <Button onClick={addSkillWanted} className="w-full">
                          Add Skill
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        Skill swap completed with Sarah
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        You taught React, learned Photography • 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-200">
                        New skill request received
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Mike wants to learn JavaScript • 5 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-200">
                        Badge earned: Skill Master
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        Completed 10 successful skill swaps • 1 day ago
                      </p>
                    </div>
                  </div>
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
