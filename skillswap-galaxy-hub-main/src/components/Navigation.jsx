
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Zap, 
  Home, 
  Search, 
  MessageSquare, 
  Trophy, 
  User, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Shield
} from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/browse', label: 'Browse', icon: Search },
    { to: '/requests', label: 'Requests', icon: MessageSquare, requireAuth: true },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  if (user?.role === 'admin') {
    navItems.push({ to: '/admin', label: 'Admin', icon: Shield, requireAuth: true });
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => {
        if (item.requireAuth && !user) return null;
        
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.to
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
            } ${mobile ? 'w-full justify-start' : ''}`}
            onClick={() => mobile && setIsOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SkillSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hidden sm:flex"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {user ? (
              <>
                {/* Points Badge - Desktop */}
                <Badge variant="secondary" className="hidden sm:flex">
                  {user.points} pts
                </Badge>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photo} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/feedback" className="cursor-pointer">
                        <Trophy className="mr-2 h-4 w-4" />
                        My Feedback
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {user && (
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photo} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {user.points} pts
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col space-y-2">
                    <NavLinks mobile />
                  </div>

                  {user && (
                    <>
                      <div className="border-t pt-4 space-y-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Home className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="justify-start w-full"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  )}

                  {!user && (
                    <div className="border-t pt-4 space-y-2">
                      <Button variant="ghost" asChild className="w-full justify-start">
                        <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link to="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                      </Button>
                    </div>
                  )}

                  {/* Theme Toggle Mobile */}
                  <Button
                    variant="ghost"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="justify-start w-full"
                  >
                    {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
