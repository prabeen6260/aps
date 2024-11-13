// import Hero from "@/components/Hero";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";


'use client'


import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { motion } from 'framer-motion'
import { SparklesCore } from '@/components/ui/sparkles'
import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { ContainerScroll } from "@/components/ui/container-scroll-animation";


const Navbar = () => {
 const [hasScrolled, setHasScrolled] = useState(false)
 const { isLoaded, isSignedIn, user } = useUser()


 useEffect(() => {
   const handleScroll = () => {
     if (window.scrollY > 0) {
       setHasScrolled(true)
     } else {
       setHasScrolled(false)
     }
   }


   window.addEventListener('scroll', handleScroll)


   return () => {
     window.removeEventListener('scroll', handleScroll)
   }
 }, [])


 return (
   <nav className={`font-ibm fixed top-0 w-full h-14 z-50 bg-charcoal ${hasScrolled ? 'shadow' : 'bg-transparent'}`}>
     <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
       <div className='flex justify-between items-center h-14'>
         <div className='flex flex-row space-x-5 items-center'>
           <Link href='/' className='flex flex-row items-center space-x-2 mr-5'>
             <Image src={'/signverse.png'} alt='logo' width={50} height={50} className='w-12 h-12' />
             <h1 className='text-milk text-2xl hidden md:flex'>SignVerse</h1>
           </Link>
           <Link href='/#products' className='hidden lg:flex'>
             <h1 className='text-subtext hover:scale-105 hover:bg-gray-200 rounded px-2 transition duration-300 hover:text-signverse'>Products</h1>
           </Link>
           <Link href='/#about' className='hidden lg:flex'>
             <h1 className='text-subtext hover:scale-105 hover:bg-gray-200 rounded px-2 transition duration-300 hover:text-signverse'>About Us</h1>
           </Link>
           <Link href='/#contact' className='hidden lg:flex'>
             <h1 className='text-subtext hover:scale-105 hover:bg-gray-200 rounded px-2 transition duration-300 hover:text-signverse'>Contact</h1>
           </Link>
         </div>
         <div className='hidden lg:flex space-x-4 font-ibm items-center'>
           <Link href={`${isSignedIn ? '/dashboard' : '/sign-up'}`}>
             <div className="bg-button px-3 py-1 rounded text-milk font-medium hover:scale-105 hover:bg-owl hover:text-milk transition duration-300 tracking-tight" >
               <SignedIn>Dashboard</SignedIn>
               <SignedOut>Sign Up / Login</SignedOut>
             </div>
           </Link>
           <SignedIn>
             <UserButton />
           </SignedIn>
         </div>
       </div>
     </div>
   </nav>
 )
}


const Section = React.forwardRef<HTMLDivElement, {
 id: string
 color?: string
 children: React.ReactNode
}>(({ id, color, children }, ref) => {
 const [{ offset }, set] = useSpring(() => ({ offset: 0 }))


 const calc = (o: number) => `translateY(${o * 0.1}px)`


 const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
   const el = e.currentTarget
   const scrollTop = el.scrollTop
   const windowHeight = window.innerHeight
   const elementTop = el.offsetTop
   set({ offset: scrollTop - elementTop + windowHeight / 2 })
 }


 return (
   <div
     ref={ref}
     id={id}
     className={`h-screen flex items-center justify-center snap-start ${color || ''}`}
     onScroll={onScroll}
   >
     <animated.div style={{ transform: offset.to(calc) }} className="w-full h-full">
       {children}
     </animated.div>
   </div>
 )
})


Section.displayName = 'Section'


const Hero = React.forwardRef<HTMLDivElement, { id: string }>((props, ref) => (
 <Section id={props.id} ref={ref}>
   <main className='w-full h-screen flex flex-col justify-center items-center'>
     <div className="w-full absolute inset-0 h-screen">
       <SparklesCore
         id="tsparticlesfullpage"
         background="transparent"
         minSize={0.6}
         maxSize={1.4}
         particleDensity={100}
         className="w-full h-full"
         particleColor="#FFFFFF"
       />
     </div>
     <motion.div
       initial={{ opacity: 0.0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{
         delay: 0.3,
         duration: 0.8,
         ease: "easeInOut",
       }}
       className="relative flex flex-col gap-4 items-center justify-center px-4"
     >
       <div className='flex flex-col z-20 items-center justify-center w-full h-full'>
         <h2 className='text-5xl mb-3 font-medium'>Welcome to</h2>
         <h1 className='text-9xl text-transparent bg-clip-text bg-gradient-to-r from-signverse to-[#CB6CE6] font-semibold tracking-widest'>
           SIGNVERSE
         </h1>
         <div className="w-[80rem] h-14 relative ml-20">
           <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-signverse to-transparent h-[2px] wfull4 blur-sm" />
           <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-signverse  to-transparent h-px w-full" />
           <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#CB6CE6] to-transparent h-[5px] w-1/2 blur-sm" />
           <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#CB6CE6] to-transparent h-px w-1/2" />
           <div className="absolute inset-0 w-full h-full bg-charcoal [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
         </div>
         <p className='text-subtext font-medium text-center text-lg'>
           SignVerse is your guide to the sign language universe. Instantly translate and transcribe ASL as you speak and watch.
           <br />
           Have conversations that matter with everyone. SignVerse breaks the sign-language barrier and connects everybody together.
         </p>
         <button className='text-xl bg-gradient-to-r from-signverse to-[#CB6CE6] hover:opacity-90 text-white font-medium px-4 py-2 rounded-lg mt-12'>
           Get Started
         </button>
       </div>
     </motion.div>
   </main>
 </Section>
))


Hero.displayName = 'Hero'


const ProductsSection = React.forwardRef<HTMLDivElement, { id: string }>((props, ref) => (
 <Section id={props.id} ref={ref}>
   <main className='w-full h-screen flex flex-col justify-center items-center'>
     <div className="w-full absolute inset-0 h-screen">
       <SparklesCore
         id="tsparticlesfullpage-products"
         background="transparent"
         minSize={0.6}
         maxSize={1.4}
         particleDensity={100}
         className="w-full h-full"
         particleColor="#FFFFFF"
       />
     </div>
     <motion.div
       initial={{ opacity: 0.0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{
         delay: 0.3,
         duration: 0.8,
         ease: "easeInOut",
       }}
       className="relative flex flex-col gap-4 items-center justify-center px-4"
     >
       <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-milk mb-7">
              Our AI Tutor Teaches You <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Sign Language
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/product.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
     </motion.div>
   </main>
 </Section>
))


ProductsSection.displayName = 'ProductsSection'


const AboutSection = React.forwardRef<HTMLDivElement, { id: string }>((props, ref) => (
 <Section id={props.id} ref={ref}>
   <main className='w-full h-screen flex flex-col justify-center items-center'>
     <div className="w-full absolute inset-0 h-screen">
       <SparklesCore
         id="tsparticlesfullpage-about"
         background="transparent"
         minSize={0.6}
         maxSize={1.4}
         particleDensity={100}
         className="w-full h-full"
         particleColor="#FFFFFF"
       />
     </div>
     <motion.div
       initial={{ opacity: 0.0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{
         delay: 0.3,
         duration: 0.8,
         ease: "easeInOut",
       }}
       className="relative flex flex-col gap-4 items-center justify-center px-4"
     >
       <div className='flex flex-col z-20 items-center justify-center w-full h-full'>
         <h2 className="text-6xl font-bold mb-4">About Us</h2>
         <p className="text-xl text-subtext text-center">
           We bridge the gap between Deaf people and Hearing people. We are here to help by providing a clear route through accessibility.
         </p>
         {/* Add more about your company here */}
       </div>
     </motion.div>
   </main>
 </Section>
))


AboutSection.displayName = 'AboutSection'


const ContactSection = React.forwardRef<HTMLDivElement, { id: string }>((props, ref) => (
 <Section id={props.id} ref={ref}>
   <main className='w-full h-screen flex flex-col justify-center items-center'>
     <div className="w-full absolute inset-0 h-screen">
       <SparklesCore
         id="tsparticlesfullpage-contact"
         background="transparent"
         minSize={0.6}
         maxSize={1.4}
         particleDensity={100}
         className="w-full h-full"
         particleColor="#FFFFFF"
       />
     </div>
     <motion.div
       initial={{ opacity: 0.0, y: 40 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{
         delay: 0.3,
         duration: 0.8,
         ease: "easeInOut",
       }}
       className="relative flex flex-col gap-4 items-center justify-center px-4"
     >
       <div className='flex flex-col z-20 items-center justify-center w-full h-full'>
         <h2 className="text-6xl font-bold mb-4">Contact Us</h2>
         <p className="text-xl text-subtext text-center">
           Get in touch with our team for support or inquiries
         </p>
         {"sp180@rice.edu; adarshb@umich.edu; sparshb@umich.edu; kudupudi@umich.edu"}
       </div>
     </motion.div>
   </main>
 </Section>
))


ContactSection.displayName = 'ContactSection'


const sections = [
 { id: 'home', title: 'Home', Component: Hero },
 { id: 'products', title: 'Products', Component: ProductsSection },
 { id: 'about', title: 'About', Component: AboutSection },
 { id: 'contact', title: 'Contact', Component: ContactSection },
]


export default function CustomSections() {
 const [activeSection, setActiveSection] = useState('home')
 const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})


 useEffect(() => {
   const observers = sections.map(section => {
     const observer = new IntersectionObserver(
       entries => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             setActiveSection(section.id)
           }
         })
       },
       { threshold: 0.5 }
     )


     if (sectionRefs.current[section.id]) {
       observer.observe(sectionRefs.current[section.id]!)
     }


     return observer
   })


   return () => {
     observers.forEach(observer => observer.disconnect())
   }
 }, [])


 const scrollTo = (id: string) => {
   sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' })
 }


 return (
   <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
     <Navbar />
     {sections.map(({ id, Component }) => (
       <Component
         key={id}
         id={id}
         ref={(el: HTMLDivElement | null) => {
           sectionRefs.current[id] = el;
         }}
       />
     ))}
   </div>
 )
}
// export default function Home() {
//   return (
//     <>
//     <Navbar />
//     <Hero />
//     </>
//   );
// }

