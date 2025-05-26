"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  Star,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  Target,
  Rocket,
  Crown,
  Sparkles,
  Quote,
  Play,
  Eye,
  ThumbsUp,
  Zap,
  Gift,
  DollarSign,
} from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"

// Hook personnalisé pour les dimensions de fenêtre
const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return dimensions
}

// Composant de particules animées SSR-safe
const AnimatedParticles = () => {
  const dimensions = useWindowDimensions()

  if (dimensions.width === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Composant de texte avec effet typewriter
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [currentIndex, text])

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-8 bg-yellow-400 ml-1"
      />
    </motion.span>
  )
}


const AnimatedCounter = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null) // Changé de HTMLDivElement à HTMLSpanElement
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          motionValue.set(end)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, isVisible, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      setCount(Math.floor(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref} className="inline-flex items-center">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Composant de carte 3D avec effet magnetic
const MagneticCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rotateXValue = (e.clientY - centerY) / 10
    const rotateYValue = (centerX - e.clientX) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  )
}

// Composant de révélation de texte
const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Composant de bouton morphing
const MorphingButton = ({ children, className = "", ...props }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden rounded-full"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
      <Button className={`relative z-10 ${className}`} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

const TestimonialSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const testimonials = [
  {
    type: "video",
    name: "Mohamed K.",
    result: "850K F CFA en 45 jours",
    text: "Au début j'étais sceptique, mais la méthode d'Adriel m'a permis de générer mes premiers 850K F CFA en seulement 45 jours ! La formation est claire et le support est exceptionnel.",
    thumbnail: "/exemple8.webp",
    videoUrl: "/exemple_video1.mov",
    isLocalVideo: true,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    type: "image",
    name: "Sarah M.",
    result: "1.2M F CFA en 3 mois",
    text: "Cette formation a changé ma vie ! J'ai quitté mon emploi de comptable et maintenant je gagne plus en un mois qu'avant en 6 mois. Le business digital est vraiment la solution.",
    image: "/exemple1.webp",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    type: "image",
    name: "Fatou D.",
    result: "2.1M F CFA en 4 mois",
    text: "Les produits digitaux sont une vraie mine d'or ! Grâce à Adriel, j'ai appris à les vendre efficacement. Maintenant je peux offrir une meilleure éducation à mes enfants.",
    image: "/exemple2.webp",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    type: "image",
    name: "Jean P.",
    result: "750K F CFA en 2 mois",
    text: "La formation est complète et le coaching personnalisé fait toute la différence. Adriel est toujours disponible pour répondre à nos questions. Un vrai mentor !",
    image: "/exemple3.webp",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    type: "image",
    name: "Aminata S.",
    result: "1.5M F CFA en 3 mois",
    text: "J'ai commencé sans aucune connaissance en business digital. Aujourd'hui, je gère mon business depuis chez moi et j'ai enfin la liberté financière dont je rêvais.",
    image: "/exemple5.webp",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    type: "image",
    name: "Omar B.",
    result: "950K F CFA en 2 mois",
    text: "Les tunnels de vente fournis sont vraiment efficaces. Dès le premier mois, j'ai vu des résultats concrets. Merci Adriel pour cette opportunité incroyable !",
    image: "/exemple6.webp",
    avatar: "/placeholder.svg?height=60&width=60",
  }
]
 return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100, rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.2,
            type: "spring",
            stiffness: 100,
          }}
          viewport={{ once: true }}
          className="group"
        >
          <MagneticCard>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-blue-400/50 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/20">
              <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
               {testimonial.type === "video" ? (
  <div className="relative">
    {!isPlaying ? (
      <>
        <Image
          src={testimonial.thumbnail || '/placeholder.svg'}
          alt={`Témoignage de ${testimonial.name}`}
          width={400}
          height={300}
          className="w-full object-cover rounded-t-lg"
          style={{ height: 'auto', aspectRatio: '16/9' }}
        />
        <motion.div
          className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setIsPlaying(true)}
        >
          <motion.div
            className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Play className="h-8 w-8 text-white ml-1" />
          </motion.div>
        </motion.div>
      </>
    ) : (
      <div className="relative aspect-video">
        {testimonial.isLocalVideo ? (
          <video
            autoPlay
            controls
            className="w-full h-full rounded-t-lg"
          >
            <source src={testimonial.videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        ) : (
          <iframe
            src={testimonial.videoUrl}
            title={`Témoignage de ${testimonial.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-t-lg"
          />
        )}
      </div>
    )}
  </div>
) : (
                  <div className="relative">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`Témoignage de ${testimonial.name}`}
                      width={400}
                      height={300}
                      className="w-full object-cover"
                      style={{ height: 'auto' }}
                    />
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Preuve
                      </Badge>
                    </motion.div>
                  </div>
                )}
              </motion.div>

              <CardContent className="p-6">
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                  </motion.div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{testimonial.name}</h4>
                    <motion.div
                      className="text-green-400 font-semibold"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      {testimonial.result}
                    </motion.div>
                    <motion.div
                      className="flex"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }}>
                  <Quote className="h-6 w-6 text-blue-300 mb-2" />
                </motion.div>
                <motion.p
                  className="text-white/90 italic"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  "{testimonial.text}"
                </motion.p>
              </CardContent>
            </Card>
          </MagneticCard>
        </motion.div>
      ))}
    </div>
  )
}
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/30 max-w-lg mx-auto"
      animate={{
        boxShadow: [
          "0 0 20px rgba(239, 68, 68, 0.3)",
          "0 0 40px rgba(239, 68, 68, 0.6)",
          "0 0 20px rgba(239, 68, 68, 0.3)",
        ],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    >
      <motion.h3
        className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        ⏰ L'offre expire dans :
      </motion.h3>

      <div className="flex justify-center space-x-2 sm:space-x-4">
        {[
          { value: timeLeft.days, label: "Jours" },
          { value: timeLeft.hours, label: "Heures" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Secondes" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            animate={{ scale: item.label === "Secondes" ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="bg-white/20 backdrop-blur-lg rounded-lg sm:rounded-xl p-2 sm:p-4 border border-white/30 min-w-[60px] sm:min-w-[80px]"
              animate={{
                backgroundColor:
                  (item.value <= 5 && item.label === "Minutes") || (item.value <= 1 && item.label === "Jours")
                    ? ["rgba(255, 255, 255, 0.2)", "rgba(239, 68, 68, 0.3)", "rgba(255, 255, 255, 0.2)"]
                    : "rgba(255, 255, 255, 0.2)",
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-2xl sm:text-4xl font-bold text-white">{item.value.toString().padStart(2, "0")}</div>
              <div className="text-xs sm:text-sm text-blue-200 font-semibold">{item.label}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-red-200 text-sm sm:text-base mt-3 sm:mt-4 font-semibold"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        🔥 Après ça, le prix remonte à 50 000 F CFA !
      </motion.p>
    </motion.div>
  )
}
export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const [isClient, setIsClient] = useState(false)
  const dimensions = useWindowDimensions()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800"
        />

        {/* Particules animées */}
        <AnimatedParticles />

        {/* Formes géométriques flottantes */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: typeof window !== "undefined" ? Math.random() * dimensions.width : 0,
                y: typeof window !== "undefined" ? Math.random() * dimensions.height : 0,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                x: typeof window !== "undefined" ? Math.random() * dimensions.width : 0,
                y: typeof window !== "undefined" ? Math.random() * dimensions.height : 0,
                rotate: 360,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div
                className={`w-${typeof window !== "undefined" ? Math.floor(Math.random() * 8) + 4 : 4} h-${typeof window !== "undefined" ? Math.floor(Math.random() * 8) + 4 : 4} bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 ${typeof window !== "undefined" && Math.random() > 0.5 ? "rounded-full" : "rounded-lg"}`}
              />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <motion.div whileHover={{ scale: 1.05, rotate: 2 }} transition={{ duration: 0.3 }}>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Crown className="h-5 w-5 mr-2" />
                    </motion.div>
                    Programme Exclusif de Vlad Digit Store
                  </Badge>
                </motion.div>

                <div className="space-y-4">
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <RevealText delay={0.8}>
                      <span className="block mb-2">MA LIBERTÉ</span>
                    </RevealText>
                    <RevealText delay={1.2}>
                      <span className="block mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        FINANCIÈRE
                      </span>
                    </RevealText>
                    <RevealText delay={1.6}>
                      <span className="block text-3xl md:text-4xl text-blue-200">
                        <TypewriterText text="en quelques mois" delay={2} />
                      </span>
                    </RevealText>
                  </motion.h1>
                </div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.p
                    className="text-lg sm:text-xl text-blue-100 leading-relaxed"
                    whileInView={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <strong className="text-yellow-400">
                      {" "}
                      Vous recherchez un moyen d'avoir des revenus supplémentaires chaque mois ?
                    </strong>
                  </motion.p>
                  <motion.p
                    className="text-base sm:text-lg text-blue-200 leading-relaxed"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    Je m'appelle <strong className="text-white">Adriel De-Vernard</strong>, et j'ai aidé plus de{" "}
                    <motion.strong
                      className="text-yellow-400"
                      whileInView={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      200 personnes
                    </motion.strong>{" "}
                    à transformer leur vie financière grâce aux produits digitaux.
                  </motion.p>
                  <motion.p
                    className="text-base sm:text-lg text-blue-200 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                  >
                    <strong className="text-white">Aujourd'hui, c'est votre tour.</strong>
                  </motion.p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                 <Button
  size="lg"
  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-xl font-bold group shadow-2xl"
  onClick={() => {
    const pricingSection = document.querySelector('#pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }}
>
  <span className="flex items-center justify-center">
    <span className="mr-2 sm:mr-3">SOUSCRIRE</span>
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
    >
      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
    </motion.div>
  </span>
</Button>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                   <Button
  variant="outline"
  size="lg"
  className="border-2 border-yellow-400 text-yellow-400 bg-yellow-400 text-blue-900 px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto"
  asChild
>
  <Link href="https://www.pay.moneyfusion.net/la-formation-sur-les-produits-digitaux-_1748206593770/">
    DÉCOUVRIR LE PROGRAMME
  </Link>
</Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                className="flex flex-wrap items-center gap-6 text-sm text-blue-200"
              >
                {[
                  { icon: Shield, text: "Garantie 30 jours" },
                  { icon: Users, text: "+200 élèves" },
                  { icon: Award, text: "Résultats prouvés" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 3.2 + index * 0.2, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <item.icon className="h-5 w-5 text-green-400 mr-2" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative"
            >
              <motion.div className="relative" whileHover={{ scale: 1.02, rotateY: 5 }} transition={{ duration: 0.5 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -inset-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-30"
                />

                <motion.div
                  className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-2 border border-white/20"
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                      src="/hero_photo.webp?height=500&width=600"
                      alt="Preuve de concept - Résultats d'Adriel De-Vernard"
                      width={600}
                      height={500}
                      className="w-full h-auto rounded-2xl object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-bold">
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                      </motion.div>
                      PREUVE RÉELLE
                    </Badge>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator animé */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer"
            whileHover={{ scale: 1.2, borderColor: "rgba(255, 255, 255, 0.8)" }}
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Section avec animations avancées */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-900 to-blue-800 relative overflow-hidden">
        {/* Background animé */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 40% 50%, #3b82f6 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              <RevealText>Vous reconnaissez-vous dans ces situations ?</RevealText>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Vous travaillez dur mais n'arrivez pas à joindre les deux bouts",
                description: "Malgré vos efforts, votre salaire ne suffit plus face à l'inflation croissante.",
                color: "from-red-500 to-pink-500",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Vous rêvez d'indépendance financière mais ne savez pas comment faire",
                description: "Vous voulez créer votre propre business mais vous ne savez pas par où commencer.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Vous avez essayé plusieurs méthodes sans succès",
                description: "Formations, livres, vidéos... Rien n'a fonctionné et vous commencez à perdre espoir.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Vous voulez sécuriser l'avenir de votre famille",
                description: "Vous cherchez une solution durable pour offrir une vie meilleure à vos proches.",
                color: "from-blue-500 to-purple-500",
              },
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <MagneticCard>
                  <motion.div
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-full relative overflow-hidden"
                    whileHover={{
                      borderColor: "rgba(255, 255, 255, 0.4)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {/* Effet de gradient animé au hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${problem.color} opacity-0 group-hover:opacity-10`}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex items-start space-x-4 relative z-10">
                      <motion.div
                        className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 flex-shrink-0"
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                          backgroundColor: "rgba(239, 68, 68, 0.3)",
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {problem.icon}
                      </motion.div>
                      <div>
                        <motion.h3
                          className="text-lg sm:text-xl font-bold text-white mb-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {problem.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm sm:text-base text-blue-200"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {problem.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.p
              className="text-2xl text-white font-semibold mb-8"
              whileInView={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <strong className="text-yellow-400">Bonne nouvelle :</strong> Il existe une solution qui fonctionne
              vraiment !
            </motion.p>
<Button 
  size="lg" 
  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold"
  onClick={() => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }}
>
  DÉCOUVRIR LA SOLUTION
</Button>
          </motion.div>
        </div>
      </section>

      {/* Solution Section avec effets 3D */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-800 to-blue-900 relative overflow-hidden">
        {/* Particules de fond */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-6 text-lg px-6 py-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                </motion.div>
                La Solution Qui Change Tout
              </Badge>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <RevealText delay={0.3}>Votre arsenal digital pour la liberté financière</RevealText>
            </motion.h2>

            <motion.p
              className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <strong className="text-white">Imaginez pouvoir vendre des produits digitaux</strong> sans avoir à les
              créer, avec des tunnels de vente qui convertissent automatiquement, et un accompagnement personnalisé pour
              garantir votre succès.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "250+ Produits Digitaux Prêts",
                count: "250+",
                description: "Formations, cours, contenus éducatifs... Tout est prêt à vendre !",
                image: "/produit.jpeg?height=200&width=300",
                value: "Valeur : 50 000 F CFA",
                gradient: "from-purple-500 to-pink-500",
                icon: <Gift className="h-6 w-6" />,
              },
              {
                title: "115 Tunnels de Vente Optimisés",
                count: "115",
                description: "Des pages qui convertissent à plus de 15% (3x la moyenne du marché)",
                image: "/tunnel.jpeg?height=200&width=300",
                value: "Valeur : 75 000 F CFA",
                gradient: "from-blue-500 to-cyan-500",
                icon: <TrendingUp className="h-6 w-6" />,
              },
              {
                title: "159 Prompts IA Puissants",
                count: "159",
                description: "Automatisez votre marketing et votre service client avec l'IA",
                image: "/prompt.jpeg",
                value: "Valeur : 25 000 F CFA",
                gradient: "from-green-500 to-emerald-500",
                icon: <Zap className="h-6 w-6" />,
              },
              {
                title: "Formation Complète",
                count: "∞",
                description: "Apprenez étape par étape comment tout mettre en place",
                image: "/formation.jpeg?height=200&width=300",
                value: "Valeur : 100 000 F CFA",
                gradient: "from-orange-500 to-red-500",
                icon: <Award className="h-6 w-6" />,
              },
              {
                title: "Coaching Personnalisé",
                count: "1:1",
                description: "Je vous accompagne personnellement vers le succès",
                image: "/coaching.jpg?height=200&width=300",
                value: "Valeur : 150 000 F CFA",
                gradient: "from-indigo-500 to-purple-500",
                icon: <Users className="h-6 w-6" />,
              },
              {
                title: "Droits de Revente 100%",
                count: "100%",
                description: "Revendez tout et gardez 100% des bénéfices à vie !",
                image: "/revente.webp?height=200&width=300",
                value: "Valeur : INESTIMABLE",
                gradient: "from-yellow-500 to-orange-500",
                icon: <DollarSign className="h-6 w-6" />,
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="group"
              >
                <MagneticCard className="h-full">
                  <motion.div
                    whileHover={{
                      y: -15,
                      scale: 1.03,
                      rotateY: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-white/40 transition-all duration-500 overflow-hidden h-full group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                      <div className="relative overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>
                      

                        {/* Icône flottante */}
                        <motion.div
                          className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                        >
                          {product.icon}
                        </motion.div>

                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ scale: 0, x: 50 }}
                          whileInView={{ scale: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Badge className="bg-white/20 text-white border-white/30 font-bold text-lg">
                            {product.count}
                          </Badge>
                        </motion.div>

                        <motion.div
                          className="absolute bottom-4 left-4"
                          initial={{ scale: 0, y: 50 }}
                          whileInView={{ scale: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge className="bg-green-500 text-white font-bold">{product.value}</Badge>
                        </motion.div>
                      </div>

                      <CardHeader>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <CardTitle className="text-lg sm:text-xl text-white group-hover:text-blue-300 transition-colors">
                            {product.title}
                          </CardTitle>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <CardDescription className="text-sm sm:text-base text-blue-200 leading-relaxed">
                            {product.description}
                          </CardDescription>
                        </motion.div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-500/30 relative overflow-hidden"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Effet de brillance animé */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />

              <motion.h3
                className="text-3xl font-bold text-white mb-4"
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ALORS PROFITEZ DÈS MAINTENANT DE CETTE OFFRE EXCLUSIVE !
              </motion.h3>
              <motion.div
                className="text-2xl text-gray-300  mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Pour seulement
              </motion.div>
              <motion.div
                className="text-5xl font-bold text-green-400 mb-4"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <AnimatedCounter end={15000} suffix=" F CFA" />
              </motion.div>
              <motion.p
                className="text-xl text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <strong>Valable uniquement</strong> pour les 20 premiers inscrits !
              </motion.p>
              <MorphingButton 
  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold cursor-pointer"
  asChild
>
  <Link 
    href="https://www.pay.moneyfusion.net/les-deux-_1748206822020/"
    className="flex items-center justify-center"
  >
    JE SOUSCRIS
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
    >
      <ArrowRight className="h-5 w-5 ml-2" />
    </motion.div>
  </Link>
</MorphingButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section avec animations 3D */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-900 to-blue-800 relative overflow-hidden">
        {/* Background animé avec formes géométriques */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mb-6 text-lg px-6 py-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Star className="h-5 w-5 mr-2" />
                </motion.div>
                Témoignages Authentiques
              </Badge>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <RevealText delay={0.3}>Ils ont transformé leur vie avec moi</RevealText>
            </motion.h2>

            <motion.p
              className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <strong className="text-white">Ces personnes étaient exactement comme vous</strong> avant de découvrir le
              programme "Ma Liberté Financière". Aujourd'hui, elles ont atteints l'indépendance financière.
            </motion.p>
          </motion.div>

          <TestimonialSection />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 relative overflow-hidden"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              />

              <motion.h3
                className="text-3xl font-bold text-white mb-6"
                whileInView={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Vous aussi, vous pouvez obtenir ces résultats !
              </motion.h3>
              <motion.p
                className="text-xl text-blue-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Rejoignez les{" "}
                <motion.strong
                  className="text-yellow-400"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <AnimatedCounter end={200} suffix="+ personnes" />
                </motion.strong>{" "}
                qui ont déjà changé leur vie grâce à mon programme.
              </motion.p>
             <MorphingButton 
  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold cursor-pointer"
  asChild
>
  <Link 
    href="https://www.pay.moneyfusion.net/les-deux-_1748206822020/"
    className="flex items-center justify-center"
  >
    JE SOUSCRIS
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
    >
      <ArrowRight className="h-5 w-5 ml-2" />
    </motion.div>
  </Link>
</MorphingButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

{/* Pricing Section avec effets 3D avancés */}
<section id="pricing" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-800 to-blue-900 relative overflow-hidden">        {/* Particules de fond premium */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-30" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6 text-lg px-6 py-3">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Crown className="h-5 w-5 mr-2" />
                </motion.div>
                Offre Spéciale Limitée
              </Badge>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <RevealText delay={0.3}>Choisissez votre chemin vers la liberté</RevealText>
            </motion.h2>

            <motion.p
              className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <strong className="text-white">Attention :</strong> Cette offre exceptionnelle est limitée aux 20 premiers
              inscrits. Après, les prix reviendront à leur valeur normale.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Formation */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <MagneticCard className="h-full">
                <motion.div
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-blue-400/50 transition-all duration-500 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="text-center relative z-10 pb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Award className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl text-white mb-4">Formation Seule</CardTitle>
                      <div className="space-y-2">
                        <motion.div
                          className="text-lg text-gray-400 line-through"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          25 000 F CFA
                        </motion.div>
                        <motion.div
                          className="text-3xl sm:text-4xl font-bold text-blue-400"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                          <AnimatedCounter end={10000} suffix=" F" />
                        </motion.div>
                        <motion.div
                          className="text-green-400 font-semibold"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          Économisez 15 000 F
                        </motion.div>
                      </div>
                      <CardDescription className="text-blue-200 mt-4">
                        Parfait pour commencer votre transformation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <ul className="space-y-4 mb-8">
                        {[
                          "250+ produits digitaux prêts",
                          "115 tunnels de vente optimisés",
                          "Formation complète étape par étape",
                          "Accès à vie aux mises à jour",
                          "Support par email",
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center text-sm sm:text-base text-blue-200"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                              <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                            </motion.div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                     <MorphingButton 
  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 text-lg font-semibold"
  asChild
>
  <Link href="https://www.pay.moneyfusion.net/la-formation-sur-les-produits-digitaux-_1748206593770/">
    Commencer maintenant
  </Link>
</MorphingButton>
                    </CardContent>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>

            {/* Coaching */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <MagneticCard className="h-full">
                <motion.div
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:border-orange-400/50 transition-all duration-500 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="text-center relative z-10 pb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Users className="h-8 w-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl text-white mb-4">Coaching Seul</CardTitle>
                      <div className="space-y-2">
                        <motion.div
                          className="text-lg text-gray-400 line-through"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          25 000 F CFA
                        </motion.div>
                        <motion.div
                          className="text-3xl sm:text-4xl font-bold text-orange-400"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                          <AnimatedCounter end={10000} suffix=" F" />
                        </motion.div>
                        <motion.div
                          className="text-green-400 font-semibold"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          Économisez 15 000 F
                        </motion.div>
                      </div>
                      <CardDescription className="text-blue-200 mt-4">
                        Accompagnement personnalisé avec Adriel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <ul className="space-y-4 mb-8">
                        {[
                          "Séances de coaching 1:1 avec Adriel",
                          "Plan d'action personnalisé",
                          "Suivi hebdomadaire de vos progrès",
                          "Support prioritaire 24/7",
                          "Garantie de résultats ou remboursé",
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center text-sm sm:text-base text-blue-200"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                              <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                            </motion.div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <MorphingButton 
  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg font-semibold"
  asChild
>
  <Link href="https://www.pay.moneyfusion.net/coaching-sur-les-produits-digitaux-_1748206693121/">
    Réserver mon coaching
  </Link>
</MorphingButton>
                    </CardContent>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>

            {/* Pack Complet */}
            <motion.div
              initial={{ opacity: 0, y: 100, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur opacity-75 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <MagneticCard className="h-full">
                <motion.div
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="relative bg-blue-900/90 backdrop-blur-lg border-yellow-400/50 h-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-8 py-3 text-lg font-bold">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Crown className="h-5 w-5 mr-2" />
                        </motion.div>
                        CHOIX N°1 - MEILLEURE VALEUR
                      </Badge>
                    </motion.div>

                    <CardHeader className="text-center pt-16 pb-8">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        animate={{ y: [0, -5, 0] }}
                        style={{ animationDuration: "3s", animationIterationCount: "infinite" }}
                      >
                        <Sparkles className="h-10 w-10 text-blue-900" />
                      </motion.div>
                      <CardTitle className="text-3xl text-white mb-4">Pack Liberté Totale</CardTitle>
                      <div className="space-y-2">
                        <motion.div
                          className="text-xl text-gray-400 line-through"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          50 000 F CFA
                        </motion.div>
                        <motion.div
                          className="text-5xl font-bold text-yellow-400"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        >
                          <AnimatedCounter end={15000} suffix=" F" />
                        </motion.div>
                        <motion.div
                          className="text-green-400 font-bold text-xl"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          Économisez 35 000 F !
                        </motion.div>
                      </div>
                      <CardDescription className="text-blue-200 mt-4 text-lg">
                        Formation + Coaching = Succès Garanti
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-8">
                      <motion.div
                        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 mb-6 border border-green-500/30"
                        whileHover={{ scale: 1.02, borderColor: "rgba(34, 197, 94, 0.5)" }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-center text-white font-semibold">
                          🎁 <strong>BONUS EXCLUSIF :</strong> Accès VIP à la communauté privée d'Adriel (Valeur : 10
                          000 F)
                        </p>
                      </motion.div>

                      <ul className="space-y-4 mb-8">
                        {[
                          "TOUT de la formation complète",
                          "Coaching personnalisé avec Adriel",
                          "Accès VIP à la communauté privée",
                          "Support prioritaire 24/7",
                          "Garantie de résultats ou remboursé",
                          "Mises à jour à vie gratuites",
                          "Bonus exclusifs réservés aux VIP",
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center text-white"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <motion.div whileHover={{ scale: 1.3, rotate: 360 }} transition={{ duration: 0.3 }}>
                              <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                            </motion.div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                     <MorphingButton 
  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-blue-900 text-xl py-6 font-bold group mb-4"
  asChild
>
  <Link href="https://www.pay.moneyfusion.net/les-deux-_1748206822020/">
    LIBERTÉ TOTALE
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
    >
      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
    </motion.div>
  </Link>
</MorphingButton>

                      <motion.div
                        className="text-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="text-sm text-yellow-300 font-semibold">
                          ⚡ Plus que <AnimatedCounter end={20} /> places disponibles à ce prix !
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </MagneticCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(239, 68, 68, 0.5)",
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-xl text-white font-bold"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                ⏰ <strong className="text-red-400">ATTENTION :</strong> Cette offre expire dans{" "}
                <motion.span
                  className="text-yellow-400 text-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <AnimatedCounter end={20} /> places
                </motion.span>{" "}
                à ce prix exceptionnel !
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section avec animations fluides */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <RevealText>Vos dernières questions avant de commencer</RevealText>
            </motion.h2>
            <motion.p
              className="text-xl text-blue-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Adriel répond aux questions les plus fréquentes de ses futurs élèves
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Est-ce que je peux vraiment gagner autant d'argent si vite ?",
                  answer:
                    "Absolument ! Mes élèves atteignent en moyenne 850 000 F CFA dès le premier mois. Avec les bons outils et mon accompagnement, c'est non seulement possible, mais probable. Sarah a même dépassé 1,2 million en 3 mois !",
                },
                {
                  question: "Je n'ai aucune expérience en business digital, est-ce que ça va marcher pour moi ?",
                  answer:
                    "C'est exactement pour les débutants que j'ai créé ce programme ! 90% de mes élèves n'avaient aucune expérience avant de commencer. Je vous prends par la main et vous guide étape par étape jusqu'au succès.",
                },
                {
                  question: "Combien de temps dois-je y consacrer par jour ?",
                  answer:
                    "Seulement 2-3 heures par jour suffisent pour obtenir des résultats extraordinaires. Beaucoup de mes élèves travaillent encore à temps plein et arrivent quand même à générer des revenus substantiels.",
                },
                {
                  question: "Et si ça ne marche pas pour moi ?",
                  answer:
                    "Impossible ! J'ai une garantie satisfait ou remboursé de 30 jours. Si vous suivez mes instructions et que vous n'obtenez pas de résultats, je vous rembourse intégralement.",
                },
                {
                  question: "Pourquoi proposez-vous un prix si bas pour autant de valeur ?",
                  answer:
                    "Parce que mon objectif est d'aider le maximum de personnes à atteindre leur liberté financière. Je préfère avoir beaucoup d'élèves qui réussissent plutôt que quelques-uns qui paient très cher. C'est ma mission de vie !",
                },
                 {
                    question: "Aura t-il des frais cachés ?",
                    answer: "Absolument pas ! Le prix que vous voyez est le prix final. Tout est inclus : la formation, les produits digitaux, les tunnels de vente, les prompts IA, le coaching et même l'accès à vie aux mises à jour. C'est pour cela que j'insiste tant sur cette offre limitée - elle inclut vraiment TOUT.",
                  },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl px-6 hover:border-white/40 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left text-white hover:text-blue-300 text-base sm:text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200 text-sm sm:text-base leading-relaxed pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section avec effets premium */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 relative overflow-hidden"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Effet de brillance animé */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Shield className="h-12 w-12 text-white" />
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Ma garantie personnelle à 100%
              </motion.h2>

              <motion.div
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-green-500/30 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg sm:text-xl text-white leading-relaxed">
                  <strong className="text-green-400">"Moi, Adriel De-Vernard, vous garantis personnellement</strong> que
                  si vous suivez mes instructions pendant 30 jours et que vous n'obtenez pas de résultats concrets, je
                  vous rembourse intégralement le prix de votre achat.{" "}
                  <strong className="text-green-400">C'est ma politique de vente."</strong>
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 text-lg mb-8">
                {[
                  { icon: CheckCircle, title: "Remboursement intégral", subtitle: "Sans condition" },
                  { icon: Clock, title: "30 jours pour tester", subtitle: "Largement suffisant" },
                  { icon: Shield, title: "Zéro risque", subtitle: "Garantie totale" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <item.icon className="h-8 w-8 text-green-400 mb-3" />
                    </motion.div>
                    <span className="text-white font-semibold">{item.title}</span>
                    <span className="text-blue-200 text-sm">{item.subtitle}</span>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-lg sm:text-xl text-blue-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
              >
                Vous n'avez littéralement <strong className="text-white">aucun risque</strong> à essayer. Le seul
                risque, c'est de rater cette opportunité !
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA avec timer et effets spectaculaires */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 relative overflow-hidden">
        {/* Background animé complexe */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, Math.random() * 300 - 150],
                y: [0, Math.random() * 300 - 150],
                scale: [0, 1, 0],
                rotate: [0, 360],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-1 sm:w-2 h-1 sm:h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Effet de vagues animées */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"
            animate={{
              x: [-100, window.innerWidth + 100],
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Badge avec pulsation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                    "0 0 40px rgba(251, 191, 36, 0.8)",
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Rocket className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  </motion.div>
                  DERNIÈRE CHANCE
                </Badge>
              </motion.div>
            </motion.div>

            {/* Titre principal avec effet de révélation */}
            <motion.h2
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <RevealText delay={0.3}>
                <span className="block mb-2">Votre liberté financière</span>
              </RevealText>
              <RevealText delay={0.7}>
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  commence maintenant
                </span>
              </RevealText>
            </motion.h2>

            {/* Timer de compte à rebours */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <CountdownTimer />
            </motion.div>

            {/* Message d'urgence */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-blue-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <strong className="text-white">Dans 3 mois, vous serez soit :</strong>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> ✅ Financièrement libre grâce au programme d'Adriel</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> ❌ Toujours dans la même situation qu'aujourd'hui</span>
              <br />
              <br />
              <motion.strong
                className="text-yellow-400 text-xl sm:text-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Le choix vous appartient.
              </motion.strong>
            </motion.p>

            {/* Récapitulatif des prix amélioré */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 mb-8 sm:mb-12 max-w-2xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />

              <motion.div
                className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                🎯 Récapitulatif de votre investissement
              </motion.div>

              <div className="space-y-3 sm:space-y-4 text-lg sm:text-xl relative z-10">
                {[
                  { label: "Formation complète", price: "25 000 F", icon: "📚" },
                  { label: "Coaching personnalisé", price: "25 000 F", icon: "👨‍🏫" },
                  { label: "Bonus VIP", price: "10 000 F", icon: "🎁" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center text-blue-200 bg-white/5 rounded-lg p-3 sm:p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <span className="flex items-center">
                      <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">{item.icon}</span>
                      <span className="text-sm sm:text-lg">{item.label}</span>
                    </span>
                    <span className="line-through text-red-300 font-semibold">{item.price}</span>
                  </motion.div>
                ))}

                <motion.div
                  className="border-t border-white/20 pt-4 sm:pt-6 flex justify-between items-center text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 sm:p-6"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                >
                  <span className="text-white flex items-center">
                    <span className="mr-2 sm:mr-3 text-2xl sm:text-3xl">💰</span>
                    <span className="text-lg sm:text-2xl">Total aujourd'hui :</span>
                  </span>
                  <motion.span
                    className="text-green-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AnimatedCounter end={15000} suffix=" F CFA" />
                  </motion.span>
                </motion.div>

                <motion.div
                  className="text-center text-green-400 font-bold text-lg sm:text-xl bg-green-500/20 rounded-lg p-3 sm:p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  style={{ animationDuration: "2s", animationIterationCount: "infinite" }}
                >
                  🎉 Vous économisez 45 000 F CFA !
                </motion.div>
              </div>
            </motion.div>

            {/* Bouton principal avec effets spectaculaires */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                {/* Effet de halo animé */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-lg opacity-70"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

               <Button
  size="lg"
  className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 font-bold group shadow-2xl w-full max-w-3xl mx-auto"
  asChild
>
  <Link 
    href="https://www.pay.moneyfusion.net/les-deux-_1748206822020/"
    className="flex items-center justify-center"
  >
    <span className="text-center leading-tight text-sm sm:text-base lg:text-xl">
      MA LIBERTÉ FINANCIÈRE MAINTENANT
    </span>
    <motion.div
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      className="ml-2 sm:ml-4 flex-shrink-0"
    >
      <Rocket className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
    </motion.div>
  </Link>
</Button>
              </motion.div>
            </motion.div>

            {/* Garanties et avantages */}
            <motion.div
              className="text-blue-300 space-y-2 sm:space-y-3 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {[
                { icon: "⚡", text: "Accès immédiat après paiement" },
                { icon: "🛡️", text: "Garantie satisfait ou remboursé 30 jours" },
                { icon: "🎯", text: "Support premium inclus" },
              ].map((item, index) => (
                <motion.p
                  key={index}
                  className="text-base sm:text-lg flex items-center justify-center sm:justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <span className="mr-2 sm:mr-3 text-lg sm:text-xl">{item.icon}</span>
                  {item.text}
                </motion.p>
              ))}
            </motion.div>

            {/* Alerte d'urgence finale */}
            <motion.div
              className="bg-red-500/20 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              viewport={{ once: true }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 40px rgba(239, 68, 68, 0.5)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ],
              }}
              style={{ animationDuration: "2s", animationIterationCount: "infinite" }}
            >
              {/* Effet de sirène */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className="relative z-10"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center justify-center mb-2 sm:mb-3">
                  <motion.span
                    className="text-2xl sm:text-3xl mr-2 sm:mr-3"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🚨
                  </motion.span>
                  <span className="text-lg sm:text-xl font-bold text-red-400">ALERTE URGENCE</span>
                  <motion.span
                    className="text-2xl sm:text-3xl ml-2 sm:ml-3"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    🚨
                  </motion.span>
                </div>

                <p className="text-lg sm:text-xl text-white font-bold">
                  Il ne reste que{" "}
                  <motion.span
                    className="text-yellow-400 text-xl sm:text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AnimatedCounter end={20} /> places
                  </motion.span>{" "}
                  à ce prix exceptionnel !
                </p>

                <motion.p
                  className="text-sm sm:text-base text-red-200 mt-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ⏰ L'offre expire automatiquement dans quelques heures
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Témoignages rapides en bas */}
            <motion.div
              className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              viewport={{ once: true }}
            >
              {[
                { name: "Sarah M.", result: "1.2M F CFA", time: "3 mois" },
                { name: "Mohamed K.", result: "850K F CFA", time: "45 jours" },
                { name: "Fatou D.", result: "2.1M F CFA", time: "4 mois" },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-white/20 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.4)" }}
                >
                  <div className="text-lg sm:text-xl font-bold text-white">{testimonial.name}</div>
                  <div className="text-green-400 font-semibold text-sm sm:text-base">{testimonial.result}</div>
                  <div className="text-blue-200 text-xs sm:text-sm">en {testimonial.time}</div>
                  <div className="flex justify-center mt-1 sm:mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
