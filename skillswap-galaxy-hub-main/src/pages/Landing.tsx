
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Users, 
  Trophy, 
  MessageSquare, 
  Shield, 
  Star,
  Zap,
  BookOpen,
  Target,
  Award
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Skill Matching',
      description: 'Connect with people who have the skills you want and need the skills you offer.'
    },
    {
      icon: Trophy,
      title: 'Gamification',
      description: 'Earn points and badges as you help others and learn new skills.'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Requests',
      description: 'Send and receive skill swap requests instantly with our live system.'
    },
    {
      icon: Shield,
      title: 'Admin Moderation',
      description: 'Quality assurance with admin tools to maintain a safe learning environment.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '25,000+', label: 'Skills Shared' },
    { number: '50,000+', label: 'Successful Swaps' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                🚀 Welcome to the Future of Learning
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                SkillSync
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                Where Skills Meet Opportunity
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the premier platform for skill swapping. Learn from experts, share your knowledge, 
              and build meaningful connections in our gamified learning community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" asChild>
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/browse">
                  Explore Skills
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose SkillSync?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our platform combines the best of social learning with gamification to create 
              an engaging skill-sharing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Our Mission: Democratizing Knowledge
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                At SkillSync, we believe that everyone has something valuable to teach and something 
                important to learn. Our platform breaks down traditional barriers to education by 
                creating a peer-to-peer learning ecosystem.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Learn Anything</h4>
                    <p className="text-slate-600 dark:text-slate-300">From coding to cooking, our community offers diverse skills.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Personalized Matching</h4>
                    <p className="text-slate-600 dark:text-slate-300">Our algorithm connects you with the perfect skill partners.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Recognition System</h4>
                    <p className="text-slate-600 dark:text-slate-300">Earn badges and points that showcase your expertise.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl p-8 text-white">
                <div className="h-full flex flex-col justify-center text-center">
                  <Zap className="h-16 w-16 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-indigo-100 mb-6">
                    Start your skill-sharing journey today and connect with thousands of learners worldwide.
                  </p>
                  <Button variant="secondary" size="lg" asChild>
                    <Link to="/register">
                      Sign Up Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of learners who are already swapping skills and building careers on SkillSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link to="/register">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900" asChild>
              <Link to="/browse">
                Browse Available Skills
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
