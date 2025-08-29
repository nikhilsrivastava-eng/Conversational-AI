import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaHome, FaComments, FaUser } from 'react-icons/fa';
import { Container } from './Container';
import { Icon } from './Icon';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Icon 
              icon={FaRobot} 
              size={28} 
              className="text-[var(--primary)]" 
            />
            <span className="text-xl font-bold text-[var(--text)]">
              HealthMate
            </span>
          </Link>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--primary)] transition-colors"
            >
              <Icon icon={FaHome} size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link 
              to="/chat" 
              className="flex items-center gap-2 text-[var(--text)] hover:text-[var(--primary)] transition-colors"
            >
              <Icon icon={FaComments} size={20} />
              <span className="hidden sm:inline">Chats</span>
            </Link>

            <Button 
              variant="outline" 
              size="sm" 
              className="!rounded-full !p-2"
              onClick={() => {/* Add profile click handler */}}
            >
              <Icon icon={FaUser} size={20} />
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};
