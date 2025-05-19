import { motion } from "framer-motion"

const ScrollReveal = ({ children, className, isFirst, isLast, ...props }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <motion.div
      initial={{ opacity: 0, y: isFirst ? 0 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={isMobile ? { opacity: 0.5, y: 20 } : { opacity: 0, y: 50 }}
      transition={{ duration: isMobile ? 0.6 : 0.8, ease: "easeOut" }}
      viewport={{
        once: false,
        amount: isMobile ? 0.1 : 0.2,
      }}
      className={`${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
