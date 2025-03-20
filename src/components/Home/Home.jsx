import React from 'react'
import Header from '../Header/Header'
import Services from '../Services/Services'
import Mentors from '../Mentors/Mentors'
import PopularCourses from '../PopularCourses/PopularCourses'

export default function Home() {
  return (
    <div>
    <Header />
    <Services/>
    <PopularCourses/>
    <Mentors/>
    </div>
  )
}
