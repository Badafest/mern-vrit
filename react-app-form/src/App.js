// import logo from './logo.svg';
import "./App.css";

function App() {
  return (
    <div className="App">
      <form>
        <div className="input-title">1. User Information</div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="John"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="johndoe123"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="+977 9111111111"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Set a strong password."
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Retype your set password."
              required
            />
          </div>
        </div>
        <div className="input-title">2. Address</div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="USA"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="province">Province/State</label>
            <input
              type="text"
              name="province"
              id="province"
              placeholder="Florida"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="district">District/City</label>
            <input
              type="text"
              name="district"
              id="district"
              placeholder="Miami"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="105 Krome Ave"
              required
            />
          </div>
        </div>

        <div className="input-title">3. Optional Information</div>
        <div className="input-row">
          <div className="input-container">
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" defaultValue={"Other"}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Rather not say</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" />
          </div>
        </div>
        <div className="input-title">4. Final Steps</div>
        <div style={{ display: "flex", gap: "6px" }}>
          <input type="checkbox" id="agree" name="agree" required />
          <label htmlFor="agree">I agree to all terms and conditions.</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
