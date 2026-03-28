// --- 1. MOCK DATA ---
const customers = [
  {
    id: 1,
    name: "Sarah Smith",
    orders: 15,
    lastPurchase: "10 days ago",
    score: 96,
    segment: "High Value",
    churnRisk: "Low",
    frequency: "Highly Active",
    engagement: "Exceptional",
    retention: "Very Low",
    summary: "Sarah is a high-value repeat customer with 15 lifetime orders and a last purchase just 10 days ago. She demonstrates exceptional brand loyalty with very low churn risk.",
    recommendation: "Activate VIP loyalty program — offer exclusive early access, bonus reward points, and a complimentary premium membership upgrade to maximize lifetime value.",
    message: '"Hi Sarah, our AI has identified you as one of our top-tier customers based on your exceptional purchase history. You\'ve been automatically upgraded to VIP status!"'
  },
  {
    id: 2,
    name: "John Doe",
    orders: 5,
    lastPurchase: "45 days ago",
    score: 55,
    segment: "Regular",
    churnRisk: "Medium",
    frequency: "Occasional",
    engagement: "Moderate",
    retention: "Stable",
    summary: "John is a regular customer who purchases occasionally. His engagement has slowed down recently, indicating a medium churn risk if not re-engaged soon.",
    recommendation: "Send a targeted engagement offer — provide a 10% discount on his next purchase to encourage a faster return.",
    message: '"Hi John, we noticed it\'s been a while since your last visit! We miss you. Here is a special 10% off coupon for your next order to welcome you back."'
  },
  {
    id: 3,
    name: "Mike Johnson",
    orders: 2,
    lastPurchase: "120 days ago",
    score: 25,
    segment: "At Risk",
    churnRisk: "High",
    frequency: "Inactive",
    engagement: "Low",
    retention: "Critical",
    summary: "Mike is at high risk of churning. With only 2 lifetime orders and no activity in 4 months, immediate action is required to save this customer.",
    recommendation: "Launch a heavy win-back campaign — offer a massive 30% discount or a free gift with his next purchase.",
    message: '"Hi Mike, we haven\'t seen you in a while! We\'re giving our favorite customers a free gift with their next purchase. Come back and claim yours today!"'
  }
];

// Wait for the HTML to fully load before running ANY JavaScript
document.addEventListener('DOMContentLoaded', () => {
  
  // Track the currently viewed customer
  let selectedCustomer = customers[0];

  // --- 2. UPDATE HERO STATS ---
  function updateHeroStats() {
    const highValueCount = customers.filter(c => c.segment === "High Value").length;
    const atRiskCount = customers.filter(c => c.segment === "At Risk").length;
    
    document.getElementById('stat-total').innerText = `👥 Customers Tracked: ${customers.length}`;
    document.getElementById('stat-high').innerText = `⭐ High-Value: ${highValueCount}`;
    document.getElementById('stat-risk').innerText = `⚠️ Churn Alerts: ${atRiskCount}`;
  }

  // --- 3. RENDER CUSTOMER SELECTION GRID ---
  function renderCustomerCards() {
    const container = document.getElementById('customer-grid');
    if (!container) return; 
    
    container.innerHTML = '';

    customers.forEach(customer => {
      const isActive = selectedCustomer.id === customer.id;
      const segmentClass = customer.segment.replace(' ', '-').toLowerCase();

      const card = document.createElement('div');
      card.className = `customer-card ${isActive ? 'active' : ''}`;
      
      card.onclick = () => {
        selectedCustomer = customer;
        renderCustomerCards(); 
        updateDashboardData();
      };

      card.innerHTML = `
        <div class="avatar">${customer.name.charAt(0)}</div>
        <h3>${customer.name}</h3>
        <p>${customer.orders} orders</p>
        <span class="segment-badge ${segmentClass}">${customer.segment}</span>
      `;
      
      container.appendChild(card);
    });
  }

  // --- 4. UPDATE DASHBOARD PANELS ---
  function updateDashboardData() {
    // Summary & Profile
    if(document.getElementById('summary-text')) document.getElementById('summary-text').innerText = selectedCustomer.summary;
    if(document.getElementById('profile-name')) document.getElementById('profile-name').innerText = selectedCustomer.name;
    if(document.getElementById('profile-orders')) document.getElementById('profile-orders').innerText = selectedCustomer.orders;
    if(document.getElementById('profile-last-purchase')) document.getElementById('profile-last-purchase').innerText = selectedCustomer.lastPurchase;
    if(document.getElementById('profile-segment')) document.getElementById('profile-segment').innerText = selectedCustomer.segment;
    if(document.getElementById('profile-churn')) document.getElementById('profile-churn').innerText = selectedCustomer.churnRisk;

    // Score Progress Bar
    const scoreFill = document.getElementById('score-fill');
    if(scoreFill) {
        const segmentClass = selectedCustomer.segment.replace(' ', '-').toLowerCase();
        scoreFill.style.width = `${selectedCustomer.score}%`;
        scoreFill.className = `progress-bar-fill ${segmentClass}`;
    }
    if(document.getElementById('score-text')) document.getElementById('score-text').innerText = selectedCustomer.score;

    // AI Output
    if(document.getElementById('recommendation-text')) document.getElementById('recommendation-text').innerText = `⚡ ${selectedCustomer.recommendation}`;
    if(document.getElementById('signal-frequency')) document.getElementById('signal-frequency').innerText = selectedCustomer.frequency;
    if(document.getElementById('signal-engagement')) document.getElementById('signal-engagement').innerText = selectedCustomer.engagement;
    if(document.getElementById('signal-retention')) document.getElementById('signal-retention').innerText = selectedCustomer.retention;
    if(document.getElementById('generated-message')) document.getElementById('generated-message').innerText = selectedCustomer.message;
  }

  // --- 5. ANALYSE BUTTON LOGIC ---
  const analyseBtn = document.getElementById('analyse-btn');
  const insightsContent = document.getElementById('insights-content');

  if (analyseBtn && insightsContent) {
    analyseBtn.addEventListener('click', () => {
      // 1. Set the button to loading state
      analyseBtn.disabled = true;
      analyseBtn.innerText = "⏳ Analyzing Customer Data...";
      
      // 2. Fade out the dashboard
      insightsContent.classList.add('faded-content');

      // 3. Wait for 1 second, then snap the new data back in
      setTimeout(() => {
        analyseBtn.disabled = false;
        analyseBtn.innerText = "✨ Run AI Analysis";
        insightsContent.classList.remove('faded-content');
      }, 1000); 
    });
  }

  // --- 6. INITIALIZE ---
  updateHeroStats();
  renderCustomerCards();
  updateDashboardData();
});
