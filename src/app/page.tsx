'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

// Get the base path for images
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio-site' : '';

// Sample data - you can replace these with your actual content
const professionalSummary = {
  name: "Parth Sarthi",
  title: "Animation Programmer & Technical Animator",
  location: "Muzaffarpur, Bihar, India", // Replace with your actual location
  summary: "Passionate animation programmer and technical animator with expertise in creating cutting-edge animation systems, procedural animation tools, and performative animation pipelines. Specialized in bridging the gap between artistic vision and technical implementation.",
  skills: ["Unreal Engine ", "Unity ", "Blender ", "Cascadeur ", "Marvelous Designer ", "Maya ", "ZBrush ", "Photoshop ", "Python ", "C# ", "C++ ", "VFX ", "Rigging ", "Houdini ", "Substance Painter ", " FL Studio", " MotionBuilder", " Game Audio"]
};

const experiences = [
  {
    company: "Rifflix",
    position: "Animation Programmer & Plugin Developer",
    duration: "2025 - Present",
    description: "Developed animation tools and pipelines that were used to make an automated episode generation system using AI in Unreal Engine"
  },
  {
    company: "Shader Labs",
    position: "Lead Animation Director & Lead Gameplay and AI Programmer",
    duration: "2023 - 2025",
    description: "Developed animation tools and pipelines, implemented runtime animation systems, and made AAA quality animations for the Game 'Baoli'."
  },
  {
    company: "India Game Lab",
    position: "Specialist Instructor",
    duration: "2024 - 2025",
    description: "Instructed character rigging and animation in Blender, Cascadeur & Unreal Engine, animation production with technical solutions."
  }
];

const education = [
  {
    institution: "India Game Lab",
    degree: "Professional Certificate",
    field: "Unreal Engine Generalist",
    duration: "2022 - 2024",
    description: "Specialized in Unreal Engine, C++, Blueprint, Python, Lighting, Clothing, Crowd Simulation, Sound design, VFX , Texturing, Modeling, and Animation."
  },
  {
    institution: "Various Courses",
    degree: "Certificate Program",
    field: "Programming",
    duration: "2019 - 2022",
    description: "Courses such as CS50, CS50X ,CS50G and various other courses on programming."
  },
  {
    institution: "Babasaheb Bhimrao Ambedkar Bihar University",
    degree: "Bachelor of Commerce - BCom, Accounts",
    field: "Graduation Degree",
    duration: "2023 - 2027",
    description: "Currently Pursuing BCom, Accounts from Babasaheb Bhimrao Ambedkar Bihar University."
  }
];

const selectedProjects = [
  {
    title: "Procedural Locomotion System",
    description: "Developed a solution that uses maths to move joints replicating human-like locomotions",
    technologies: ["Unreal Engine", "C++", "Python"],
    gifUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnkzbzFtcXFjMjZsNXY2cDAwNTh6aTRjdWRxMmJodmMyZTJtZjE1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NKPx3RopZ7GZZJ49FB/giphy.gif"
  },
  {
    title: "Procedural Rigs for Weaponary",
    description: "Created a real-time rig that helps with animations that involve weaponary like guns",
    technologies: ["Unreal Engine", "Blueprints", "Blender"],
    gifUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG55cWo5MXFpbG45MnV6OGhwZG92N3ZoOWFhaGdvZHpzNGg3Zjh5YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pBoALtohXJe2TUShyM/giphy.gif"
  },
  {
    title: "Modular Rigs for Characters",
    description: "Developed an automated rigging system that reduced character setup time by 80%",
    technologies: ["Unreal Engine", "C++", "Blueprint"],
    gifUrl: "https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cc043e6-bebf-4cc1-8947-eeaf8ed35efb/image_24.gif" // Replace with your actual GIF path
  },
  {
    title: "AI System with Motion Matching",
    description: "Designed a system that uses Unreal's built in Path finding to work with Motion Matching",
    technologies: ["Unreal Engine", "Cascadeur", "Motion Matching"],
    gifUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGNzdGpscjRtOXRsaGc1Z3pzbmszajYwMnBveXVzMWZpdXQ0bGE4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LyHSd0kiAczp02i1OI/giphy.gif"
  },
  {
    title: "Motion Matching Systems",
    description: "Built various types of motion matching systems for a lot of different characters",
    technologies: ["MotionBuilder", "Cascadeur", "Blender", "Unreal Engine"],
    gifUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxmNHlobjVxd2l1bDBtbWZ4ZWl6enFwZ2l1OW1kNm55YWc3c3JoaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KEfcE2RUMzEEX97syC/giphy.gif"
  },
  {
    title: "Episode Generation with AI",
    description: "Created a system for generating sequences and cutscenes with voicelines using AI",
    technologies: ["Unreal Engine", "C++", "LLMs", "MCP"],
    gifUrl: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXA0ZzI2Z2UxNDgzdnRvdGtlcW50a2NudzIwOHAwNjBxbnI1czJwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qaZjqbBLOtPM8mjKyb/giphy.gif"
  }
];

// Sample recognition & awards data - replace with your actual awards
const recognitionAwards = [
  {
    title: "Baoli Featured at India Game Utsav 2025",
    organization: "ShaderLabs",
    year: "2025",
    description: "Baoli, the game I worked on, was featured at India Game Utsav 2025."
  },
  {
    title: "Best Instructor of the Year",
    organization: "India Game Lab",
    year: "2024",
    description: "Awarded for having the Most Impact on Students."
  },
  {
    title: "Innovation in Animation Technology with AI",
    organization: "Rifflix",
    year: "2025",
    description: "Honored for developing cutting-edge tools and workflows for animation production with AI."
  }
];

// Sample animation data - replace with your actual GIFs
const animationShowcase = [
  {
    title: "Character Walk Cycle",
    gifUrl: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmJ5dXFjY2xyc3draGx0N29tZ3RtbGM1eXR0eTd5cG5vdXBhMGJmcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5POKjGZK3nEgDDbKri/giphy.gif", // Replace with actual GIF paths
    alt: "Character walking animation"
  },
  {
    title: "Smacking a TV (Baoli)",
    gifUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRjNGthZTZvb253M3ZvcXlzeWcyNGNwdTlka2FuaWpteGs3NTZtZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HzL5ngJCFDWoMMtZ2S/giphy.gif",
    alt: "Smacking a TV (Baoli)"
  },
  {
    title: "Waking Up (Baoli)",
    gifUrl: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2RmcGxoanY1M3RqZzY3ZGZjc29iNGRsOWt3emp5NGw5ZjFhNGs4eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V5YrXqn96hrqi6PPQS/giphy.gif",
    alt: "Waking Up (Baoli)"
  },
  {
    title: "Glasses Animation (Baoli)",
    gifUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWN2a2lwcTFsNGhnOWw5eHczZTRjcmw2Z3FwNTJ0Z3lwNWt4YjN3cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/grJUJHKWMMfrRTSZgH/giphy.gif",
    alt: "Glasses Animation (Baoli)"
  },
  {
    title: "Lighter Animation (Baoli)",
    gifUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXF0eDJjZzhjMzRsbmw0d2xoanAydXlrbzZndjZkbnl0Ym9ibjJqdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qLVmoR6q3NYhnJh4Qe/giphy.gif",
    alt: "Lighter Animation (Baoli)"
  },
  {
    title: "Sit (Baoli)",
    gifUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3IyNDFqYm83MnR5OTJra2k4Mjlubm9qdTR0NHF0NHVvajkxaHdkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SH9uV4tjhmSYcVrFxv/giphy.gif",
    alt: "Sit on Couch (Baoli)"
  }
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }



  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-gray-100 to-orange-100'
    }`}>


      {/* Header */}
      <header className={`shadow-lg transition-colors duration-500 ${
        isDarkMode ? 'bg-slate-800' : 'bg-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 bg-gradient-to-br from-white via-gray-50 to-gray-200 rounded-full p-2 shadow-2xl transform hover:scale-105 transition-all duration-300">
                {/* Inner shadow for depth */}
                <div className="absolute inset-2 rounded-full shadow-inner bg-gradient-to-br from-gray-100 to-white"></div>
                <div className="relative w-full h-full bg-slate-400 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50">
                  <Image
                    src={`${basePath}/images/profile.png`}
                    alt="Parth Sarthi - Profile Photo"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {/* Subtle highlight overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                {professionalSummary.name}
              </h1>
              <p className="text-xl text-slate-100 font-medium mb-2">
                {professionalSummary.title}
              </p>
              <p className="text-md text-slate-200 flex items-center justify-center -ml-8">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {professionalSummary.location}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-6">
          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/parth-sarthi-9a1143289"
            className={`flex items-center px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 border-slate-600 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white hover:border-slate-500'
                : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border-slate-300 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:text-white hover:border-slate-500'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>

          {/* Email Button */}
          <a
            href="mailto:parthsarthi1208@gmail.com"
            className={`flex items-center px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 border-slate-600 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white hover:border-slate-500'
                : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border-slate-300 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:text-white hover:border-slate-500'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v.273L12 8.773l6.545-4.679V3.82h3.819c.904 0 1.636.733 1.636 1.637z"/>
            </svg>
            Email
          </a>

          {/* Phone Button */}
          <a
            href="tel:+917506087041"
            className={`flex items-center px-6 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 border-slate-600 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white hover:border-slate-500'
                : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border-slate-300 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:text-white hover:border-slate-500'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Phone
          </a>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
        {/* Professional Summary */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-100/50'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Professional Summary
          </h2>
          <p className={`text-lg mb-6 leading-relaxed transition-colors duration-500 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-500'
          }`}>
            {professionalSummary.summary}
          </p>
          <div>
            <h3 className={`text-xl font-semibold mb-4 transition-colors duration-500 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-600'
            }`}>
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {professionalSummary.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 border-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-slate-200 border-slate-600 hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white hover:border-slate-500'
                      : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 border-slate-300 hover:bg-gradient-to-r hover:from-slate-400 hover:to-slate-500 hover:text-white hover:border-slate-500'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Board */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-100/50'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-orange-400 pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className={`text-xl font-semibold transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {exp.position}
                  </h3>
                  <span className={`text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {exp.duration}
                  </span>
                </div>
                <h4 className={`text-lg font-medium mb-3 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {exp.company}
                </h4>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-100/50'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className={`text-xl font-semibold transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {edu.degree}
                  </h3>
                  <span className={`text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {edu.duration}
                  </span>
                </div>
                <h4 className={`text-lg font-medium mb-1 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {edu.institution}
                </h4>
                <h5 className={`text-md font-medium mb-3 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  {edu.field}
                </h5>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recognition & Awards */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-100/50'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Recognition & Awards
          </h2>
          <div className="space-y-6">
            {recognitionAwards.map((award, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className={`text-xl font-semibold transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-600'
                  }`}>
                    {award.title}
                  </h3>
                  <span className={`text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {award.year}
                  </span>
                </div>
                <h4 className={`text-lg font-medium mb-3 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {award.organization}
                </h4>
                <p className={`leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-50/70'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Selected Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProjects.map((project, index) => (
              <div key={index} className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-80">
                {/* Background GIF */}
                <div className="absolute inset-0">
                  {/* Placeholder for GIF - replace with actual Image component when you have GIFs */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm opacity-75">GIF Preview</p>
                      </div>
                    </div>
                  </div>
                  <Image
                    src={project.gifUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    unoptimized // Add this for GIFs
                  />
                </div>

                {/* Overlay with content */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-300 p-6">
                  {/* Default state: content at bottom */}
                  <div className="h-full flex flex-col justify-end group-hover:hidden transition-all duration-500 ease-in-out">
                    <h3 className="text-white font-bold mb-3 text-xl transition-all duration-700 ease-in-out">
                      {project.title}
                    </h3>
                    <p className="text-white/90 mb-4 leading-relaxed text-sm transition-opacity duration-300 ease-in-out">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 transition-opacity duration-300 ease-in-out">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white/20 text-white rounded-full text-xs backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover state: only title at bottom, smaller */}
                  <div className="h-full hidden group-hover:flex flex-col justify-end transition-all duration-700 ease-in-out">
                    <h3 className="text-white font-semibold text-lg transition-all duration-700 ease-in-out">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Animation Showcase Grid */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-50/70'
        }`}>
          <h2 className={`text-3xl font-bold mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Animation Showcase
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animationShowcase.map((animation, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-gray-100/50'
                }`}>
                  <div className={`aspect-video relative overflow-hidden transition-colors duration-500 ${
                    isDarkMode ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-gradient-to-br from-gray-100 to-orange-100'
                  }`}>
                    <Image
                      src={animation.gifUrl}
                      alt={animation.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized // Add this for GIFs
                    />
                  </div>
                  <div className="p-4">
                    <h3 className={`text-lg font-medium text-center transition-colors duration-500 ${
                      isDarkMode ? 'text-slate-200' : 'text-slate-600'
                    }`}>
                      {animation.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={`backdrop-blur-sm rounded-lg shadow-lg p-8 transition-colors duration-500 ${
          isDarkMode ? 'bg-slate-800/70' : 'bg-gray-100/50'
        }`}>
          <h2 className={`text-3xl font-bold text-center mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-slate-200' : 'text-slate-600'
          }`}>
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className={`text-lg mb-8 leading-relaxed transition-colors duration-500 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-500'
            }`}>
              I&apos;m always interested in discussing new opportunities, collaborations, or just talking about animation and technology. Feel free to reach out!
            </p>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <div className="text-center">
                <a href="mailto:parthsarthi1208@gmail.com" className="block">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                  }`}>
                    <svg className={`w-8 h-8 transition-colors duration-500 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </a>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  Email
                </h3>
                <a
                  href="mailto:parthsarthi1208@gmail.com"
                  className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  parthsarthi1208@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="text-center">
                <a href="tel:+917506087041" className="block">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                  }`}>
                    <svg className={`w-8 h-8 transition-colors duration-500 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </a>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  Phone
                </h3>
                <a
                  href="tel:+917506087041"
                  className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  +91 7506087041
                </a>
              </div>

              {/* LinkedIn */}
              <div className="text-center">
                <a href="https://www.linkedin.com/in/parth-sarthi-9a1143289" className="block">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                  }`}>
                    <svg className={`w-8 h-8 transition-colors duration-500 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </a>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  LinkedIn
                </h3>
                <a
                  href="https://www.linkedin.com/in/parth-sarthi-9a1143289"
                  className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Connect with me
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t mt-16 transition-colors duration-500 ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-600 border-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`transition-colors duration-500 ${
              isDarkMode ? 'text-slate-200' : 'text-slate-100'
            }`}>
              © 2024 {professionalSummary.name}. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="https://www.linkedin.com/in/parth-sarthi-9a1143289" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-200 hover:text-white'
              }`}>
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/Braga1913" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-200 hover:text-white'
              }`}>
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl z-50 ${
          isDarkMode
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
            : 'bg-slate-600 text-white hover:bg-slate-500'
        }`}
        style={{
          transition: 'background-color 0.3s ease'
        }}
        aria-label="Toggle dark mode"
      >
        <div className="flex items-center justify-center w-full h-full">
          {isDarkMode ? (
            // Sun icon for light mode
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
