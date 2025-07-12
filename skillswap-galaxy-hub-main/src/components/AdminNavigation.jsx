
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
  Shield, 
  Home, 
  Users, 
  MessageSquare, 
  Flag, 
  BarChart3, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  FileText,
  MessageCircle
} from 'lucide-react';

const AdminNavigation = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const adminNavItems = [
    { to: '/admin', label: 'Dashboard', icon: Home },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/swaps', label: 'Swaps', icon: MessageSquare },
    { to: '/admin/reports', label: 'Reports', icon: Flag },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {adminNavItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === item.to
              ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
          } ${mobile ? 'w-full justify-start' : ''}`}
          onClick={() => mobile && setIsOpen(false)}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  );

  if (!user?.role === 'admin') {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-red-200 dark:border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              SkillSync Admin
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

            {/* Admin Badge */}
            <Badge variant="destructive" className="hidden sm:flex">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photo} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <Badge variant="destructive" className="text-xs w-fit">
                      Administrator
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="cursor-pointer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Main Site
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-800 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.photo} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <Badge variant="destructive" className="text-xs">
                        Administrator
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <NavLinks mobile />
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <Link
                      to="/"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Main Site</span>
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

export default AdminNavigation;
