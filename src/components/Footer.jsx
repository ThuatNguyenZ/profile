import { Heart } from 'lucide-react'

const profile = {
  name: 'Nguyen Thien Thuat',
  title: 'Data Engineer',
  location: 'Ho Chi Minh City, Vietnam',
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg">{profile.name}</p>
            <p className="text-gray-400 text-sm">{profile.title}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {currentYear}</span>
            <span>•</span>
            <span>Built with</span>
            <Heart size={14} className="text-red-400" />
            <span>using React & Tailwind CSS</span>
          </div>

          <div className="text-gray-400 text-sm">
            {profile.location}
          </div>
        </div>
      </div>
    </footer>
  )
}
