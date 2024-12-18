const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-secondary mb-6">Contact Shop African Brand</h1>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;