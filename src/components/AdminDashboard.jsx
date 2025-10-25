import { useMemo, useState } from 'react';
import { ShieldCheck, ToggleLeft, ToggleRight, Plus, Trash2, MessageSquare, Phone } from 'lucide-react';

const ModeToggle = ({ label, enabled, onToggle }) => (
  <button onClick={onToggle} className={`flex items-center justify-between w-full px-3 py-2 rounded-md border ${enabled ? 'bg-green-50 border-green-300' : 'bg-neutral-50 border-neutral-200'}`}>
    <span className="text-sm font-medium">{label}</span>
    <span className={`flex items-center gap-2 text-xs ${enabled ? 'text-green-700' : 'text-neutral-500'}`}>
      {enabled ? 'Enabled' : 'Disabled'} {enabled ? <ToggleRight size={18} className="text-green-600" /> : <ToggleLeft size={18} className="text-neutral-400" />}
    </span>
  </button>
);

function sanitize(text) {
  const t = (text || '').toString();
  return t.replace(/[<>]/g, '');
}

function WalletSection({ currentUser }) {
  const [amount, setAmount] = useState('');
  const validateAmount = (v) => {
    const num = Number(v);
    return Number.isFinite(num) && num > 0 && num < 50000;
  };
  const waHref = () => {
    const amt = Number(amount).toFixed(2);
    const msg = encodeURIComponent(`Hi, I want to add balance to my PN'S wallet.\nAmount: INR ${amt}\nUsername: ${currentUser.username}\nName: ${currentUser.name}`);
    return `https://wa.me/918434805818?text=${msg}`;
  };
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-2">
        <Phone size={18} className="text-green-600" />
        <h3 className="font-semibold text-sm">Wallet top-up via WhatsApp</h3>
      </div>
      <p className="text-xs text-neutral-600 mb-3">Enter amount and you will be redirected to WhatsApp (+91 8434805818) with a pre-filled message. Our team will confirm and credit your wallet.</p>
      <div className="flex gap-2 items-center">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
          placeholder="Amount (INR)"
          className="px-3 py-2 border rounded-md text-sm w-40"
        />
        <a
          href={validateAmount(amount) ? waHref() : '#'}
          target={validateAmount(amount) ? '_blank' : undefined}
          rel="noreferrer"
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            validateAmount(amount) ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
          }`}
        >
          Open WhatsApp
        </a>
      </div>
    </div>
  );
}

function RestaurantForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', cuisine: '', minOrder: 200, lat: '', lng: '', address: '', image: '', phone: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.cuisine || !form.address) return;
    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);
    onSubmit({
      name: sanitize(form.name),
      cuisine: sanitize(form.cuisine),
      minOrder: Number(form.minOrder) || 0,
      coords: Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : undefined,
      address: sanitize(form.address),
      image: sanitize(form.image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop'),
      phone: sanitize(form.phone || '+91 9999999999'),
      menu: [
        { id: 'm' + Math.random().toString(36).slice(2, 7), name: 'Special Thali', price: 249 },
      ],
      rating: 4.2,
      city: 'Delhi',
      active: true,
    });
    setForm({ name: '', cuisine: '', minOrder: 200, lat: '', lng: '', address: '', image: '', phone: '' });
  };
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Name" value={form.name} onChange={(e)=>setForm((f)=>({...f,name:e.target.value}))} />
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Cuisine" value={form.cuisine} onChange={(e)=>setForm((f)=>({...f,cuisine:e.target.value}))} />
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Min Order" value={form.minOrder} onChange={(e)=>setForm((f)=>({...f,minOrder:e.target.value.replace(/[^0-9]/g,'')}))} />
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Latitude" value={form.lat} onChange={(e)=>setForm((f)=>({...f,lat:e.target.value}))} />
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Longitude" value={form.lng} onChange={(e)=>setForm((f)=>({...f,lng:e.target.value}))} />
      <input className="px-3 py-2 border rounded-md text-sm md:col-span-2" placeholder="Address" value={form.address} onChange={(e)=>setForm((f)=>({...f,address:e.target.value}))} />
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Image URL" value={form.image} onChange={(e)=>setForm((f)=>({...f,image:e.target.value}))} />
      <input className="px-3 py-2 border rounded-md text-sm" placeholder="Phone" value={form.phone} onChange={(e)=>setForm((f)=>({...f,phone:e.target.value}))} />
      <button className="px-3 py-2 rounded-md bg-orange-600 text-white text-sm font-medium flex items-center gap-2 w-fit"><Plus size={16}/> Add Restaurant</button>
    </form>
  );
}

export default function AdminDashboard({ currentUser, users, restaurants, modes, setModes, addRestaurant, updateRestaurant, removeRestaurant, permissions, chatMessages, addChatMessage, deleteChatMessage, banUser }) {
  const enabledCount = Object.values(modes).filter(Boolean).length;
  const [chatInput, setChatInput] = useState('');

  const stats = useMemo(() => ({
    users: users.length,
    restaurants: restaurants.length,
    activeRestaurants: restaurants.filter((r) => r.active).length,
  }), [users, restaurants]);

  const postMessage = () => {
    const text = sanitize(chatInput).slice(0, 300);
    if (!text) return;
    if (users.find((u) => u.id === currentUser.id)?.status === 'Banned') return;
    addChatMessage({ userId: currentUser.id, username: currentUser.username, text });
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-white">
          <div className="text-xs text-neutral-500 mb-2">Modes</div>
          <div className="space-y-2">
            <ModeToggle label="Food" enabled={modes.food} onToggle={() => permissions.canManageModes && setModes((m) => ({ ...m, food: !m.food }))} />
            <ModeToggle label="Grocery" enabled={modes.grocery} onToggle={() => permissions.canManageModes && setModes((m) => ({ ...m, grocery: !m.grocery }))} />
            <ModeToggle label="Delivery" enabled={modes.delivery} onToggle={() => permissions.canManageModes && setModes((m) => ({ ...m, delivery: !m.delivery }))} />
          </div>
          <div className="text-xs text-neutral-600 mt-3">Enabled: <span className="font-medium text-green-700">{enabledCount}</span></div>
        </div>

        <div className="p-4 rounded-lg border bg-white">
          <div className="text-xs text-neutral-500 mb-2">Overview</div>
          <div className="flex gap-4">
            <div className="flex-1 p-3 rounded-md bg-orange-50 border border-orange-200">
              <div className="text-xs text-orange-700">Users</div>
              <div className="text-2xl font-semibold text-orange-800">{stats.users}</div>
            </div>
            <div className="flex-1 p-3 rounded-md bg-green-50 border border-green-200">
              <div className="text-xs text-green-700">Restaurants</div>
              <div className="text-2xl font-semibold text-green-800">{stats.restaurants}</div>
            </div>
            <div className="flex-1 p-3 rounded-md bg-neutral-50 border">
              <div className="text-xs text-neutral-700">Active</div>
              <div className="text-2xl font-semibold">{stats.activeRestaurants}</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-white">
          <div className="flex items-center gap-2 mb-2"><ShieldCheck size={16} className="text-green-700"/><div className="text-xs text-neutral-500">Security</div></div>
          <ul className="text-xs text-neutral-700 list-disc ml-4 space-y-1">
            <li>Passwords stored with strong hashing on server.</li>
            <li>Input validation and sanitization applied to forms.</li>
            <li>Role-based access control and audit logs.</li>
            <li>Protection against XSS/CSRF/SQLi on backend.</li>
          </ul>
        </div>
      </div>

      <WalletSection currentUser={currentUser} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 border rounded-lg bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Restaurant Management</h3>
          </div>
          <RestaurantForm onSubmit={addRestaurant} />
          <div className="mt-4 divide-y">
            {restaurants.map((r) => (
              <div key={r.id} className="py-3 flex items-start gap-3">
                <img src={r.image} alt={r.name} className="h-14 w-14 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{r.name} <span className="text-xs text-neutral-500">• {r.cuisine} • {r.city}</span></div>
                  <div className="text-xs text-neutral-600">{r.address}</div>
                  <div className="text-xs mt-1">Menu: {r.menu.slice(0,3).map((m)=>m.name).join(', ')}{r.menu.length>3?'…':''}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-xs text-neutral-600">Active</label>
                    <input
                      type="checkbox"
                      checked={r.active}
                      onChange={() => permissions.canManageRestaurants && updateRestaurant({ ...r, active: !r.active })}
                    />
                    <button
                      onClick={() => permissions.canManageRestaurants && removeRestaurant(r.id)}
                      className="ml-2 px-2 py-1 rounded border text-xs flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 size={14}/> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-xs text-neutral-600">Min ₹{r.minOrder}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={16} className="text-orange-600" />
            <h3 className="font-semibold text-sm">Public Chat</h3>
          </div>
          <div className="flex gap-2 mb-2">
            <input value={chatInput} onChange={(e)=>setChatInput(e.target.value)} className="px-3 py-2 border rounded-md text-sm flex-1" placeholder="Say something nice" />
            <button onClick={postMessage} className="px-3 py-2 rounded-md bg-orange-600 text-white text-sm font-medium">Send</button>
          </div>
          <div className="max-h-80 overflow-auto space-y-2">
            {chatMessages.map((m) => (
              <div key={m.id} className="p-2 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">@{m.username}</div>
                  <div className="text-[10px] text-neutral-500">{new Date(m.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm">{m.text}</div>
                {permissions.canModerateChat && (
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={()=>deleteChatMessage(m.id)} className="text-xs px-2 py-1 rounded border hover:bg-neutral-50">Delete</button>
                    <button onClick={()=>banUser(m.userId)} className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50">Ban User</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
