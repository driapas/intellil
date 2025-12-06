import React from 'react'

export default function AIInsights({ insights = [] }) {
    return (
        <div>
            <h2>🤖 AI Insights</h2>
            <div className="insights-panel">
                {insights.length === 0 ? (
                    <div className="insight-item">
                        <div className="insight-icon">🔮</div>
                        <div className="insight-content">
                            <h4>No Insights Available</h4>
                            <p>Generate AI plans to see intelligent recommendations</p>
                        </div>
                        <div className="insight-priority medium">Pending</div>
                    </div>
                ) : (
                    insights.map((insight, index) => (
                        <div key={index} className="insight-item">
                            <div className="insight-icon">{insight.icon}</div>
                            <div className="insight-content">
                                <h4>{insight.title}</h4>
                                <p>{insight.message}</p>
                            </div>
                            <div className={`insight-priority ${insight.priority}`}>
                                {insight.priority}
                            </div>
                        </div>
                    ))
                )}
                
                {/* AI System Status */}
                <div className="insight-item">
                    <div className="insight-icon">🧠</div>
                    <div className="insight-content">
                        <h4>Gemini AI Status</h4>
                        <p>AI engine is active and ready for intelligent loan analysis</p>
                    </div>
                    <div className="insight-priority high">Active</div>
                </div>
            </div>
        </div>
    )
}