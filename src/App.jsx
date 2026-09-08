import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Floating from './components/Floating.jsx';
import useScrollTop from './hooks/useScrollTop.js';
import Home from './pages/Home.jsx';
import Models from './pages/Models.jsx';
import ModelPage from './pages/ModelPage.jsx';
import Categories from './pages/Categories.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Policies from './pages/Policies.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const location = useLocation();
  useScrollTop();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28, ease: 'easeOut' }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<Models />} />
            <Route path="/model/:slug" element={<ModelPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Floating />
    </>
  );
}
