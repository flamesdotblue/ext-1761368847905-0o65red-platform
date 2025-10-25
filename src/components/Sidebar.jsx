import { Home, Users, Truck, User } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors ${
      active ? 'bg-orange-100 text-orange-700' : 'hover:bg-neutral-100'
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default function Sidebar({ active, setActive, currentUser }) {
  return (
    <aside className="hidden md:block w-64 border-r bg-white h-screen sticky top-0 p-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded bg-gradient-to-tr from-orange-500 to-green-500" />
        <div>
          <div className="text-sm font-semibold">PN'S Admin</div>
          <div className="text-xs text-neutral-500">{currentUser.role}</div>
        </div>
      </div>
      <div className="space-y-2">
        <NavItem icon={Home} label="Dashboard" active={active === 'dashboard'} onClick={() => setActive('dashboard')} />
        <NavItem icon={Users} label="Users" active={active === 'users'} onClick={() => setActive('users')} />
        <NavItem icon={Truck} label="Delivery" active={active === 'delivery'} onClick={() => setActive('delivery')} />
        <NavItem icon={User} label="Profile" active={active === 'profile'} onClick={() => setActive('profile')} />
      </div>
      <div className="mt-8 text-xs text-neutral-500">
        Secure by default: input validation, hashed passwords, role-based access.
      </div>
    </aside>
  );
}
