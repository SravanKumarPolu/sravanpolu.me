// Shared types for the portfolio application

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  sourceCodeLink: string;
  liveDemoLink: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  link: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface AnimationVariants {
  hidden: {
    opacity: number;
    y: number;
  };
  visible: {
    opacity: number;
    y: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LinkProps extends ComponentProps {
  href: string;
  target?: string;
  rel?: string;
}

export interface MobileLinkProps extends ComponentProps {
  href: string;
  isOpen: boolean;
  onClick: () => void;
}

export interface ArrowProps extends ComponentProps {
  onClick?: () => void;
}

export interface BlobBackgroundProps extends ComponentProps {
  variant?: 'primary' | 'secondary';
}
