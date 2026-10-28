import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import "./admin.css";
import {
  demoBookings,
  demoCelebrities,
  getProfession,
  getProfessionStartingRate,
  readStoredList,
  STORAGE_KEYS,
} from "./adminData.js";

const navigation = [
  { id: "Overview", icon: "grid" },
  { id: "Bookings", icon: "calendar", count: "bookings" },
  { id: "Celebrities", icon: "star" },
  { id: "Payments", icon: "card" },
  { id: "Customers", icon: "users" },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
const formatBookingAmount = (amount) =>
  Number(amount) > 0 ? formatMoney(Number(amount)) : "Quote required";

function Icon({ name, size = 20 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
    card: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M2.5 10h19M7 15h3" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V4a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2.9Z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Avatar({ name, size = "normal" }) {
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  return <span className={`admin-avatar ${size === "small" ? "admin-avatar-small" : ""}`}>{initials}</span>;
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}

function AdminDashboard() {
  const [bookings, setBookings] = useState(() => readStoredList(STORAGE_KEYS.bookings, demoBookings));
  const [celebrities, setCelebrities] = useState(() => readStoredList(STORAGE_KEYS.celebrities, demoCelebrities));
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All bookings");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rateEditorCelebrity, setRateEditorCelebrity] = useState(null);
  const [showAddCelebrity, setShowAddCelebrity] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesSearch = !term || [
        booking.id, booking.customer, booking.email, booking.celebrity, booking.event,
      ].some((value) => String(value || "").toLowerCase().includes(term));
      const matchesStatus = statusFilter === "All bookings" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const revenue = bookings
    .filter((booking) => booking.status === "Confirmed" || booking.status === "Completed")
    .reduce((total, booking) => total + Number(booking.amount || 0), 0);
  const pendingCount = bookings.filter((booking) => booking.status === "Pending").length;
  const customers = [...new Map(bookings.map((booking) => [booking.email, booking])).values()];

  function persistList(key, list) {
    try {
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch (error) {
      console.error(`Could not save dashboard data for ${key}.`, error);
      setToast("Changes could not be saved in this browser.");
      return false;
    }
  }

  function changeStatus(id, status) {
    const updatedBookings = bookings.map((booking) => booking.id === id ? { ...booking, status } : booking);
    setBookings(updatedBookings);
    if (!persistList(STORAGE_KEYS.bookings, updatedBookings)) return;
    setToast(`Booking ${id} marked ${status.toLowerCase()}.`);
  }

  function exportBookings() {
    const columns = ["id", "customer", "email", "celebrity", "event", "date", "amount", "status"];
    const csv = [
      columns.join(","),
      ...filteredBookings.map((booking) =>
        columns.map((column) => `"${String(booking[column] ?? "").replaceAll('"', '""')}"`).join(","),
      ),
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "celebrity-bookings.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Your booking report has been downloaded.");
  }

  function addCelebrity(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    if (!name || celebrities.some((celebrity) => celebrity.name.toLowerCase() === name.toLowerCase())) {
      setToast("Enter a new celebrity name to continue.");
      return;
    }
    const category = getProfession(String(data.get("category") || "Other"));
    const enteredRate = Number(data.get("rate"));
    const rate = enteredRate || getProfessionStartingRate(category);
    if (rate < 500 || rate > 1500) {
      setToast("Celebrity starting prices must be between $500 and $1,500.");
      return;
    }
    const updatedCelebrities = [{
      name,
      category,
      bookings: 0,
      rate,
      available: true,
      initials: name.split(" ").map((part) => part[0]).slice(0, 2).join(""),
    }, ...celebrities];
    setCelebrities(updatedCelebrities);
    if (!persistList(STORAGE_KEYS.celebrities, updatedCelebrities)) return;
    setShowAddCelebrity(false);
    setToast(`${name} was added to your roster.`);
  }

  function toggleCelebrity(name) {
    const updatedCelebrities = celebrities.map((celebrity) =>
      celebrity.name === name ? { ...celebrity, available: !celebrity.available } : celebrity,
    );
    setCelebrities(updatedCelebrities);
    persistList(STORAGE_KEYS.celebrities, updatedCelebrities);
  }

  function saveCelebrityRate(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rate = Number(formData.get("rate"));
    if (!Number.isInteger(rate) || rate < 500 || rate > 1500) {
      setToast("Set a starting price between $500 and $1,500.");
      return;
    }
    const updatedCelebrities = celebrities.map((celebrity) =>
      celebrity.name === rateEditorCelebrity.name ? { ...celebrity, rate } : celebrity,
    );
    setCelebrities(updatedCelebrities);
    if (!persistList(STORAGE_KEYS.celebrities, updatedCelebrities)) return;
    setRateEditorCelebrity(null);
    setToast(`Starting price updated for ${rateEditorCelebrity.name}.`);
  }

  function resetCelebrityRate(name) {
    const updatedCelebrities = celebrities.map((celebrity) =>
      celebrity.name === name
        ? { ...celebrity, rate: getProfessionStartingRate(celebrity.category) }
        : celebrity,
    );
    setCelebrities(updatedCelebrities);
    if (!persistList(STORAGE_KEYS.celebrities, updatedCelebrities)) return;
    setRateEditorCelebrity(null);
    setToast(`Suggested price restored for ${name}.`);
  }

  const title = activePage === "Overview" ? "Welcome back, Alex" : activePage;
  const description = activePage === "Overview"
    ? "Here's what's happening with your bookings today."
    : `Manage your ${activePage.toLowerCase()} and keep everything running smoothly.`;

  return (
    <div className="admin-shell">
      {mobileMenuOpen && <button className="admin-scrim" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation" />}
      <aside className={`admin-sidebar ${mobileMenuOpen ? "admin-sidebar-open" : ""}`}>
        <Link to="/" className="admin-brand">
          <span className="admin-brand-mark"><img src="/favicon.svg" alt="" /></span>
          <span>My<span>Star</span><small>BOOKING ADMIN</small></span>
        </Link>
        <p className="admin-nav-label">WORKSPACE</p>
        <nav className="admin-nav" aria-label="Admin navigation">
          {navigation.map((item) => (
            <button key={item.id} className={activePage === item.id ? "active" : ""} onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}>
              <Icon name={item.icon} />
              <span>{item.id}</span>
              {item.count === "bookings" && pendingCount > 0 && <span className="nav-count">{pendingCount}</span>}
            </button>
          ))}
        </nav>
        <p className="admin-nav-label admin-tools-label">PREFERENCES</p>
        <nav className="admin-nav">
          <button className={activePage === "Settings" ? "active" : ""} onClick={() => { setActivePage("Settings"); setMobileMenuOpen(false); }}><Icon name="settings" /><span>Settings</span></button>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-orb">?</span><strong>Need a hand?</strong><p>Our team is here to help you.</p><a href="mailto:support@mystarbooking.com">Contact support <span>→</span></a></div>
          <button className="sidebar-user" onClick={() => setActivePage("Settings")}><Avatar name="Alex Morgan" /><span><strong>Alex Morgan</strong><small>Administrator</small></span><span className="user-dots">···</span></button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <label className="admin-search"><Icon name="search" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." aria-label="Search dashboard" /><kbd>⌘ K</kbd></label>
            <button className="notification-button" aria-label="Notifications" onClick={() => setToast(`${pendingCount} booking${pendingCount === 1 ? "" : "s"} need your attention.`)}><Icon name="bell" size={19} /><i /></button>
            <Avatar name="Alex Morgan" size="small" />
          </div>
        </header>

        <div className="admin-content">
          <div className="page-heading">
            <div><p className="page-eyebrow">{activePage === "Overview" ? new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).toUpperCase() : "MYSTARBOOKING · ADMIN"}</p><h1>{title}{activePage === "Overview" && <span className="wave">✦</span>}</h1><p className="page-subtitle">{description}</p></div>
            <div className="heading-actions">
              {activePage === "Bookings" && <button className="button-secondary" onClick={exportBookings}><Icon name="download" size={17} /> Export</button>}
              {activePage === "Celebrities" && <button className="button-primary" onClick={() => setShowAddCelebrity(true)}><Icon name="plus" size={18} /> Add celebrity</button>}
              {activePage === "Overview" && <button className="button-primary" onClick={() => setActivePage("Bookings")}><Icon name="plus" size={18} /> New booking</button>}
            </div>
          </div>

          {activePage === "Overview" && <Overview bookings={bookings} revenue={revenue} pendingCount={pendingCount} celebrities={celebrities} onViewBookings={() => setActivePage("Bookings")} onSelectBooking={setSelectedBooking} />}
          {activePage === "Bookings" && <BookingsPage bookings={filteredBookings} statusFilter={statusFilter} setStatusFilter={setStatusFilter} onChangeStatus={changeStatus} onSelectBooking={setSelectedBooking} />}
          {activePage === "Celebrities" && <CelebritiesPage celebrities={celebrities.filter((celebrity) => !search.trim() || celebrity.name.toLowerCase().includes(search.trim().toLowerCase()))} onAdd={() => setShowAddCelebrity(true)} onToggle={toggleCelebrity} onEditRate={setRateEditorCelebrity} search={search} />}
          {activePage === "Payments" && <PaymentsPage bookings={bookings} />}
          {activePage === "Customers" && <CustomersPage customers={customers} />}
          {activePage === "Settings" && <SettingsPage />}
        </div>
        <footer className="admin-footer"><span>© 2026 MyStarBooking</span><span><i /> All systems operational</span><Link to="/">Back to website <span>↗</span></Link></footer>
      </main>

      {selectedBooking && <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} onChangeStatus={changeStatus} />}
      {rateEditorCelebrity && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setRateEditorCelebrity(null); }}><form className="admin-modal" onSubmit={saveCelebrityRate}><div className="modal-heading"><div><p>PUBLIC STARTING PRICE · USD</p><h2>{rateEditorCelebrity.name}</h2></div><button type="button" className="icon-button" onClick={() => setRateEditorCelebrity(null)} aria-label="Close"><Icon name="close" /></button></div><label>Starting price<input key={rateEditorCelebrity.name} name="rate" type="number" min="500" max="1500" step="1" required defaultValue={rateEditorCelebrity.rate ?? getProfessionStartingRate(rateEditorCelebrity.category)} autoFocus /></label><p className="rate-help">Suggested starting prices are profession-based estimates. Set a price from $500 to $1,500; confirm the final fee directly before booking.</p><div className="modal-actions"><button type="button" className="button-secondary clear-price-button" onClick={() => resetCelebrityRate(rateEditorCelebrity.name)}>Restore suggested price</button><button type="button" className="button-secondary" onClick={() => setRateEditorCelebrity(null)}>Cancel</button><button type="submit" className="button-primary">Save price</button></div></form></div>}
      {showAddCelebrity && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAddCelebrity(false); }}><form className="admin-modal" onSubmit={addCelebrity}><div className="modal-heading"><div><p>ROSTER MANAGEMENT</p><h2>Add a celebrity</h2></div><button type="button" className="icon-button" onClick={() => setShowAddCelebrity(false)} aria-label="Close"><Icon name="close" /></button></div><label>Full name<input name="name" required placeholder="e.g. Taylor Swift" autoFocus /></label><div className="form-two"><label>Profession<select name="category"><option>Actor</option><option>Musician</option><option>Athlete</option><option>Creator</option><option>Other</option></select></label><label>Starting rate (USD)<input name="rate" type="number" min="500" max="1500" step="1" placeholder="$500–$1,500" /></label></div><p className="rate-help">Defaults to the suggested profession rate if left blank. You can edit it later.</p><div className="modal-actions"><button type="button" className="button-secondary" onClick={() => setShowAddCelebrity(false)}>Cancel</button><button type="submit" className="button-primary"><Icon name="plus" size={17} /> Add to roster</button></div></form></div>}
      {toast && <div className="admin-toast" role="status">{toast}</div>}
    </div>
  );
}

function Overview({ bookings, revenue, pendingCount, celebrities, onViewBookings, onSelectBooking }) {
  const totals = [
    { label: "Total bookings", value: bookings.length.toLocaleString(), detail: "+12.8%", icon: "calendar", tone: "violet" },
    { label: "Revenue collected", value: formatMoney(revenue), detail: "+8.2%", icon: "card", tone: "green" },
    { label: "Pending requests", value: pendingCount.toString().padStart(2, "0"), detail: "Needs attention", icon: "bell", tone: "amber" },
    { label: "Active celebrities", value: celebrities.filter((item) => item.available).length.toString().padStart(2, "0"), detail: "Across 8 categories", icon: "star", tone: "blue" },
  ];
  const monthBars = [48, 65, 53, 78, 61, 88, 70, 96, 68, 80, 60, 86];
  return <>
    <section className="metric-grid">{totals.map((item) => <article key={item.label} className="metric-card"><div className="metric-top"><span>{item.label}</span><span className={`metric-icon ${item.tone}`}><Icon name={item.icon} size={18} /></span></div><strong>{item.value}</strong><div className="metric-foot"><span className={item.detail.startsWith("+") ? "trend-up" : "trend-muted"}>{item.detail.startsWith("+") && "↗ "}{item.detail}</span>{item.detail.startsWith("+") && <span>vs last month</span>}</div><div className="metric-spark">{[28, 49, 37, 66, 44, 75, 58, 84, 63, 94].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article>)}</section>
    <section className="overview-grid">
      <article className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track how your business is performing</p></div><select aria-label="Revenue time period" defaultValue="This year"><option>This year</option><option>Last 30 days</option><option>Last 7 days</option></select></div><div className="revenue-total"><strong>{formatMoney(revenue)}</strong><span>↗ 10.4%</span><small>vs. last year</small></div><div className="chart" role="img" aria-label="Revenue overview bar chart"><div className="chart-y-axis"><span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span></div><div className="chart-plot"><div className="chart-gridlines"><i /><i /><i /><i /><i /></div><div className="chart-bars">{monthBars.map((bar, index) => <div key={index} className="chart-bar-group"><span style={{ height: `${bar}%` }} /><span className="chart-bar-soft" style={{ height: `${Math.max(20, bar - 22)}%` }} /></div>)}</div><div className="chart-months">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => <span key={month}>{month}</span>)}</div></div></div><div className="chart-legend"><span><i /> This year</span><span><i /> Last year</span></div></article>
      <article className="panel quick-panel"><div className="panel-heading"><div><h2>Booking insights</h2><p>A quick look at your activity</p></div><span className="more-menu">···</span></div><div className="donut-wrap"><div className="donut-chart"><div><strong>{bookings.length}</strong><span>Total bookings</span></div></div></div><div className="insight-legend"><div><i className="legend-confirmed" /><span>Confirmed</span><strong>{bookings.filter((item) => item.status === "Confirmed").length}</strong></div><div><i className="legend-pending" /><span>Pending</span><strong>{pendingCount}</strong></div><div><i className="legend-completed" /><span>Completed</span><strong>{bookings.filter((item) => item.status === "Completed").length}</strong></div></div></article>
    </section>
    <section className="panel table-panel"><div className="panel-heading"><div><h2>Recent bookings</h2><p>Your latest booking activity</p></div><button className="text-button" onClick={onViewBookings}>View all <span>→</span></button></div><BookingTable bookings={bookings.slice(0, 5)} onSelectBooking={onSelectBooking} /></section>
    <section className="overview-bottom"><article className="panel upcoming-panel"><div className="panel-heading"><div><h2>Upcoming events</h2><p>What's coming up next</p></div><button className="text-button" onClick={onViewBookings}>See calendar →</button></div>{bookings.filter((booking) => booking.status === "Confirmed").slice(0, 3).map((booking) => <button key={booking.id} className="upcoming-row" onClick={() => onSelectBooking(booking)}><span className="calendar-date"><b>{new Date(`${booking.date}T12:00:00`).getDate()}</b><small>{new Date(`${booking.date}T12:00:00`).toLocaleString("en-US", { month: "short" })}</small></span><span className="upcoming-info"><strong>{booking.event}</strong><small>{booking.celebrity} · {booking.customer}</small></span><span className="upcoming-time">10:00 AM</span></button>)}</article><article className="panel top-celebs-panel"><div className="panel-heading"><div><h2>Top celebrities</h2><p>Most booked this month</p></div><button className="text-button" onClick={onViewBookings}>See all →</button></div>{celebrities.slice(0, 4).map((celebrity, index) => <div className="top-celeb-row" key={celebrity.name}><span className="rank-number">0{index + 1}</span><Avatar name={celebrity.name} size="small" /><span className="top-celeb-info"><strong>{celebrity.name}</strong><small>{celebrity.category}</small></span><strong className="celeb-bookings">{celebrity.bookings} <small>bookings</small></strong></div>)}</article></section>
  </>;
}

function BookingTable({ bookings, onSelectBooking, onChangeStatus }) {
  if (!bookings.length) return <div className="empty-state"><span>✦</span><strong>No bookings found</strong><p>Try changing your filters or search terms.</p></div>;
  return <div className="table-scroll"><table className="admin-table"><thead><tr><th>BOOKING</th><th>CUSTOMER</th><th>CELEBRITY</th><th>EVENT DATE</th><th>AMOUNT</th><th>STATUS</th><th /></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td><button className="booking-id" onClick={() => onSelectBooking(booking)}>{booking.id}</button></td><td><span className="customer-cell"><Avatar name={booking.customer} size="small" /><span><strong>{booking.customer}</strong><small>{booking.email}</small></span></span></td><td><span className="celebrity-cell"><Avatar name={booking.celebrity} size="small" /><strong>{booking.celebrity}</strong></span></td><td>{new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td><td className="amount-cell">{formatBookingAmount(booking.amount)}</td><td>{onChangeStatus ? <select className={`status-select status-${booking.status.toLowerCase()}`} aria-label={`Change ${booking.id} status`} value={booking.status} onChange={(event) => onChangeStatus(booking.id, event.target.value)}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select> : <StatusBadge status={booking.status} />}</td><td><button className="row-action" aria-label={`View ${booking.id}`} onClick={() => onSelectBooking(booking)}>···</button></td></tr>)}</tbody></table></div>;
}

function BookingsPage({ bookings, statusFilter, setStatusFilter, onChangeStatus, onSelectBooking }) {
  return <section className="panel bookings-panel"><div className="bookings-toolbar"><div><h2>All bookings <span>{bookings.length}</span></h2><p>Review and manage event requests.</p></div><div className="booking-filters"><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter bookings by status"><option>All bookings</option><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select><button className="button-secondary" onClick={() => { setStatusFilter("All bookings"); }}>Reset filters</button></div></div><BookingTable bookings={bookings} onSelectBooking={onSelectBooking} onChangeStatus={onChangeStatus} /></section>;
}

function CelebritiesPage({ celebrities, onAdd, onToggle, onEditRate, search }) {
  return <>
    <div className="roster-intro">
      <div><strong>{celebrities.length} talent profiles</strong><span> · Manage public starting prices in USD</span></div>
      <button className="button-primary" onClick={onAdd}><Icon name="plus" size={18} /> Add celebrity</button>
    </div>
    {celebrities.length === 0 ? (
      <div className="panel empty-state"><span>✦</span><strong>No matching celebrities</strong><p>{search ? "Try a different search." : "Search celebrities on the website to add them to your roster."}</p></div>
    ) : (
      <section className="celebrity-grid">
        {celebrities.map((celebrity) => (
          <article className="celebrity-card" key={celebrity.name}>
            <div className="celebrity-card-top"><Avatar name={celebrity.name} /><span className={`availability ${celebrity.available ? "available" : "unavailable"}`}><i />{celebrity.available ? "Available" : "Unavailable"}</span></div>
            <h2>{celebrity.name}</h2>
            <p>{celebrity.category}</p>
            <div className="celebrity-stats">
              <span><small>Bookings</small><strong>{celebrity.bookings}</strong></span>
              <span><small>Public starting price</small><strong>{Number(celebrity.rate) > 0 ? formatMoney(celebrity.rate) : "Not set"}</strong></span>
            </div>
            <div className="roster-actions">
              <button className="rate-edit-button" onClick={() => onEditRate(celebrity)}>{Number(celebrity.rate) > 0 ? "Edit price" : "Set a price"} <span>✎</span></button>
              <button className={`roster-toggle ${celebrity.available ? "" : "is-off"}`} onClick={() => onToggle(celebrity.name)}>{celebrity.available ? "Mark unavailable" : "Mark available"} <span>→</span></button>
            </div>
          </article>
        ))}
      </section>
    )}
  </>;
}

function PaymentsPage({ bookings }) {
  const paid = bookings.filter((booking) => booking.status === "Confirmed" || booking.status === "Completed");
  return <section className="panel payments-panel"><div className="panel-heading"><div><h2>Payment history</h2><p>Payments are estimated from confirmed booking values.</p></div></div><div className="payment-summary"><div><small>Total collected</small><strong>{formatMoney(paid.reduce((sum, item) => sum + Number(item.amount || 0), 0))}</strong></div><div><small>Successful payments</small><strong>{paid.length}</strong></div><div><small>Payment processing</small><strong>Demo mode</strong></div></div><div className="table-scroll"><table className="admin-table"><thead><tr><th>TRANSACTION</th><th>CUSTOMER</th><th>BOOKING</th><th>DATE</th><th>AMOUNT</th><th>PAYMENT STATUS</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td><strong className="transaction-id">TXN-{booking.id.slice(-4)}</strong></td><td><span className="customer-cell"><Avatar name={booking.customer} size="small" /><span><strong>{booking.customer}</strong><small>{booking.email}</small></span></span></td><td>{booking.id}</td><td>{new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td><td className="amount-cell">{formatBookingAmount(booking.amount)}</td><td><StatusBadge status={booking.status === "Confirmed" || booking.status === "Completed" ? "Paid" : booking.status === "Cancelled" ? "Cancelled" : "Pending"} /></td></tr>)}</tbody></table></div></section>;
}

function CustomersPage({ customers }) {
  return <section className="panel customers-panel"><div className="panel-heading"><div><h2>Customers</h2><p>{customers.length} unique customers from your booking history.</p></div></div><div className="table-scroll"><table className="admin-table"><thead><tr><th>CUSTOMER</th><th>EMAIL ADDRESS</th><th>LATEST BOOKING</th><th>CELEBRITY</th><th>STATUS</th></tr></thead><tbody>{customers.map((customer) => <tr key={customer.email}><td><span className="customer-cell"><Avatar name={customer.customer} size="small" /><strong>{customer.customer}</strong></span></td><td>{customer.email}</td><td>{customer.id}</td><td>{customer.celebrity}</td><td><StatusBadge status={customer.status} /></td></tr>)}</tbody></table></div></section>;
}

function SettingsPage() {
  return <div className="settings-layout"><section className="panel settings-panel"><div className="panel-heading"><div><h2>Workspace settings</h2><p>Manage your admin profile and dashboard preferences.</p></div></div><div className="settings-profile"><Avatar name="Alex Morgan" /><div><strong>Alex Morgan</strong><span>Administrator · alex@mystarbooking.com</span></div><span className="profile-edit">Admin</span></div><label className="settings-row"><span><strong>Email notifications</strong><small>Get notified when a new booking request comes in.</small></span><input type="checkbox" defaultChecked /></label><label className="settings-row"><span><strong>Booking reminders</strong><small>Receive a reminder 24 hours before each event.</small></span><input type="checkbox" defaultChecked /></label></section><section className="panel storage-panel"><div className="panel-heading"><div><h2>Data & privacy</h2><p>About this dashboard environment.</p></div></div><div className="demo-notice"><span>i</span><p><strong>Demo dashboard</strong><br />This project has no admin API or database connected. Changes are saved in this browser only and are not shared across devices.</p></div><div className="storage-status"><span>Booking and roster data</span><strong><i /> Local browser storage</strong></div><div className="storage-status"><span>Payment processing</span><strong className="muted-status">Not connected</strong></div></section></div>;
}

function BookingModal({ booking, onClose, onChangeStatus }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="admin-modal booking-detail-modal"><div className="modal-heading"><div><p>BOOKING DETAILS · {booking.id}</p><h2>{booking.event}</h2></div><button type="button" className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div><div className="detail-person"><Avatar name={booking.customer} /><div><strong>{booking.customer}</strong><span>{booking.email}</span></div><StatusBadge status={booking.status} /></div><div className="detail-grid"><div><small>Celebrity</small><strong>{booking.celebrity}</strong></div><div><small>Event date</small><strong>{new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong></div><div><small>Booking value</small><strong>{formatBookingAmount(booking.amount)}</strong></div><div><small>Booking reference</small><strong>{booking.id}</strong></div></div><label className="detail-status">Update booking status<select value={booking.status} onChange={(event) => onChangeStatus(booking.id, event.target.value)}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></label><div className="modal-actions"><button className="button-primary" onClick={onClose}>Done</button></div></section></div>;
}

export default AdminDashboard;
