function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block animate-fade-in-down">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 animate-bounce-slow">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-3xl md:text-4xl font-bold text-white">B</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in-up">
            Banking System
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in-up-delay">
            Your trusted financial partner for secure banking, seamless transactions, and financial freedom
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 animate-fade-in-up-delay-2">
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-lg hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-lg hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-12">
        <div className="flex flex-col gap-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in">
              <div className="text-5xl mb-4 animate-pulse-slow">💰</div>
              <h3 className="text-gray-800 mb-2 text-xl font-semibold">Account Overview</h3>
              <p className="text-gray-600 leading-relaxed">View your account balance and transaction history</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in-delay">
              <div className="text-5xl mb-4 animate-pulse-slow">💸</div>
              <h3 className="text-gray-800 mb-2 text-xl font-semibold">Transfer Money</h3>
              <p className="text-gray-600 leading-relaxed">Send money securely to other accounts</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in-delay-2">
              <div className="text-5xl mb-4 animate-pulse-slow">📊</div>
              <h3 className="text-gray-800 mb-2 text-xl font-semibold">Transactions</h3>
              <p className="text-gray-600 leading-relaxed">Track all your financial activities</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in-delay-3">
              <div className="text-5xl mb-4 animate-pulse-slow">🔒</div>
              <h3 className="text-gray-800 mb-2 text-xl font-semibold">Security</h3>
              <p className="text-gray-600 leading-relaxed">Bank-level encryption and security</p>
            </div>
          </section>

          {/* Services Overview */}
          <section className="mb-8">
            <div className="text-center mb-10 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">Our Services</h2>
              <p className="text-gray-600 text-lg">Comprehensive banking solutions tailored to your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Savings Service */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-slide-in-left">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-pulse-slow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Savings</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Grow your wealth with competitive interest rates. Secure your future with our flexible savings accounts designed for your goals.
                </p>
                <ul className="text-gray-600 space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Competitive interest rates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Flexible withdrawal options
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No monthly fees
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105">
                  Open Savings Account
                </button>
              </div>

              {/* Loans Service */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-slide-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-pulse-slow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Loans</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Achieve your dreams with our flexible loan options. From personal loans to mortgages, we've got you covered.
                </p>
                <ul className="text-gray-600 space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Low interest rates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Quick approval process
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Flexible repayment terms
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105">
                  Apply for Loan
                </button>
              </div>

              {/* Cards Service */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-slide-in-right">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg animate-pulse-slow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Cards</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  Experience the convenience of our debit and credit cards with advanced security features and worldwide acceptance.
                </p>
                <ul className="text-gray-600 space-y-2 mb-6 text-sm">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Contactless payments
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Zero fraud liability
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Global acceptance
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105">
                  Get a Card
                </button>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-8">
            <div className="text-center mb-10 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">Why Choose Us</h2>
              <p className="text-gray-600 text-lg">Experience banking that puts you first</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Security */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Bank-Level Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data and transactions are protected with industry-leading encryption and multi-factor authentication.
                </p>
              </div>

              {/* 24/7 Support */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in-delay">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">24/7 Customer Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our dedicated support team is available round the clock to assist you with any queries or concerns.
                </p>
              </div>

              {/* Easy & Fast */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in-delay-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast & Easy Transactions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete your banking tasks in seconds with our intuitive interface and lightning-fast processing.
                </p>
              </div>

              {/* Competitive Rates */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-fade-in-delay-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Competitive Rates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enjoy the best interest rates on savings accounts and the lowest rates on loans in the market.
                </p>
              </div>

              {/* Mobile Banking */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-slide-in-left">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Mobile Banking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Manage your finances on the go with our feature-rich mobile app available on all platforms.
                </p>
              </div>

              {/* Trusted */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 animate-slide-in-right">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Trusted by Millions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join millions of satisfied customers who trust us with their financial needs every day.
                </p>
              </div>
            </div>
          </section>

          {/* Security Highlights Section */}
          <section className="mb-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 border border-blue-100">
            <div className="text-center mb-10 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">Security Highlights</h2>
              <p className="text-gray-600 text-lg">Your security is our top priority</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Encryption */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">256-bit SSL Encryption</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      All your data is protected with military-grade encryption ensuring your information remains secure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-fade-in-delay">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Add an extra layer of security with 2FA to protect your account from unauthorized access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fraud Detection */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-fade-in-delay-2">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Fraud Detection</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Advanced AI-powered systems monitor transactions 24/7 to detect and prevent fraudulent activities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure Servers */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-fade-in-delay-3">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Data Centers</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Your data is stored in highly secure, ISO-certified data centers with redundant backup systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Biometric Authentication */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-slide-in-left">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Biometric Authentication</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Use fingerprint or face recognition for quick and secure access to your banking account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Regular Audits */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-slide-in-right">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Regular Security Audits</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our systems undergo regular security audits and penetration testing by independent experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-10 text-center animate-fade-in-up-delay-2">
              <div className="inline-flex items-center space-x-3 bg-white px-6 py-4 rounded-xl shadow-md border border-gray-100">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">ISO 27001 Certified</p>
                  <p className="text-xs text-gray-600">Bank-level security standards</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in-up">
            <h2 className="text-gray-800 mb-6 text-center text-3xl font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 active:translate-y-0">
                View Balance
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 active:translate-y-0">
                Transfer Funds
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 active:translate-y-0">
                Transaction History
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 active:translate-y-0">
                Settings
              </button>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative animate-fade-in-up">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and experience banking made simple, secure, and convenient.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg md:text-xl w-full sm:w-auto">
                  Open Account
                </button>
                <button className="px-8 md:px-10 py-4 md:py-5 bg-transparent text-white border-2 border-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-lg md:text-xl w-full sm:w-auto">
                  Login
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap justify-center items-center gap-6 md:gap-8 text-white/90">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base">No Hidden Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base">Quick Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base">24/7 Support</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home

