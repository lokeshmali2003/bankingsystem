export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="card max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          At Banking System, we are committed to providing secure, innovative, and 
          customer-centric banking solutions. Our mission is to make banking accessible, 
          convenient, and transparent for everyone.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Security and Trust</li>
          <li>Innovation and Technology</li>
          <li>Customer First</li>
          <li>Transparency</li>
          <li>Integrity</li>
        </ul>
      </div>
    </div>
  )
}

