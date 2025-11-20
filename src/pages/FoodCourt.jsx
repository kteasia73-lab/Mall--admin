import React, {useEffect, useState} from 'react'
import { api } from '../api'

export default function FoodCourt(){
  const [shops, setShops] = useState([])

  useEffect(()=>{ api.get('/foodcourt/shops').then(r=>setShops(r.data)).catch(()=>{}) },[])

  async function setStatus(id, status){
    await api.post('/foodcourt/status', { id, status }).catch(()=>{})
    setShops(prev => prev.map(s=> s.id === id ? {...s, status} : s))
  }

  async function simulateOrder(id){
    const order = await api.post('/foodcourt/order', { stallId: id }).then(r=>r.data).catch(()=>null)
    if(order) alert('Order placed: ' + order.orderId + ' ETA: ' + order.eta)
  }

  return (
    <div className="small-card" style={{marginTop:12}}>
      <h4>Food Court Manager</h4>
      {shops.map(s => (
        <div key={s.id} className="list-item" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <b>{s.name}</b><div style={{fontSize:12,color:'#666'}}>{s.status}</div>
          </div>
          <div style={{display:'flex',gap:6}}>
            <button onClick={()=>simulateOrder(s.id)}>Sim Order</button>
            <button onClick={()=>setStatus(s.id,'Normal')}>Normal</button>
            <button onClick={()=>setStatus(s.id,'Quiet')}>Quiet</button>
            <button onClick={()=>setStatus(s.id,'Busy')}>Busy</button>
          </div>
        </div>
      ))}
    </div>
  )
}
