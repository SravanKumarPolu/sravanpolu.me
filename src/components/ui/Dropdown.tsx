import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { designTokens } from '../../design-tokens';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-48',
  md: 'w-56',
  lg: 'w-64',
};

const positionClasses = {
  left: 'left-0',
  right: 'right-0',
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2
    }
  })
};

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  position = 'right',
  size = 'md',
  className = ''
}) => {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <div>
        <Menu.Button as="div" className="cursor-pointer">
          {trigger}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`
            absolute z-50 mt-2 ${sizeClasses[size]} origin-top-right rounded-xl 
            bg-white dark:bg-neutral-800 shadow-xl ring-1 ring-black ring-opacity-5 
            focus:outline-none border border-neutral-200 dark:border-neutral-700
            ${positionClasses[position]}
          `}
        >
          <div className="py-2">
            {items.map((item, index) => (
              <Menu.Item key={index} disabled={item.disabled}>
                {({ active }) => (
                  <motion.button
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`
                      group flex w-full items-center gap-3 px-4 py-3 text-sm
                      transition-colors duration-200
                      ${active 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                        : 'text-neutral-700 dark:text-neutral-300'
                      }
                      ${item.disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-700'
                      }
                      ${item.danger 
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
                        : ''
                      }
                    `}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0 w-4 h-4">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left">{item.label}</span>
                  </motion.button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
