import { about } from '../../content/about'
import { profile } from '../../content/profile'

export default function AboutPhoto({ className = '' }) {
  return (
    <figure className={`lift relative mx-auto w-full border border-line bg-s1 p-2 backdrop-blur-sm ${className}`}>
      <img
        src={about.photo.src}
        alt={about.photo.alt}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0"
      />
      <figcaption className="mt-2 flex items-center justify-between font-mono text-[10px] text-dim">
        <span>{profile.name.toLowerCase()}</span>
        <span className="text-em">● online</span>
      </figcaption>
    </figure>
  )
}
