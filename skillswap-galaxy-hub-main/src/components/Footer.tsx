
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SkillSync</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              The premier platform for skill swapping. Connect with others, learn new skills, 
              and share your expertise in a gamified environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2">
              <Link to="/browse" className="block text-slate-300 hover:text-white transition-colors">
                Browse Skills
              </Link>
              <Link to="/leaderboard" className="block text-slate-300 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Link to="/feedback" className="block text-slate-300 hover:text-white transition-colors">
                Feedback
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 SkillSync. All rights reserved. Built with ❤️ for skill sharing.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
