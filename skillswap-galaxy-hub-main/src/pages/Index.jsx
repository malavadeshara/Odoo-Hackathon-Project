
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Skill
          </span>
          <span className="text-slate-900 dark:text-white">Sync</span>
        </h1>
        <p className="text-2xl text-slate-600 dark:text-slate-300 mb-8">
          Connect, Learn, and Grow Together
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-lg mx-auto">
          The platform where knowledge flows freely and everyone teaches while they learn.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </div>
  );
};

export default Index;
