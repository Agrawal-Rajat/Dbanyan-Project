// Dbanyan Group - Breadcrumb Component
// Navigation breadcrumbs for better user experience

import React from 'react';
import { Breadcrumbs, Anchor, Text } from '@mantine/core';
import { IconHome, IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const BreadcrumbNav = ({ items }) => {
  const navigate = useNavigate();

  const breadcrumbItems = items.map((item, index) => {
    const isLast = index === items.length - 1;
    
    if (isLast) {
      return (
        <Text 
          key={index} 
          className="text-gray-600 font-medium"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {item.title}
        </Text>
      );
    }

    return (
      <Anchor
        key={index}
        onClick={() => item.href && navigate(item.href)}
        className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {item.title}
      </Anchor>
    );
  });

  return (
    <div className="bg-gray-50 py-4 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          separator={<IconChevronRight className="w-4 h-4 text-gray-400" />}
          className="text-sm"
        >
          <Anchor
            onClick={() => navigate('/')}
            className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer flex items-center gap-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <IconHome className="w-4 h-4" />
            Home
          </Anchor>
          {breadcrumbItems}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default BreadcrumbNav;
