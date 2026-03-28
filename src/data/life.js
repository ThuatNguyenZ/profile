export const lifeInterests = {
  music: {
    title: 'Music',
    description: 'Passionate about music - always have melodies playing while coding.',
    icon: 'Music',
    color: '#8B5CF6',
    visualization: {
      type: 'waveform',
      data: [40, 65, 45, 80, 55, 90, 70, 85, 60, 75],
    },
  },
  sports: {
    title: 'Sports',
    description: 'Active lifestyle keeps mind and body sharp.',
    icon: 'Trophy',
    color: '#F97316',
    activities: [
      { name: 'Football', icon: 'football', level: 'Regular' },
      { name: 'Billiards', icon: 'target', level: 'Enthusiast' },
      { name: 'Badminton', icon: 'wind', level: 'Casual' },
    ],
    visualization: {
      type: 'activity',
      weeklyHours: [2, 3, 1, 4, 2, 3, 2],
    },
  },
  travel: {
    title: 'Travel & Exploration',
    description: 'Love discovering new places, cultures, and perspectives.',
    icon: 'Map',
    color: '#10B981',
    places: ['Vũng Tàu', 'Nha Trang', 'Hà Nội', 'Phan Thiết'],
    visualization: {
      type: 'map',
      markers: 4,
    },
  },
  social: {
    title: 'Networking & Connection',
    description: 'Enjoy building meaningful connections with diverse people.',
    icon: 'Users',
    color: '#3B82F6',
    links: {
      facebook: 'https://www.facebook.com/ThuatNguyen992',
    },
    visualization: {
      type: 'network',
      connections: 500,
    },
  },
}
