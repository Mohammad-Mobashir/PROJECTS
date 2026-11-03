import { useEffect, useMemo, useState } from 'react';
import './App.css';

const cars = [
  { id: 1, name: 'BMW 3 Series', type: 'Luxury', price: 6500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcokPqW4RAeQBCqQ5C76PyzkX-p_os24Y18o-EwzJGiw&s=10', description: 'A premium sedan offering a comfortable interior, excellent handling and a powerful driving experience.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 2, name: 'Toyota Fortuner', type: 'SUV', price: 5500, image: 'https://asset.autocarindia.com/static/features/images/20260723_131917_61fb3837.jpg', description: 'A spacious SUV perfect for families, long road trips and adventures.', features: ['Automatic', '7 Seats', 'Diesel', '4x4'] },
  { id: 3, name: 'Mercedes-Benz C-Class', type: 'Luxury', price: 7500, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80', description: 'Luxury, technology and comfort combined in an elegant Mercedes-Benz sedan.', features: ['Automatic', '5 Seats', 'Petrol', 'Sunroof'] },
  { id: 4, name: 'Audi R8', type: 'Sports', price: 12000, image: 'https://hips.hearstapps.com/hmg-prod/images/img-0223-1675270578.jpg?crop=1.00xw:0.847xh;0,0.0612xh&resize=640:*', description: 'A high-performance sports car designed for an unforgettable driving experience.', features: ['Automatic', '2 Seats', 'Petrol', 'V10'] },
  { id: 5, name: 'Honda City', type: 'Sedan', price: 2500, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Honda_Jazz_Luzern_1980.jpg', description: 'A reliable and comfortable sedan suitable for city driving and weekend trips.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 6, name: 'Jeep Wrangler', type: 'SUV', price: 6000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMODYKLpcNINGBTUio8W4ESFhZd0T0P9Q_LGpvy3FxvA&s=10', description: 'An adventurous SUV built for exploring roads, mountains and off-road destinations.', features: ['Automatic', '5 Seats', 'Petrol', '4x4'] },
  { id: 7, name: 'Ford Mustang', type: 'Sports', price: 9000, image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Ford/Mustang-2024/7939/1663750110692/exterior-image-164.jpg', description: 'An iconic American muscle car with impressive performance and styling.', features: ['Automatic', '4 Seats', 'Petrol', 'V8'] },
  { id: 8, name: 'Hyundai Creta', type: 'SUV', price: 3200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHiA7eQRBXjjJOsDTvPkOt6L6kKPjWEYBF1Ompfot9Jg&s', description: 'A practical and stylish SUV offering comfort, space and modern features.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 9, name: 'Tesla Model 3', type: 'Sedan', price: 5000, image: 'https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20230901023724_Tesla.png?w=728&q=75&fm=auto', description: 'A modern electric sedan featuring quick acceleration and advanced technology.', features: ['Automatic', '5 Seats', 'Electric', 'Autopilot'] },
  { id: 10, name: 'Hyundai Verna', type: 'Sedan', price: 2800, image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=80', description: 'A stylish sedan with a comfortable cabin and smooth city and highway performance.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 11, name: 'Maruti Suzuki Swift', type: 'Sedan', price: 1800, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80', description: 'A compact, fuel-efficient car that is easy to drive around the city.', features: ['Manual', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 12, name: 'Kia Seltos', type: 'SUV', price: 3000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80', description: 'A feature-rich SUV with a roomy cabin and confident road presence.', features: ['Automatic', '5 Seats', 'Petrol', 'Infotainment'] },
  { id: 13, name: 'Tata Harrier', type: 'SUV', price: 3800, image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80', description: 'A bold SUV suited to family trips and long-distance travel.', features: ['Automatic', '5 Seats', 'Diesel', 'Air Conditioning'] },
  { id: 14, name: 'Mahindra Thar', type: 'SUV', price: 4200, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80', description: 'An adventure-ready off-road SUV for memorable weekend drives.', features: ['Manual', '4 Seats', 'Diesel', '4x4'] },
  { id: 15, name: 'Range Rover Sport', type: 'Luxury', price: 11000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80', description: 'A premium luxury SUV combining refined comfort with strong performance.', features: ['Automatic', '5 Seats', 'Diesel', 'Panoramic Roof'] },
  { id: 16, name: 'Porsche 911', type: 'Sports', price: 15000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80', description: 'An iconic sports car with sharp handling and thrilling acceleration.', features: ['Automatic', '2 Seats', 'Petrol', 'Turbo'] },
  { id: 17, name: 'Chevrolet Camaro', type: 'Sports', price: 10000, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=80', description: 'A muscular performance coupe with bold styling and an engaging drive.', features: ['Automatic', '4 Seats', 'Petrol', 'V8'] },
  { id: 18, name: 'BMW 5 Series', type: 'Luxury', price: 8500, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80', description: 'An executive sedan offering premium comfort, technology and performance.', features: ['Automatic', '5 Seats', 'Diesel', 'Leather Seats'] },
  { id: 19, name: 'Audi A6', type: 'Luxury', price: 8000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80', description: 'A sophisticated executive sedan designed for relaxed premium travel.', features: ['Automatic', '5 Seats', 'Petrol', 'Sunroof'] },
  { id: 20, name: 'Toyota Innova Crysta', type: 'SUV', price: 3500, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80', description: 'A spacious family MPV with comfortable seating for longer journeys.', features: ['Manual', '7 Seats', 'Diesel', 'Air Conditioning'] },
];
const money = value => `₹${Number(value || 0).toLocaleString('en-IN')}`;
const today = new Date().toLocaleDateString('en-CA');
const readBookings = () => { try { return JSON.parse(localStorage.getItem('drivenow-bookings') || '[]'); } catch { return []; } };

export default function App() {
  const [page, setPage] = useState('home');
  const [filter, setFilter] = useState('All');
  const [modalCar, setModalCar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookings, setBookings] = useState(readBookings);
  const [confirmation, setConfirmation] = useState(null);
  const [contactSent, setContactSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => { localStorage.setItem('drivenow-bookings', JSON.stringify(bookings)); }, [bookings]);
  const visibleCars = useMemo(() => filter === 'All' ? cars : cars.filter(car => car.type === filter), [filter]);
  const days = startDate && endDate && new Date(endDate) > new Date(startDate) ? Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000) : 0;
  const total = selectedCar && days ? selectedCar.price * days : 0;
  const valid = Boolean(selectedCar && name.trim() && phone.trim() && pickup && days > 0);
  const myBookings = bookings.filter(b => userEmail && b.email.toLowerCase() === userEmail.toLowerCase());

  function go(next) { setPage(next); setModalCar(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function chooseCar(car) { setSelectedCar(car); setModalCar(null); go('booking'); }
  function submitBooking(event) {
    event.preventDefault();
    if (!valid) return;
    const booking = { id: Date.now(), name: name.trim(), phone: phone.trim(), email: email.trim(), pickup, startDate, endDate, days, total, car: selectedCar.name, status: 'Pending' };
    setBookings(prev => [booking, ...prev]);
    setConfirmation(booking);
    setName(''); setPhone(''); setEmail(''); setPickup(''); setStartDate(''); setEndDate('');
  }
  function updateStatus(id, status) { setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b)); }

  const navItems = [['home', 'Home'], ['cars', 'Cars'], ['booking', 'Booking'], ['contact', 'Contact']];
  return <>
    <nav className="site-nav">
      <button className="logo" onClick={() => go('home')}>DriveNow</button>
      <div className="nav-links">{navItems.map(([key, label]) => <button key={key} className={page === key ? 'nav-active' : ''} onClick={() => go(key)}>{label}</button>)}</div>
      <div className="module-links">
        <button className={page === 'user' ? 'nav-active' : ''} onClick={() => go('user')}>User</button>
        <button className={page === 'admin' ? 'nav-active' : ''} onClick={() => go('admin')}>Admin</button>
      </div>
    </nav>

    {page === 'home' && <>
      <section className="hero"><div className="hero-content"><span className="eyebrow">YOUR JOURNEY STARTS HERE</span><h1>Rent Your Dream Car</h1><p>Choose your car, select your dates and hit the road.</p><button className="hero-btn" onClick={() => go('cars')}>Browse Cars</button></div></section>
      <main>
        <section className="container"><div className="section-title"><h2>Welcome to DriveNow</h2><p>Simple, convenient and comfortable car rentals for every journey.</p></div><div className="benefit-grid"><article><span>01</span><h3>Choose your car</h3><p>Explore our collection of sedans, SUVs and premium cars.</p></article><article><span>02</span><h3>Book your dates</h3><p>Select your pickup location and rental dates in a few steps.</p></article><article><span>03</span><h3>Enjoy the drive</h3><p>Get your booking details and enjoy your journey.</p></article></div></section>
        <section className="container"><div className="section-title"><h2>Featured Cars</h2><p>A few popular choices from our fleet.</p></div><div className="car-grid">{cars.slice(0, 3).map(car => <CarCard key={car.id} car={car} onDetails={() => setModalCar(car)} />)}</div><div className="center-action"><button className="primary-btn" onClick={() => go('cars')}>View All Cars</button></div></section>
      </main>
    </>}

    {page === 'cars' && <main className="container page-container"><PageHeading title="Our Cars" subtitle="Choose from our collection of premium and affordable vehicles."/><div className="filters">{['All', 'Sedan', 'SUV', 'Sports', 'Luxury'].map(type => <button key={type} className={`filter-btn ${filter === type ? 'active' : ''}`} onClick={() => setFilter(type)}>{type}</button>)}</div><div className="car-grid">{visibleCars.map(car => <CarCard key={car.id} car={car} onDetails={() => setModalCar(car)} />)}</div></main>}

    {page === 'booking' && <main className="container page-container"><PageHeading title="Book Your Car" subtitle="Enter your details, choose your dates and confirm your reservation."/><div className="booking-box"><div className="selected-car"><img src={selectedCar?.image || cars[0].image} alt={selectedCar?.name || 'Car'} /><div className="selected-car-content"><h3>{selectedCar?.name || 'No car selected'}</h3><p>{selectedCar ? `${selectedCar.type} • ${selectedCar.features.join(' • ')}` : 'Please select a car from the Cars page.'}</p><div className="selected-price">{money(selectedCar?.price)} / day</div><button className="text-btn" onClick={() => go('cars')}>Choose a different car</button></div></div>
      <form className="booking-form" onSubmit={submitBooking}><div className="form-group"><label>Your Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required /></div><div className="form-group"><label>Phone Number</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" required /></div><div className="form-group"><label>Email Address (used to view your bookings)</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required /></div><div className="date-row"><div className="form-group"><label>From Date</label><input type="date" min={today} value={startDate} onChange={e => { setStartDate(e.target.value); if (endDate && e.target.value >= endDate) setEndDate(''); }} required /></div><div className="form-group"><label>To Date</label><input type="date" min={startDate || today} value={endDate} onChange={e => setEndDate(e.target.value)} required /></div></div><div className="form-group"><label>Pickup Location</label><select value={pickup} onChange={e => setPickup(e.target.value)} required><option value="">Select location</option>{['Hyderabad', 'Bangalore', 'Chennai', 'Vijayawada', 'Visakhapatnam'].map(city => <option key={city}>{city}</option>)}</select></div><div className="calculation"><div className="calculation-row"><span>Price per day</span><strong>{money(selectedCar?.price)}</strong></div><div className="calculation-row"><span>Number of days</span><strong>{days}</strong></div><div className="calculation-row total"><span>Total</span><strong>{money(total)}</strong></div></div><button className="order-btn" type="submit" disabled={!valid}>Confirm Booking</button>{!selectedCar && <p className="form-hint">Choose a car from the Cars page to continue.</p>}</form></div></main>}

    {page === 'contact' && <main className="container page-container"><PageHeading title="Contact Us" subtitle="Have a question? Send our team a message."/><div className="contact-layout"><div className="contact-info"><h3>DriveNow Car Rentals</h3><p>We are here to help with vehicle choices, bookings and general enquiries.</p><p><strong>Email</strong><br/>support@drivenow.example</p><p><strong>Phone</strong><br/>+91 90000 00000</p><p><strong>Service locations</strong><br/>Hyderabad · Bangalore · Chennai · Vijayawada · Visakhapatnam</p></div><form className="booking-form contact-form" onSubmit={e => { e.preventDefault(); setContactSent(true); e.currentTarget.reset(); }}><div className="form-group"><label>Your Name</label><input required placeholder="Enter your name"/></div><div className="form-group"><label>Email</label><input type="email" required placeholder="Enter your email"/></div><div className="form-group"><label>Message</label><textarea rows="5" required placeholder="How can we help?"/></div><button className="primary-btn" type="submit">Send Message</button>{contactSent && <p className="success-message">Thanks! Your message form was submitted in this demo.</p>}</form></div></main>}

    {page === 'user' && <main className="container page-container"><PageHeading title="User Dashboard" subtitle="View your bookings using the email address entered during reservation."/><div className="dashboard-panel"><div className="form-group user-lookup"><label>Email Address</label><input type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} placeholder="Enter your booking email"/></div><h3>My Bookings</h3>{!userEmail ? <p className="empty-state">Enter your email to find your bookings.</p> : myBookings.length === 0 ? <p className="empty-state">No bookings found for this email.</p> : <BookingTable bookings={myBookings}/>}</div></main>}

    {page === 'admin' && <main className="container page-container"><PageHeading title="Admin Dashboard" subtitle="Demo management panel for viewing and updating customer reservations."/><div className="admin-warning">Demo admin module: this page has no real authentication or server-side access control.</div><div className="stats-grid"><div><span>Total Bookings</span><strong>{bookings.length}</strong></div><div><span>Pending</span><strong>{bookings.filter(b => b.status === 'Pending').length}</strong></div><div><span>Confirmed</span><strong>{bookings.filter(b => b.status === 'Confirmed').length}</strong></div><div><span>Revenue (all bookings)</span><strong>{money(bookings.reduce((sum, b) => sum + b.total, 0))}</strong></div></div><div className="dashboard-panel"><h3>Manage Bookings</h3>{bookings.length === 0 ? <p className="empty-state">No reservations yet. New customer bookings will appear here.</p> : <div className="admin-bookings">{bookings.map(b => <article className="admin-booking" key={b.id}><div><strong>{b.name}</strong><p>{b.car} · {b.startDate} to {b.endDate}</p><p>{b.email} · {b.phone} · {b.pickup}</p><b>{money(b.total)}</b></div><div className="admin-actions"><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span><select value={b.status} onChange={e => updateStatus(b.id, e.target.value)}><option>Pending</option><option>Confirmed</option><option>Cancelled</option></select><button className="delete-btn" onClick={() => setBookings(prev => prev.filter(item => item.id !== b.id))}>Delete</button></div></article>)}</div>}</div></main>}

    <footer><h3>DriveNow Car Rentals</h3><p>Affordable cars. Easy booking. Great journeys.</p><p>© 2026 DriveNow. All rights reserved.</p></footer>

    {modalCar && <div className="modal show" onClick={e => { if (e.target === e.currentTarget) setModalCar(null); }}><div className="modal-content" role="dialog" aria-modal="true"><button className="close" onClick={() => setModalCar(null)} aria-label="Close">×</button><img src={modalCar.image} alt={modalCar.name}/><div className="modal-body"><h2>{modalCar.name}</h2><p>{modalCar.description}</p><div className="features">{modalCar.features.map(feature => <span className="feature" key={feature}>{feature}</span>)}</div><h3 className="modal-price">{money(modalCar.price)} / day</h3><button className="modal-select" onClick={() => chooseCar(modalCar)}>Select This Car</button></div></div></div>}
    {confirmation && <div className="modal show" onClick={e => { if (e.target === e.currentTarget) setConfirmation(null); }}><div className="confirmation-card" role="dialog" aria-modal="true"><button className="close" onClick={() => setConfirmation(null)} aria-label="Close">×</button><div className="success-icon">✓</div><h2>Booking Received!</h2><p>Your reservation has been saved. The admin can review it from the Admin module.</p><div className="confirmation-details"><p><strong>Customer:</strong> {confirmation.name}</p><p><strong>Car:</strong> {confirmation.car}</p><p><strong>Pickup:</strong> {confirmation.pickup}</p><p><strong>Dates:</strong> {confirmation.startDate} to {confirmation.endDate}</p><p><strong>Total:</strong> {money(confirmation.total)}</p><p><strong>Status:</strong> {confirmation.status}</p></div><button className="modal-select" onClick={() => { setConfirmation(null); go('user'); setUserEmail(confirmation.email); }}>View My Booking</button></div></div>}
  </>;
}

function PageHeading({ title, subtitle }) { return <div className="section-title"><h2>{title}</h2><p>{subtitle}</p></div>; }
function CarCard({ car, onDetails }) { return <article className="car-card"><img className="car-image" src={car.image} alt={car.name}/><div className="car-info"><h3>{car.name}</h3><div className="car-type">{car.type}</div><div className="features">{car.features.slice(0, 3).map(feature => <span className="feature" key={feature}>{feature}</span>)}</div><div className="price-row"><div className="price">{money(car.price)} <small>/day</small></div><button className="select-btn" onClick={onDetails}>View Details</button></div></div></article>; }
function BookingTable({ bookings }) { return <div className="table-wrap"><table className="booking-table"><thead><tr><th>Car</th><th>Dates</th><th>Pickup</th><th>Total</th><th>Status</th></tr></thead><tbody>{bookings.map(b => <tr key={b.id}><td>{b.car}</td><td>{b.startDate} – {b.endDate}</td><td>{b.pickup}</td><td>{money(b.total)}</td><td><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></td></tr>)}</tbody></table></div>; }
