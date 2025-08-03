import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@mui/material';
import {
  Dashboard,
  Category,
  Inventory,
  Logout,
  ShoppingCart,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { text: 'Products', icon: <Inventory />, path: '/admin/products' },
  { text: 'Categories', icon: <Category />, path: '/admin/categories' },
  { text: 'Shop View', icon: <ShoppingCart />, path: '/' },
];

export default function Layout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {navItems.map(({ text, icon, path }) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={path}
            sx={{
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              color: '#1976d2',
            }}
          >
            <ListItemIcon sx={{ color: '#1976d2' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            mt: 2,
            '&:hover': {
              backgroundColor: '#fdecea',
            },
            color: '#d32f2f',
          }}
        >
          <ListItemIcon sx={{ color: '#d32f2f' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#1976d2',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#fafafa',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
