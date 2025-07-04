"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryHomepage() {
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Products data
  const products = [
    { id: 1, name: "Premium Watch", price: "$1,250" },
    { id: 2, name: "Designer Handbag", price: "$2,300" },
    { id: 3, name: "Luxury Sunglasses", price: "$850" },
    { id: 4, name: "Signature Perfume", price: "$450" },
  ];
  
  // FAQ data
  const faqs = [
    { 
      id: 1, 
      question: "What is your return policy?", 
      answer: "We offer a 30-day return policy on all unworn and undamaged items with original packaging." 
    },
    { 
      id: 2, 
      question: "Do you offer international shipping?", 
      answer: "Yes, we ship worldwide with express delivery options available for all destinations." 
    },
    { 
      id: 3, 
      question: "How can I track my order?", 
      answer: "Once your order ships, you'll receive a tracking number via email to monitor your delivery." 
    },
    { 
      id: 4, 
      question: "Are your products sustainably sourced?", 
      answer: "Absolutely. We're committed to ethical sourcing and sustainable practices across our supply chain." 
    },
  ];

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const productsRef = useRef(null);
  const containerRef = useRef(null);

  // Page load animation
  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  // Page reveal animation after loading
  useEffect(() => {
    if (!loading && containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "expo.out",
          onComplete: () => {
            if (textRef.current) {
              const words = textRef.current.querySelectorAll('.word');
              gsap.fromTo(words, 
                { opacity: 0.3, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.05,
                  duration: 0.8,
                  scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                  }
                }
              );
            }
          }
        }
      );
    }
  }, [loading]);

  // FAQ toggle handler
  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // Product carousel navigation
  const scrollProducts = (direction) => {
    if (productsRef.current) {
      const container = productsRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      gsap.to(container, {
        scrollLeft: container.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount),
        duration: 0.8,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Loading screen */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-24 h-24 border-t-2 border-gold rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main content */}
      <div 
        ref={containerRef} 
        className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
      >
        {/* Hero section */}
        <section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-200/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-serif font-light mb-6 tracking-tight">
                Elevate Your <span className="text-gold">Everyday</span>
              </h1>
              
              <div ref={textRef} className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                <p>
                  {`Craftsmanship meets contemporary design in our exclusive collection. `.split(' ').map((word, i) => (
                    <span key={i} className="word inline-block opacity-30">{word} </span>
                  ))}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-black text-white font-medium rounded-sm hover:bg-gray-800 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Discover Collection
                </button>
                <button className="px-8 py-3 border border-black text-black font-medium rounded-sm hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </section>

        {/* Best Selling Products */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">Best Selling Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most coveted pieces, meticulously crafted for those who appreciate timeless elegance.
              </p>
            </div>
            
            {/* Mobile & Tablet Carousel */}
            <div className="lg:hidden relative">
              <div 
                ref={productsRef}
                className="flex overflow-x-auto snap-x snap-mandatory py-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex-shrink-0 w-5/6 sm:w-2/3 md:w-1/2 px-4 snap-start"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden transition-all hover:shadow-lg">
                      <div className="h-64 bg-gray-200 border-2 border-dashed rounded-t-lg"></div>
                      <div className="p-6">
                        <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                        <p className="text-gold text-lg mb-4">{product.price}</p>
                        <button className="w-full py-3 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors active:scale-95">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-center mt-8 space-x-4">
                <button 
                  onClick={() => scrollProducts('prev')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => scrollProducts('next')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-gray-50 rounded-lg overflow-hidden transition-all hover:shadow-xl"
                >
                  <div className="h-72 bg-gray-200 border-2 border-dashed rounded-t-lg"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                    <p className="text-gold text-lg mb-4">{product.price}</p>
                    <button className="w-full py-3 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our products and services.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className="border-b border-gray-200 last:border-0"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-6 text-left flex justify-between items-center"
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <svg 
                      className={`w-5 h-5 transform transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pb-6 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-serif mb-2">Luxury Collection</h3>
                <p className="text-gray-400">Crafting timeless elegance since 2010</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Pinterest
                </a>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              <p>© 2023 Luxury Collection. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}