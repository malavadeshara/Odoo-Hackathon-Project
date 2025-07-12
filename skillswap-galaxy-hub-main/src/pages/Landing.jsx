
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Star, 
  Trophy, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  MessageSquare,
  Search,
  Shield,
  Clock
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: "Find Skill Partners",
      description: "Connect with people who have the skills you want to learn and can benefit from your expertise."
    },
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our algorithm matches you with compatible skill partners based on your interests and availability."
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Built-in messaging and scheduling tools make coordinating skill swaps effortless."
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Build trust in the community with our transparent rating and review system."
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Earn points, badges, and climb leaderboards as you share and learn new skills."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Verified profiles and community moderation ensure a safe learning environment."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Skills Shared" },
    { number: "25K+", label: "Successful Swaps" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900" />
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl">
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Skill
              </span>
              <span className="text-slate-900 dark:text-white">Sync</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect, Learn, and Grow Together. The platform where knowledge flows freely and everyone teaches while they learn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Link to="/browse">Explore Skills</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              Features
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to grow
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our platform provides all the tools you need to find, connect, and learn from skill partners around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              How It Works
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Start skill swapping in 3 simple steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Create Your Profile
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Tell us about your skills and what you'd like to learn. Upload a photo and set your availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Find Perfect Matches
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Browse through our community or let our smart matching algorithm suggest ideal skill partners for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Start Learning & Teaching
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Connect with your matches, schedule sessions, and start your mutual learning journey together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to unlock your learning potential?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already growing together on SkillSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-slate-50 px-8 py-4 text-lg"
            >
              <Link to="/register">
                Join Now - It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
