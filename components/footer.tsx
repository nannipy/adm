import Link from 'next/link';



export default function Footer() {
  return (
    <footer className=" p-4 rounded-xl m-4 shadow-md z-auto">
      <div className="container mx-auto text-center">
        <p className="text-white text-lg">&copy; 2023 ADM Sport and Nutrition. Tutti i diritti riservati.</p>
        <div className="space-x-4 text-xl mt-4">
          <Link href="/privacy" className="text-white p-2 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white p-2 hover:underline">
            Termini e Condizioni
          </Link>
          <Link href="/contact" className="text-white p-2 hover:underline">
            Contattaci
          </Link>
        </div>
        <div className="space-x-4 text-xl mt-4">
          <a href="https://www.instagram.com/adm_sport_nutrition" className="text-white p-2 hover:underline">
            Instagram
          </a>
          <a href="mailto:info@adm.com" className="text-white p-2 hover:underline">
            Email: info@adm.com
          </a>
          <p className="text-white p-2 hover:underline">
            Telefono: +39 123 456 7890
          </p>
        </div>
      </div>
    </footer>
  )
}