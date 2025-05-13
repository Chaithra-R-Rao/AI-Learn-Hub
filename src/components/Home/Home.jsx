import React,{ useEffect } from 'react'
import Header from '../Header/Header'
import Services from '../Services/Services'
import Mentors from '../Mentors/Mentors'
import Slider from '../Slider/Slider'
import { useLocation } from 'react-router-dom';
export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div>
      <section id="header">
        <Header />
      </section>
      <Slider />
      <section id="services">
        <Services />
      </section>
      <section id="mentors">
        <Mentors />
      </section>
    </div>
  )
}
