import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  HeroSection, 
  SectionTitle, 
  FeatureCard,
  Button
} from '../ui/components';
import {
  FaRobot,
  FaMagic,
  FaBrain,
  FaShieldAlt,
  FaBolt,
  FaHeadset
} from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FaHeadset,
      title: '24/7 Health Support',
      description: 'Get instant medical guidance and support anytime, day or night, from our AI health assistant.'
    },
    {
      icon: FaShieldAlt,
      title: 'HIPAA Compliant',
      description: 'Your health information is protected with military-grade encryption and HIPAA-compliant security measures.'
    },
    {
      icon: FaBrain,
      title: 'Smart Symptom Analysis',
      description: 'Advanced AI technology helps identify potential health concerns based on your symptoms and medical history.'
    },
    {
      icon: FaBolt,
      title: 'Quick Medical Info',
      description: 'Get instant, reliable information about medications, conditions, and general health queries.'
    },
    {
      icon: FaRobot,
      title: 'Personalized Care',
      description: 'Receive tailored health recommendations based on your unique medical profile and lifestyle.'
    },
    {
      icon: FaMagic,
      title: 'Wellness Tracking',
      description: 'Monitor your health journey with intelligent tracking of symptoms, medications, and lifestyle factors.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <HeroSection
        title="Your Personal AI Health Assistant"
        subtitle="Experience 24/7 healthcare support with our intelligent medical chatbot. Get instant health guidance, symptom analysis, and reliable medical information at your fingertips."
        primaryAction={{
          label: "Start Your Health Journey",
          onClick: () => navigate('/signup')
        }}
        secondaryAction={{
          label: "Consult Now",
          onClick: () => navigate('/chat')
        }}
      />

      <section className="py-20">
        <Container>
          <SectionTitle
            subtitle="Healthcare Made Accessible"
            title="Your Health Companion, Always Ready"
            centered
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <SectionTitle
              subtitle="Take Control of Your Health"
              title="Your Wellness Journey Begins Here"
              centered
            />
            <p className="mb-8 max-w-2xl text-lg text-[var(--text)] opacity-70">
              Join thousands of users who trust our AI health assistant for reliable medical guidance
              and personalized healthcare support. Your well-being is our priority.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Start Your Health Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/login')}
              >
                Access Your Health Dashboard
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <footer className="bg-[var(--text)] py-12 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <FaRobot size={24} />
              <span className="text-xl font-bold">HealthAssist AI</span>
            </div>
            <div className="text-sm opacity-70">
              © {new Date().getFullYear()} HealthAssist AI. All rights reserved. Not a substitute for professional medical advice.
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
