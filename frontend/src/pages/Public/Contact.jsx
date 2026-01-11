export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">support@bankingsystem.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-600">1-800-BANKING</p>
            </div>
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-gray-600">
                123 Banking Street<br />
                Financial District, NY 10004
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
          <div className="space-y-2 text-gray-700">
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

