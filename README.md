# GCPS Crossing Guard Management System

## Overview
A professional web-based management system for Gwinnett County Public Schools crossing guards with rotating security credentials and comprehensive admin controls.

## Features

### Security
- **Rotating Credentials**: Guard and regular admin usernames rotate every 360 days for enhanced security
- **Super Admin Access**: Non-rotating super admin credentials for system oversight
- **Session Management**: Secure localStorage-based authentication

### User Types

#### 1. Crossing Guards
- **Login**: Rotating username system (guard1, guard2, guard3)
- **School Selection**: Choose assigned school after login
- **Dashboard Features**:
  - View schedule
  - View announcements
  - Access resources (handbook, safety guidelines, contacts)
  - Clock out with confirmation

#### 2. Regular Administrators
- **Login**: Rotating username system (admin1, admin2, admin3)
- **Dashboard Features**:
  - Real-time guard location tracking with interactive map
  - Manage guards
  - View reports
  - Access administrative resources
  - Clock out with confirmation

#### 3. Super Administrators
- **Login**: Non-rotating credentials (superadmin, sysadmin)
- **Additional Features**:
  - All regular admin features
  - Manage administrator accounts
  - System settings access
  - View rotation schedules
  - Full system oversight

## File Structure

```
├── index.html                      # Main landing page
├── index.js                        # Landing page logic
├── style.css                       # Landing page styles
│
├── Guard Files
│   ├── guard_login.html           # Guard login page
│   ├── guard_login.js             # Guard login logic with rotation
│   ├── guard_login-style.css      # Guard login styles
│   ├── choose-school.html         # School selection page
│   ├── school-choose.js           # School selection logic
│   ├── school-choosing-style.css  # School selection styles
│   ├── guard_dashboard.html       # Guard dashboard
│   ├── guard_dashboard.js         # Guard dashboard logic
│   └── dashboard-style.css        # Guard dashboard styles
│
├── Admin Files
│   ├── admin_login.html           # Regular admin login
│   ├── admin_login.js             # Admin login logic with rotation
│   ├── admin_login-style.css      # Admin login styles
│   ├── admin_dashboard.html       # Regular admin dashboard
│   ├── admin_dashboard.js         # Admin dashboard logic
│   └── admin_dashboard-style.css  # Admin dashboard styles
│
└── Super Admin Files
    ├── super_admin_login.html     # Super admin login
    ├── super_admin_login.js       # Super admin login logic
    ├── super_admin_panel.html     # Super admin panel
    └── super_admin_panel.js       # Super admin panel logic
```

## Current Credentials

### Crossing Guards (Rotating - 360 day cycle)
Currently active based on rotation starting January 1, 2024:
- guard1 / guard1
- guard2 / guard2
- guard3 / guard3

### Regular Administrators (Rotating - 360 day cycle)
Currently active based on rotation starting January 1, 2024:
- admin1 / password1
- admin2 / password2
- admin3 / password3

### Super Administrators (Non-Rotating)
- superadmin / SuperSecure123!
- sysadmin / SystemAdmin456!

**⚠️ IMPORTANT: Change these default credentials before production deployment!**

## Rotation System

The system uses a 360-day rotation cycle starting from January 1, 2024:
- **Days 1-360**: First credential set active
- **Days 361-720**: Second credential set active
- **Days 721-1080**: Third credential set active
- Then repeats...

The active credential is calculated automatically based on the current date.

## API Integration Points

The system includes TODO markers for API integration:

### Guard Dashboard (`guard_dashboard.js`)
- Clock out logging (lines ~80-93)

### Admin Dashboard (`admin_dashboard.js`)
- Guard location fetching (lines ~70-100)
- Clock out logging (lines ~230-243)

### Super Admin Panel (`super_admin_panel.js`)
- Guard location fetching (similar to admin dashboard)
- System settings updates
- Admin management operations

## Map Integration

The admin dashboards use **Leaflet.js** for interactive maps:
- Default center: Gwinnett County, GA (33.9519, -83.3576)
- Uses OpenStreetMap tiles
- Real-time guard location markers
- Click markers for guard details

## Professional Features

### Modern UI/UX
- Gradient backgrounds
- Smooth animations and transitions
- Modal popups with overlays
- Responsive design
- Custom scrollbars
- Shadow effects and depth

### User Experience
- Confirmation dialogs for critical actions
- Form validation
- Loading states
- Error handling
- Session persistence
- Clean navigation flow

## Browser Compatibility

Tested on:
- Chrome/Edge (Chromium)
- Firefox
- Safari

Requires modern browser with ES6+ support and localStorage.

## Security Considerations

1. **Credentials**: Change all default credentials before deployment
2. **HTTPS**: Use HTTPS in production for secure credential transmission
3. **API Keys**: Store API keys securely (not in client-side code)
4. **Session Management**: Implement server-side session validation
5. **Input Validation**: Add server-side validation for all inputs

## Future Enhancements

Recommended additions:
- Backend API for data persistence
- Real geolocation tracking for guards
- SMS/Email notifications
- Incident reporting system
- Attendance tracking
- Performance analytics
- Password reset functionality
- Two-factor authentication
- Audit logs

## Development Notes

### To modify rotation cycle:
1. Update `startDate` in rotation functions
2. Change `360` to desired number of days
3. Update in all three rotation implementations:
   - `guard_login.js`
   - `admin_login.js`
   - `super_admin_panel.js`

### To add new schools:
Update `choose-school.html` select options

### To add new guards/admins:
Add to respective credential objects and ensure rotation arrays match

## Support

For issues or questions about the system:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Ensure all files are in the correct locations
4. Check that credentials match current rotation

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Developed for**: Gwinnett County Public Schools Crossing Guard Management
