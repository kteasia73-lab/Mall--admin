import React, {useState, useEffect} from 'react'
import { api } from '../api'

export default function Announcements(){
  const [list, setList] = useState([])
  const [text, setText] = useState('')

  useEffect(()=>{ api.get('/announcements').then(r=>setList(r.data)).catch(()=>{}) },[])

  async function add(){
    if(!text) return
    const res = await api.post('/announcements', { msg: text })
    setList(prev => [res.data, ...prev])
    setText('')
  }

  return (
    <div className="small-card">
      <h4>Announcements</h4>
      <div style={{display:'flex',gap:8}}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Announcement message" />
        <button onClick={add}>Post</button>
      </div>
      <ul>
        {list.map(a => <li key={a._id || a.id}>{a.msg}</li>)}
      </ul>
    </div>
  )
}
