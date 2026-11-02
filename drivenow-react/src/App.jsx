import { useMemo, useState } from 'react';
import './App.css';

const cars = [
  { id: 1, name: 'BMW 3 Series', type: 'Luxury', price: 6500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcokPqW4RAeQBCqQ5C76PyzkX-p_os24Y18o-EwzJGiw&s=10', description: 'A premium sedan offering a comfortable interior, excellent handling and a powerful driving experience.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 2, name: 'Toyota Fortuner', type: 'SUV', price: 5500, image: 'https://asset.autocarindia.com/static/features/images/20260723_131917_61fb3837.jpg', description: 'A spacious SUV perfect for families, long road trips and adventures.', features: ['Automatic', '7 Seats', 'Diesel', '4x4'] },
  { id: 3, name: 'Mercedes-Benz C-Class', type: 'Luxury', price: 7500, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80', description: 'Luxury, technology and comfort combined in an elegant Mercedes-Benz sedan.', features: ['Automatic', '5 Seats', 'Petrol', 'Sunroof'] },
  { id: 4, name: 'Audi R8', type: 'Sports', price: 12000, image: 'https://hips.hearstapps.com/hmg-prod/images/img-0223-1675270578.jpg?crop=1.00xw:0.847xh;0,0.0612xh&resize=640:*', description: 'A high-performance sports car designed for an unforgettable driving experience.', features: ['Automatic', '2 Seats', 'Petrol', 'V10'] },
  { id: 5, name: 'Honda City', type: 'Sedan', price: 2500, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Honda_Jazz_Luzern_1980.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original', description: 'A reliable and comfortable sedan suitable for city driving and weekend trips.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 6, name: 'Jeep Wrangler', type: 'SUV', price: 6000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMODYKLpcNINGBTUio8W4ESFhZd0T0P9Q_LGpvy3FxvA&s=10', description: 'An adventurous SUV built for exploring roads, mountains and off-road destinations.', features: ['Automatic', '5 Seats', 'Petrol', '4x4'] },
  { id: 7, name: 'Ford Mustang', type: 'Sports', price: 9000, image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Ford/Mustang-2024/7939/1663750110692/exterior-image-164.jpg', description: 'An iconic American muscle car with impressive performance and styling.', features: ['Automatic', '4 Seats', 'Petrol', 'V8'] },
  { id: 8, name: 'Hyundai Creta', type: 'SUV', price: 3200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHiA7eQRBXjjJOsDTvPkOt6L6kKPjWEYBF1Ompfot9Jg&s', description: 'A practical and stylish SUV offering comfort, space and modern features.', features: ['Automatic', '5 Seats', 'Petrol', 'Air Conditioning'] },
  { id: 9, name: 'Tesla Model 3', type: 'Sedan', price: 5000, image: 'https://cdn-s3.autocarindia.com/legacy/cdni/ExtraImages/20230901023724_Tesla.png?w=728&q=75&fm=auto', description: 'A modern electric sedan featuring quick acceleration and advanced technology.', features: ['Automatic', '5 Seats', 'Electric', 'Autopilot'] },
];

const money = value => `₹${Number(value).toLocaleString('en-IN')}`;
const today = new Date().toLocaleDateString('en-CA');

export default function App() {
  const [filter, setFilter] = useState('All');
  const [modalCar, setModalCar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const visibleCars = useMemo(
    () => filter === 'All' ? cars : cars.filter(car => car.type === filter),
    [filter]
  );

  const days = startDate && endDate && new Date(endDate) > new Date(startDate)
    ? Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000) : 0;
  const total = selectedCar && days ? selectedCar.price * days : 0;
  const valid = Boolean(selectedCar && name.trim() && phone.trim() && pickup && days > 0);

  function chooseCar(car) {
    setSelectedCar(car);
    setModalCar(null);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }

  function submitBooking(event) {
    event.preventDefault();
    if (!valid) return;
    setConfirmation({ name, phone, pickup, startDate, endDate, days, total, car: selectedCar.name });
  }

  return (
    <>
      <nav>
        <a className="logo" href="#home">DriveNow</a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#cars">Cars</a></li>
          <li><a href="#booking">Booking</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Rent Your Dream Car</h1>
          <p>Choose your car, select your dates and hit the road.</p>
          <a href="#cars" className="hero-btn">Browse Cars</a>
        </div>
      </section>

      <main>
        <section className="container" id="cars">
          <div className="section-title">
            <h2>Our Cars</h2>
            <p>Choose from our collection of premium and affordable vehicles.</p>
          </div>

          <div className="filters">
            {['All', 'Sedan', 'SUV', 'Sports', 'Luxury'].map(type => (
              <button key={type} className={`filter-btn ${filter === type ? 'active' : ''}`} onClick={() => setFilter(type)}>
                {type}
              </button>
            ))}
          </div>

          <div className="car-grid">
            {visibleCars.map(car => (
              <article className="car-card" key={car.id}>
                <img className="car-image" src={car.image} alt={car.name} />
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <div className="car-type">{car.type}</div>
                  <div className="features">
                    {car.features.slice(0, 3).map(feature => <span className="feature" key={feature}>{feature}</span>)}
                  </div>
                  <div className="price-row">
                    <div className="price">{money(car.price)} <small>/day</small></div>
                    <button className="select-btn" onClick={() => setModalCar(car)}>View Details</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container" id="booking">
          <div className="section-title">
            <h2>Complete Your Booking</h2>
            <p>Select your dates and check the rental price.</p>
          </div>

          <div className="booking-box">
            <div className="selected-car">
              <img src={selectedCar?.image || cars[0].image} alt={selectedCar?.name || 'Car'} />
              <div className="selected-car-content">
                <h3>{selectedCar?.name || 'No car selected'}</h3>
                <p>{selectedCar ? `${selectedCar.type} • ${selectedCar.features.join(' • ')}` : 'Please select a car from the catalog.'}</p>
                <div className="selected-price">{money(selectedCar?.price || 0)} / day</div>
              </div>
            </div>

            <form className="booking-form" onSubmit={submitBooking}>
              <div className="form-group">
                <label htmlFor="customerName">Your Name</label>
                <input id="customerName" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number</label>
                <input id="customerPhone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone number" required />
              </div>
              <div className="date-row">
                <div className="form-group">
                  <label htmlFor="startDate">From Date</label>
                  <input id="startDate" type="date" min={today} value={startDate} onChange={e => { setStartDate(e.target.value); if (endDate && e.target.value >= endDate) setEndDate(''); }} required />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">To Date</label>
                  <input id="endDate" type="date" min={startDate || today} value={endDate} onChange={e => setEndDate(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location</label>
                <select id="pickupLocation" value={pickup} onChange={e => setPickup(e.target.value)} required>
                  <option value="">Select location</option>
                  {['Hyderabad', 'Bangalore', 'Chennai', 'Vijayawada', 'Visakhapatnam'].map(city => <option key={city}>{city}</option>)}
                </select>
              </div>

              <div className="calculation">
                <div className="calculation-row"><span>Price per day</span><strong>{money(selectedCar?.price || 0)}</strong></div>
                <div className="calculation-row"><span>Number of days</span><strong>{days}</strong></div>
                <div className="calculation-row total"><span>Total</span><strong>{money(total)}</strong></div>
              </div>
              <button className="order-btn" type="submit" disabled={!valid}>Order Now</button>
              {!selectedCar && <p className="form-hint">Choose a car from the catalog to continue.</p>}
            </form>
          </div>
        </section>
      </main>

      {modalCar && (
        <div className="modal show" onClick={e => { if (e.target === e.currentTarget) setModalCar(null); }}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-label={`${modalCar.name} details`}>
            <button className="close" onClick={() => setModalCar(null)} aria-label="Close">×</button>
            <img src={modalCar.image} alt={modalCar.name} />
            <div className="modal-body">
              <h2>{modalCar.name}</h2>
              <p>{modalCar.description}</p>
              <div className="features">{modalCar.features.map(feature => <span className="feature" key={feature}>{feature}</span>)}</div>
              <h3 className="modal-price">{money(modalCar.price)} / day</h3>
              <button className="modal-select" onClick={() => chooseCar(modalCar)}>Select This Car</button>
            </div>
          </div>
        </div>
      )}

      {confirmation && (
        <div className="modal show" onClick={e => { if (e.target === e.currentTarget) setConfirmation(null); }}>
          <div className="confirmation-card" role="dialog" aria-modal="true" aria-label="Booking confirmation">
            <button className="close" onClick={() => setConfirmation(null)} aria-label="Close">×</button>
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Your car has been reserved. Here are your booking details:</p>
            <div className="confirmation-details">
              <p><strong>Customer:</strong> {confirmation.name}</p>
              <p><strong>Phone:</strong> {confirmation.phone}</p>
              <p><strong>Car:</strong> {confirmation.car}</p>
              <p><strong>Pickup:</strong> {confirmation.pickup}</p>
              <p><strong>Dates:</strong> {confirmation.startDate} to {confirmation.endDate}</p>
              <p><strong>Days:</strong> {confirmation.days}</p>
              <p><strong>Total:</strong> {money(confirmation.total)}</p>
            </div>
            <button className="modal-select" onClick={() => setConfirmation(null)}>Done</button>
          </div>
        </div>
      )}

      <footer id="contact">
        <h3>DriveNow Car Rentals</h3>
        <p>Affordable cars. Easy booking. Great journeys.</p>
        <p>© 2026 DriveNow. All rights reserved.</p>
      </footer>
    </>
  );
}
