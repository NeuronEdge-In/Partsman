import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 26, once = true, className, as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const stagger = { hidden: {}, show: { transition: { staggerChildren: .06 } } };
export const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [0.22, 1, 0.36, 1] } } };

export function StaggerGrid({ children, className }) {
  return (
    <motion.div className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
      {children}
    </motion.div>
  );
}
export const StaggerItem = ({ children, className, style }) => (
  <motion.div variants={item} className={className} style={style}>{children}</motion.div>
);
