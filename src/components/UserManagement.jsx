import { useMemo, useState } from 'react';
import { Pencil, Save, X } from 'lucide-react';

const ROLES = ['User', 'Restaurant', 'Delivery Partner', 'Admin'];
const STATUS = ['Active', 'Suspended', 'Banned'];

function ProfileEditor({ user, onSave, onCancel }) {
  const [form, setForm] = useState({ ...user });
  const save = () => {
    const name = (form.name || '').trim().slice(0, 80);
    const phone = (form.phone || '').trim().replace(/[^0-9+\- ]/g, '').slice(0, 20);
    if (!name) return;
    onSave({ ...form, name, phone });
  };
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <label className="text-xs">Name<input value={form.name} onChange={(e)=>setForm((f)=>({...f,name:e.target.value}))} className="mt-1 px-3 py-2 border rounded-md text-sm w-full"/></label>
        <label className="text-xs">Username<input value={form.username} onChange={(e)=>setForm((f)=>({...f,username:e.target.value.replace(/[^a-z0-9_]/g,'')}))} className="mt-1 px-3 py-2 border rounded-md text-sm w-full"/></label>
        <label className="text-xs">Phone<input value={form.phone} onChange={(e)=>setForm((f)=>({...f,phone:e.target.value}))} className="mt-1 px-3 py-2 border rounded-md text-sm w-full"/></label>
        <label className="text-xs">Role<select value={form.role} onChange={(e)=>setForm((f)=>({...f,role:e.target.value}))} className="mt-1 px-3 py-2 border rounded-md text-sm w-full">{ROLES.map(r=>(<option key={r} value={r}>{r}</option>))}</select></label>
        <label className="text-xs">Status<select value={form.status} onChange={(e)=>setForm((f)=>({...f,status:e.target.value}))} className="mt-1 px-3 py-2 border rounded-md text-sm w-full">{STATUS.map(s=>(<option key={s} value={s}>{s}</option>))}</select></label>
        <div className="text-xs">Wallet
          <div className="mt-1 flex items-center gap-2">
            <div className="px-3 py-2 border rounded-md text-sm">₹{(form.wallet||0).toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={save} className="px-3 py-2 rounded-md bg-green-600 text-white text-sm font-medium flex items-center gap-2"><Save size={16}/> Save</button>
        <button onClick={onCancel} className="px-3 py-2 rounded-md border text-sm flex items-center gap-2"><X size={16}/> Cancel</button>
      </div>
    </div>
  );
}

export default function UserManagement({ users, updateUser, permissions, isProfileOnly = false, setWalletBalance }) {
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [editing, setEditing] = useState(null);
  const [topup, setTopup] = useState('');

  const list = useMemo(() => {
    let arr = users;
    if (roleFilter !== 'All') arr = arr.filter((u) => u.role === roleFilter);
    if (q) arr = arr.filter((u) => (u.name + u.username).toLowerCase().includes(q.toLowerCase()));
    return arr;
  }, [users, q, roleFilter]);

  return (
    <div className="space-y-4">
      {!isProfileOnly && (
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search users" className="px-3 py-2 border rounded-md text-sm flex-1" />
          <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)} className="px-3 py-2 border rounded-md text-sm w-full md:w-56">
            <option>All</option>
            <option>User</option>
            <option>Restaurant</option>
            <option>Delivery Partner</option>
            <option>Admin</option>
          </select>
        </div>
      )}

      {editing ? (
        <ProfileEditor
          user={editing}
          onSave={(u)=>{ updateUser(u); setEditing(null); }}
          onCancel={()=>setEditing(null)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {list.map((u) => (
            <div key={u.id} className="p-3 border rounded-lg bg-white flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="font-medium text-sm">{u.name} <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full border ${u.status==='Active'?'text-green-700 border-green-200':u.status==='Suspended'?'text-orange-700 border-orange-200':'text-red-700 border-red-200'}`}>{u.status}</span></div>
                <div className="text-xs text-neutral-600">@{u.username} • {u.role}</div>
                <div className="text-xs text-neutral-700 mt-1">Wallet: ₹{(u.wallet||0).toFixed(2)} {u.role==='Delivery Partner' && (<>• Earnings: ₹{(u.earnings||0).toFixed(2)}</>)}</div>
              </div>
              <div className="flex items-center gap-2">
                {permissions.canManageUsers && (
                  <>
                    <input value={topup} onChange={(e)=>setTopup(e.target.value.replace(/[^0-9.]/g,''))} placeholder="Add ₹" className="px-2 py-1 border rounded text-xs w-24" />
                    <button
                      className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                      onClick={()=>{
                        const amt = Number(topup);
                        if (!Number.isFinite(amt) || amt<=0) return;
                        setWalletBalance(u.id, (u.wallet||0)+amt);
                        setTopup('');
                      }}
                    >Credit</button>
                  </>
                )}
                <button onClick={()=>setEditing(u)} className="px-2 py-1 rounded border text-xs flex items-center gap-1"><Pencil size={14}/> Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
