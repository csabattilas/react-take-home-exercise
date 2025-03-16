import * as React from 'react';

const createIconComponent = (name: string): React.FC<React.SVGProps<SVGSVGElement>> => {
  const Component: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return React.createElement('svg', {
      'data-testid': `icon-${name.toLowerCase().replace('fa', '')}`,
      ...props,
      role: 'img'
    });
  };
  
  Component.displayName = name;
  
  return Component;
};

export const FaCheck = createIconComponent('completed');
export const FaSpinner = createIconComponent('in-progress');
export const FaRegCircle = createIconComponent('new');
export const FaTrash = createIconComponent('trash');