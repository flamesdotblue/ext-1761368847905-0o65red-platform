import { useMemo, useState } from 'react';
import { Bike, CheckCircle2, MapPin } from 'lucide-react';

function haversineKm(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function payoutFor(distanceKm) {
  const base = 25;
  const perKm = 7;
  return Math.round((base + distanceKm * perKm) * 100) / 100;
}

export default function DeliveryDashboard({ currentUser, orders, restaurants, permissions, assignOrderToSelf, markDelivered, updateOrderPayout }) {
  const [otpInput, setOtpInput] = useState({});

  const withCalc = useMemo(() => {
    return orders.map((o) => {
      const r = restaurants.find((x) => x.id === o.restaurantId);
      const pickup = r?.coords;
      const drop = o.dropCoords;
      const distanceKm = pickup && drop ? haversineKm(pickup, drop) : 0;
      const payout = payoutFor(distanceKm);
      return { ...o, restaurant: r, distanceKm, payout };
    });
  }, [orders, restaurants]);

  const visibleOrders = withCalc.filter((o) => (permissions.canDeliver ? o.status !== 'Delivered' : true));

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-white flex items-center justify-between">
        <div className="flex items-center gap-2"> <Bike size={18} className="text-orange-600"/> <div className="font-semibold text-sm">Delivery Dashboard</div> </div>
        <div className="text-xs text-neutral-600">OTP verification required at delivery</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {visibleOrders.map((o) => (
          <div key={o.id} className="p-3 border rounded-lg bg-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium text-sm">Order #{o.code} • {o.status}</div>
                <div className="text-xs text-neutral-600">Restaurant: {o.restaurant?.name || 'N/A'}</div>
                <div className="text-xs text-neutral-600">Pickup: {o.restaurant?.address}</div>
                <div className="text-xs text-neutral-600 flex items-center gap-1"><MapPin size={14}/> Drop: {o.dropAddress || `${o.dropCoords?.lat?.toFixed(4)}, ${o.dropCoords?.lng?.toFixed(4)}`}</div>
              </div>
              <div className="text-right text-xs">
                <div>Distance: <span className="font-medium">{o.distanceKm.toFixed(2)} km</span></div>
                <div>Payout: <span className="font-medium">₹{o.payout.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {o.assignedTo ? (
                <div className="text-xs">Assigned to <span className="font-medium">{o.assignedTo === currentUser.id ? 'you' : o.assignedTo}</span></div>
              ) : (
                <button
                  disabled={!permissions.canDeliver}
                  onClick={() => assignOrderToSelf(o.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${permissions.canDeliver ? 'bg-orange-600 text-white' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'}`}
                >
                  Accept Order
                </button>
              )}
            </div>
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md text-xs">
              <div className="font-medium mb-1">Earnings breakdown</div>
              <div>Base: ₹25</div>
              <div>Distance ({o.distanceKm.toFixed(2)} km) x ₹7/km = ₹{(o.distanceKm * 7).toFixed(2)}</div>
              <div className="font-semibold">Total: ₹{o.payout.toFixed(2)}</div>
            </div>
            {o.assignedTo === currentUser.id && o.status !== 'Delivered' && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  value={otpInput[o.id] || ''}
                  onChange={(e)=>setOtpInput((p)=>({...p,[o.id]: e.target.value.replace(/[^0-9]/g,'').slice(0,6)}))}
                  placeholder="Enter 6-digit OTP"
                  className="px-3 py-2 border rounded-md text-sm w-40"
                />
                <button
                  onClick={()=>{
                    if ((otpInput[o.id]||'') === o.otp) {
                      updateOrderPayout(o.id, o.payout);
                      markDelivered(o.id);
                      setOtpInput((p)=>({...p,[o.id]: ''}));
                    }
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${ (otpInput[o.id]||'').length===6 ? 'bg-green-600 text-white' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'}`}
                >
                  <CheckCircle2 size={16}/> Verify & Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
