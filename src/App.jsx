import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import DeliveryDashboard from './components/DeliveryDashboard';
import { initialData } from './data';

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [data, setData] = useState(initialData);
  const [modes, setModes] = useState({ food: true, grocery: false, delivery: true });
  const [chatMessages, setChatMessages] = useState([
    { id: 'm1', userId: 'u1', username: 'alice', text: 'Welcome to PN\'S public chat!', createdAt: Date.now() - 1000 * 60 * 60 },
  ]);

  const currentUser = data.currentUser;

  const permissions = useMemo(() => {
    const role = currentUser.role;
    return {
      canManageModes: role === 'Admin',
      canManageRestaurants: role === 'Admin' || role === 'Restaurant',
      canManageUsers: role === 'Admin',
      canDeliver: role === 'Delivery Partner',
      canViewDelivery: role === 'Admin' || role === 'Delivery Partner',
      canModerateChat: role === 'Admin',
      canUseWallet: role !== 'Delivery Partner' || true,
    };
  }, [currentUser.role]);

  const updateUser = (updated) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)),
      currentUser: prev.currentUser.id === updated.id ? { ...prev.currentUser, ...updated } : prev.currentUser,
    }));
  };

  const updateRestaurant = (updated) => {
    setData((prev) => ({
      ...prev,
      restaurants: prev.restaurants.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    }));
  };

  const addRestaurant = (restaurant) => {
    setData((prev) => ({ ...prev, restaurants: [{ ...restaurant, id: crypto.randomUUID() }, ...prev.restaurants] }));
  };

  const removeRestaurant = (id) => {
    setData((prev) => ({ ...prev, restaurants: prev.restaurants.filter((r) => r.id !== id) }));
  };

  const assignOrderToSelf = (orderId) => {
    if (!permissions.canDeliver) return;
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, assignedTo: currentUser.id, status: 'Assigned' } : o)),
    }));
  };

  const markDelivered = (orderId) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, status: 'Delivered', deliveredAt: Date.now() } : o)),
      users: prev.users.map((u) =>
        u.id === currentUser.id ? { ...u, earnings: (u.earnings || 0) + (prev.orders.find((x) => x.id === orderId)?.payout || 0) } : u
      ),
    }));
  };

  const updateOrderPayout = (orderId, payout) => {
    setData((prev) => ({ ...prev, orders: prev.orders.map((o) => (o.id === orderId ? { ...o, payout } : o)) }));
  };

  const addChatMessage = (msg) => {
    setChatMessages((prev) => [{ ...msg, id: crypto.randomUUID(), createdAt: Date.now() }, ...prev]);
  };

  const deleteChatMessage = (id) => {
    setChatMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const banUser = (userId) => {
    setData((prev) => ({ ...prev, users: prev.users.map((u) => (u.id === userId ? { ...u, status: 'Banned' } : u)) }));
  };

  const setWalletBalance = (userId, balance) => {
    setData((prev) => ({ ...prev, users: prev.users.map((u) => (u.id === userId ? { ...u, wallet: balance } : u)) }));
  };

  const content = {
    dashboard: (
      <AdminDashboard
        currentUser={currentUser}
        users={data.users}
        restaurants={data.restaurants}
        modes={modes}
        setModes={setModes}
        addRestaurant={addRestaurant}
        updateRestaurant={updateRestaurant}
        removeRestaurant={removeRestaurant}
        permissions={permissions}
        chatMessages={chatMessages}
        addChatMessage={addChatMessage}
        deleteChatMessage={deleteChatMessage}
        banUser={banUser}
      />
    ),
    users: (
      <UserManagement
        users={data.users}
        updateUser={updateUser}
        permissions={permissions}
        setWalletBalance={setWalletBalance}
      />
    ),
    delivery: (
      <DeliveryDashboard
        currentUser={currentUser}
        orders={data.orders}
        restaurants={data.restaurants}
        permissions={permissions}
        assignOrderToSelf={assignOrderToSelf}
        markDelivered={markDelivered}
        updateOrderPayout={updateOrderPayout}
      />
    ),
    profile: (
      <UserManagement
        users={[currentUser]}
        updateUser={updateUser}
        permissions={{ ...permissions, canManageUsers: true }}
        isProfileOnly
        setWalletBalance={setWalletBalance}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="flex">
        <Sidebar active={active} setActive={setActive} currentUser={currentUser} />
        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          {content[active]}
        </main>
      </div>
      <footer className="text-xs text-neutral-500 text-center py-4">PN'S Admin Panel MVP • Built with React + Tailwind • Orange/Green palette • 8px grid</footer>
    </div>
  );
}
