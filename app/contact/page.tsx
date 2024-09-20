
export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-8 text-center">Contattaci</h1>
      <p className="text-xl mb-8 text-center">Siamo qui per aiutarti! Compila il modulo sottostante o utilizza uno dei metodi di contatto elencati.</p>
      
      <form className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nome</label>
          <input type="text" id="name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Messaggio</label>
          <textarea id="message" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
        </div>
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300 w-full">Invia</button>
      </form>

      <div className="text-center mt-12 bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-black">Altri Metodi di Contatto</h2>
        <p className="text-xl mb-4 text-black">Puoi anche contattarci tramite:</p>
        <div className="space-x-4 text-xl">
          <a href="https://www.instagram.com/adm_sport_nutrition" className="text-black p-2 rounded-xl hover:bg-gray-100 hover:shadow-md">
            Instagram
          </a>
          <a href="mailto:info@adm.com" className="text-black p-2 rounded-xl hover:bg-gray-100 hover:shadow-md">
            Email: info@adm.com
          </a>
          <p className="text-black p-2 rounded-xl hover:bg-gray-100 hover:shadow-md">
            Telefono: +39 123 456 7890
          </p>
        </div>
      </div>
    </div>
  )
}



