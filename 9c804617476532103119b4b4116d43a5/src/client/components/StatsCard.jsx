import React from 'react'
import './StatsCard.css'

export default function StatsCard({ title, value, icon, color = 'purple' }) {
    return (
        <div className={`card stats-card ${color}`}>
            <div className="icon">{icon}</div>
            <div className="value">{value}</div>
            <div className="title">{title}</div>
        </div>
    )
}