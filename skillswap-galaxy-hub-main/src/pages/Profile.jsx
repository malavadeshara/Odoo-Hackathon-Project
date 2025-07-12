
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  MapPin, 
  Camera, 
  Save, 
  Star, 
  Trophy,
  Settings,
  Bell,
  Shield,
  Globe
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: 'Passionate learner and teacher. Love sharing knowledge and learning new skills from amazing people around the world.',
    isPublic: true,
    emailNotifications: true,
    skillMatchNotifications: true,
    pushNotifications: false
  });

  if (!user) return null;

  const handleSave = () => {
    updateUser({
      name: formData.name,
      location: formData.location
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    
    setIsEditing(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ photo: reader.result });
        toast({
          title: "Photo Updated",
          description: "Your profile photo has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
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

                  {/* Bio */}
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">About</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {formData.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-600" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and profile information
                  </CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Settings className="h-4 w-4 mr-2" />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      disabled
                      className="mt-1 bg-slate-50 dark:bg-slate-800"
                    />
                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control who can see your profile and contact you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <Label htmlFor="public-profile" className="font-medium">
                        Public Profile
                      </Label>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Allow others to discover and contact you
                    </p>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                  />
                </div>

                <div className="text-sm text-slate-600 dark:text-slate-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-medium mb-1">Privacy Notice:</p>
                  <p>When your profile is public, other users can see your skills, ratings, and send you skill swap requests. Your email and personal information remain private.</p>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Receive updates via email about your skill swaps
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <Label htmlFor="skill-match" className="font-medium">
                      Skill Match Alerts
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get notified when someone offers skills you want
                    </p>
                  </div>
                  <Switch
                    id="skill-match"
                    checked={formData.skillMatchNotifications}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, skillMatchNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Receive real-time notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={formData.pushNotifications}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
