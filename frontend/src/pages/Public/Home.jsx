import { Link } from 'react-router-dom'
import { FiShield, FiCreditCard, FiTrendingUp, FiClock } from 'react-icons/fi'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Banking System</h1>
          <p className="text-xl mb-8 text-primary-100">
            Secure, reliable, and convenient banking solutions for all your financial needs
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Get Started
            </Link>
            <Link to="/login" className="btn bg-primary-700 text-white hover:bg-primary-600">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <FiShield className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-600">
                Bank-level security with encryption and multi-factor authentication
              </p>
            </div>
            <div className="card text-center">
              <FiCreditCard className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Access</h3>
              <p className="text-gray-600">
                Manage your accounts and transactions from anywhere, anytime
              </p>
            </div>
            <div className="card text-center">
              <FiTrendingUp className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Grow Your Money</h3>
              <p className="text-gray-600">
                Competitive interest rates and investment opportunities
              </p>
            </div>
            <div className="card text-center">
              <FiClock className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support whenever you need help
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

