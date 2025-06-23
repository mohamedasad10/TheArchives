import React, { useState, useMemo } from 'react';

function AnalyticsDashboard({ items = [] }) {
  const [queryTag, setQueryTag] = useState('');
  const [queryYear, setQueryYear] = useState('');
  const [activeView, setActiveView] = useState('overview');

  // Filter items that have valid prices
  const validItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return items.filter(item => 
      item.price !== "" && 
      item.price !== null && 
      !isNaN(item.price) && 
      Number(item.price) > 0
    );
  }, [items]);

  // Calculate spending data
  const spendingData = useMemo(() => {
    const totalSpent = validItems.reduce((sum, item) => sum + Number(item.price), 0);
    
    const spentPerTag = {};
    const spentPerYear = {};
    
    validItems.forEach(item => {
      const tag = item.tag || 'Uncategorized';
      const year = item.year || 'Unknown';
      
      spentPerTag[tag] = (spentPerTag[tag] || 0) + Number(item.price);
      spentPerYear[year] = (spentPerYear[year] || 0) + Number(item.price);
    });

    return { totalSpent, spentPerTag, spentPerYear };
  }, [validItems]);

  // Get unique tags and years for dropdowns
  const uniqueTags = [...new Set((items || []).map(item => item.tag).filter(Boolean))];
  const uniqueYears = [...new Set((items || []).map(item => item.year).filter(Boolean))];

  // Query functions
  const getSpendingByTag = (tag) => {
    if (!tag) return 0;
    return spendingData.spentPerTag[tag] || 0;
  };

  const getSpendingByYear = (year) => {
    if (!year) return 0;
    return spendingData.spentPerYear[year] || 0;
  };

  // Prepare chart data
  const pieChartData = Object.entries(spendingData.spentPerTag).map(([tag, amount]) => ({
    name: tag,
    value: amount,
    percentage: ((amount / spendingData.totalSpent) * 100).toFixed(1)
  }));

  const barChartData = Object.entries(spendingData.spentPerYear)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, amount]) => ({
      year,
      amount: amount,
      formattedAmount: `R${amount.toFixed(2)}`
    }));

  // Colors for charts
  const COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', 
    '#ff00ff', '#00ffff', '#ff0000', '#0000ff', '#ffff00'
  ];

  const containerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    borderRadius: '16px',
    marginBottom: '2rem',
    color: 'white'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#fff',
    color: '#667eea'
  };

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white'
  };

  // Simple CSS-based charts
  const SimplePieChart = ({ data }) => {
    if (data.length === 0) return null;
    
    let cumulativePercentage = 0;
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%',
          background: `conic-gradient(${data.map(item => {
            const startPercentage = cumulativePercentage;
            cumulativePercentage += parseFloat(item.percentage);
            return `${COLORS[data.indexOf(item) % COLORS.length]} ${startPercentage}% ${cumulativePercentage}%`;
          }).join(', ')})`,
          margin: '0 auto'
        }} />
        <div style={{ flex: 1 }}>
          {data.map((item, index) => (
            <div key={item.name} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: '0.5rem',
                borderRadius: '2px'
              }} />
              <span style={{ color: '#333' }}>
                {item.name}: R{item.value.toFixed(2)} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimpleBarChart = ({ data }) => {
    if (data.length === 0) return null;
    
    const maxAmount = Math.max(...data.map(d => d.amount));
    
    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', height: '300px' }}>
          {data.map((item, index) => (
            <div key={item.year} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              flex: 1
            }}>
              <div style={{ 
                height: `${(item.amount / maxAmount) * 250}px`,
                backgroundColor: '#4ade80',
                borderRadius: '4px 4px 0 0',
                width: '100%',
                minWidth: '30px',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.8rem',
                  color: '#333',
                  fontWeight: 'bold'
                }}>
                  R{item.amount.toFixed(0)}
                </div>
              </div>
              <div style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.9rem', 
                color: '#333',
                textAlign: 'center'
              }}>
                {item.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>
        📊 Analytics & Insights
      </h2>

      {/* Navigation */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {['overview', 'query', 'charts'].map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            style={activeView === view ? activeButtonStyle : inactiveButtonStyle}
          >
            {view === 'overview' && '📈 Overview'}
            {view === 'query' && '🔍 Query'}
            {view === 'charts' && '📊 Charts'}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeView === 'overview' && (
        <div style={cardStyle}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>💰 Spending Overview</h3>
          <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            <strong>Total Spent: </strong>
            <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.5rem' }}>
              R{spendingData.totalSpent.toFixed(2)}
            </span>
          </div>
          <div style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            <strong>Items with prices: {validItems.length}</strong> | 
            <strong> Items without prices: {(items?.length || 0) - validItems.length}</strong>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#fbbf24' }}>📁 Top Categories</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(spendingData.spentPerTag)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([tag, amount]) => (
                    <li key={tag} style={{ marginBottom: '0.25rem' }}>
                      <strong>{tag}:</strong> R{amount.toFixed(2)}
                    </li>
                  ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#60a5fa' }}>📅 Spending by Year</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {Object.entries(spendingData.spentPerYear)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([year, amount]) => (
                    <li key={year} style={{ marginBottom: '0.25rem' }}>
                      <strong>{year}:</strong> R{amount.toFixed(2)}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Query Section */}
      {activeView === 'query' && (
        <div style={cardStyle}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>🔍 Smart Queries</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#fbbf24' }}>💊 Spending by Tag</h4>
              <div style={{ marginBottom: '1rem' }}>
                <select 
                  value={queryTag} 
                  onChange={(e) => setQueryTag(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a tag...</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              {queryTag && (
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    <strong>Total spent on {queryTag}:</strong>
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80' }}>
                    R{getSpendingByTag(queryTag).toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: '1rem', color: '#60a5fa' }}>📅 Spending by Year</h4>
              <div style={{ marginBottom: '1rem' }}>
                <select 
                  value={queryYear} 
                  onChange={(e) => setQueryYear(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select a year...</option>
                  {uniqueYears.sort().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {queryYear && (
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    <strong>Total spent in {queryYear}:</strong>
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80' }}>
                    R{getSpendingByYear(queryYear).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {activeView === 'charts' && (
        <div>
          <div style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>🥧 Spending by Category</h3>
            {pieChartData.length > 0 ? (
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', padding: '2rem' }}>
                <SimplePieChart data={pieChartData} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                <p style={{ color: 'white', fontSize: '1.1rem' }}>No spending data available for pie chart</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Add some items with prices to see the breakdown!
                </p>
              </div>
            )}
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', textAlign: 'center' }}>📊 Spending by Year</h3>
            {barChartData.length > 0 ? (
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', padding: '1rem' }}>
                <SimpleBarChart data={barChartData} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                <p style={{ color: 'white', fontSize: '1.1rem' }}>No yearly spending data available for bar chart</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Add some items with years and prices to see the trends!
                </p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;