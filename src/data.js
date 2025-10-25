export const initialData = {
  currentUser: { id: 'admin1', role: 'Admin', username: 'pn_admin', name: "PN'S Admin", phone: '+91 8000000000', wallet: 0 },
  users: [
    { id: 'admin1', role: 'Admin', username: 'pn_admin', name: "PN'S Admin", phone: '+91 8000000000', wallet: 0, status: 'Active' },
    { id: 'u1', role: 'User', username: 'alice', name: 'Alice Verma', phone: '+91 9000000001', wallet: 500, status: 'Active' },
    { id: 'u2', role: 'User', username: 'rahul', name: 'Rahul Kumar', phone: '+91 9000000002', wallet: 120, status: 'Suspended' },
    { id: 'u3', role: 'Restaurant', username: 'delhi_dhaba', name: 'Delhi Dhaba Owner', phone: '+91 9000000003', wallet: 0, status: 'Active' },
    { id: 'u4', role: 'Restaurant', username: 'paneer_palace', name: 'Paneer Palace Owner', phone: '+91 9000000004', wallet: 0, status: 'Active' },
    { id: 'u5', role: 'Delivery Partner', username: 'rider_amit', name: 'Amit Singh', phone: '+91 9000000005', wallet: 0, earnings: 0, status: 'Active' },
    { id: 'u6', role: 'Delivery Partner', username: 'rider_sara', name: 'Sara Ali', phone: '+91 9000000006', wallet: 0, earnings: 0, status: 'Active' },
  ],
  restaurants: [
    {
      id: 'r1',
      name: 'Delhi Dhaba',
      cuisine: 'North Indian',
      minOrder: 200,
      rating: 4.3,
      city: 'Delhi',
      address: 'Connaught Place, New Delhi',
      coords: { lat: 28.6315, lng: 77.2167 },
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      phone: '+91 9810012345',
      active: true,
      menu: [
        { id: 'm1', name: 'Butter Chicken', price: 349 },
        { id: 'm2', name: 'Dal Makhani', price: 249 },
        { id: 'm3', name: 'Garlic Naan', price: 79 },
      ],
    },
    {
      id: 'r2',
      name: 'Paneer Palace',
      cuisine: 'Vegetarian',
      minOrder: 180,
      rating: 4.5,
      city: 'Delhi',
      address: 'Karol Bagh, New Delhi',
      coords: { lat: 28.6519, lng: 77.1907 },
      image: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQYW5lZXIlMjBUaWtrYXxlbnwwfDB8fHwxNzYxMzY5NTE5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      phone: '+91 9810012346',
      active: true,
      menu: [
        { id: 'm1', name: 'Paneer Tikka', price: 299 },
        { id: 'm2', name: 'Shahi Paneer', price: 279 },
        { id: 'm3', name: 'Jeera Rice', price: 129 },
      ],
    },
    {
      id: 'r3', name: 'Chole Bhature Hub', cuisine: 'Street Food', minOrder: 150, rating: 4.2, city: 'Delhi', address: 'Rajouri Garden, New Delhi', coords: { lat: 28.6461, lng: 77.1165 }, image: 'https://images.unsplash.com/photo-1758913340758-88d5719d37f3?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDaG9sZSUyMEJoYXR1cmV8ZW58MHwwfHx8MTc2MTM2OTEzM3ww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', phone: '+91 9810012347', active: true,
      menu: [ { id: 'm1', name: 'Chole Bhature', price: 149 }, { id: 'm2', name: 'Lassi', price: 99 } ]
    },
    {
      id: 'r4', name: 'Kathi Roll Corner', cuisine: 'Rolls', minOrder: 120, rating: 4.1, city: 'Delhi', address: 'Saket, New Delhi', coords: { lat: 28.5246, lng: 77.2066 }, image: 'https://images.unsplash.com/photo-1649348947106-a19f9003ff47?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDaGlja2VuJTIwS2F0aGklMjBSb2xsfGVufDB8MHx8fDE3NjEzNjk1MTl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', phone: '+91 9810012348', active: true,
      menu: [ { id: 'm1', name: 'Chicken Kathi Roll', price: 179 }, { id: 'm2', name: 'Paneer Roll', price: 169 } ]
    },
    {
      id: 'r5', name: 'South Spice', cuisine: 'South Indian', minOrder: 160, rating: 4.4, city: 'Delhi', address: 'Hauz Khas, New Delhi', coords: { lat: 28.5494, lng: 77.2001 }, image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=1200&auto=format&fit=crop', phone: '+91 9810012349', active: true,
      menu: [ { id: 'm1', name: 'Masala Dosa', price: 179 }, { id: 'm2', name: 'Idli Sambar', price: 129 }, { id: 'm3', name: 'Filter Coffee', price: 79 } ]
    },
    {
      id: 'r6', name: 'Biryani Blues', cuisine: 'Hyderabadi', minOrder: 220, rating: 4.3, city: 'Delhi', address: 'Dwarka, New Delhi', coords: { lat: 28.5921, lng: 77.0460 }, image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDaGlja2VuJTIwQmlyeWFuaXxlbnwwfDB8fHwxNzYxMzY5NTE4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', phone: '+91 9810012350', active: true,
      menu: [ { id: 'm1', name: 'Chicken Biryani', price: 299 }, { id: 'm2', name: 'Veg Biryani', price: 259 } ]
    },
    {
      id: 'r7', name: 'Momo Magic', cuisine: 'Tibetan', minOrder: 120, rating: 4.0, city: 'Delhi', address: 'Lajpat Nagar, New Delhi', coords: { lat: 28.5677, lng: 77.2433 }, image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1200&auto=format&fit=crop', phone: '+91 9810012351', active: true,
      menu: [ { id: 'm1', name: 'Veg Momos', price: 99 }, { id: 'm2', name: 'Chicken Momos', price: 129 } ]
    },
    {
      id: 'r8', name: 'Tandoori Nights', cuisine: 'Mughlai', minOrder: 240, rating: 4.6, city: 'Delhi', address: 'Chanakyapuri, New Delhi', coords: { lat: 28.5960, lng: 77.1890 }, image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUYW5kb29yaSUyMENoaWNrZW58ZW58MHwwfHx8MTc2MTM2OTUxOXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', phone: '+91 9810012352', active: true,
      menu: [ { id: 'm1', name: 'Tandoori Chicken', price: 329 }, { id: 'm2', name: 'Seekh Kebab', price: 299 } ]
    },
    {
      id: 'r9', name: 'Wrap & Roll', cuisine: 'Fast Food', minOrder: 140, rating: 4.0, city: 'Delhi', address: 'Janakpuri, New Delhi', coords: { lat: 28.6210, lng: 77.0870 }, image: 'https://images.unsplash.com/photo-1662318183333-971ae1658e44?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxWZWclMjBXcmFwfGVufDB8MHx8fDE3NjEzNjk1MTl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', phone: '+91 9810012353', active: true,
      menu: [ { id: 'm1', name: 'Veg Wrap', price: 129 }, { id: 'm2', name: 'Paneer Wrap', price: 149 } ]
    },
    {
      id: 'r10', name: 'Cafe Chai', cuisine: 'Cafe', minOrder: 100, rating: 4.1, city: 'Delhi', address: 'SDA Market, New Delhi', coords: { lat: 28.5465, lng: 77.2070 }, image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop', phone: '+91 9810012354', active: true,
      menu: [ { id: 'm1', name: 'Masala Chai', price: 59 }, { id: 'm2', name: 'Veg Sandwich', price: 119 } ]
    },
  ],
  orders: [
    { id: 'o1', code: '1001', restaurantId: 'r1', dropAddress: 'IIT Delhi Main Gate', dropCoords: { lat: 28.5450, lng: 77.1926 }, status: 'Pending', otp: '654321' },
    { id: 'o2', code: '1002', restaurantId: 'r5', dropAddress: 'AIIMS Metro Station Exit 2', dropCoords: { lat: 28.5670, lng: 77.2100 }, status: 'Pending', otp: '123456' },
    { id: 'o3', code: '1003', restaurantId: 'r2', dropAddress: 'India Gate Parking', dropCoords: { lat: 28.6129, lng: 77.2295 }, status: 'Pending', otp: '987654' },
  ],
};
