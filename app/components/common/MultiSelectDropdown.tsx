import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Square } from 'lucide-react';
import { MultiSelectDropdownProps } from '~/types/common';

const useOutsideClick = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};

const MultiSelectDropdown = ({ title, icon, options, setSelectedOptions }: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDropdownOptions, setSelectedDropdownOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);

  const toggleOption = useCallback((optionName: string) => {
    setSelectedDropdownOptions(prevSelected => {
      const newSelected = prevSelected.includes(optionName)
        ? prevSelected.filter(item => item !== optionName)
        : [...prevSelected, optionName];

      setSelectedOptions(newSelected);

      return newSelected;
    });
  }, [setSelectedOptions]);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex w-full items-center justify-between rounded-md border border-shoko-border bg-shoko-bg-alt p-2 shadow-sm focus:outline-none focus:ring-0"
      >
        <div className="flex items-center gap-2">
          {selectedDropdownOptions.length > 0 ? `${selectedDropdownOptions.length} selected` : icon} {title}
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-shoko-border bg-shoko-bg-alt shadow-lg">
          {options.map(({ name }) => (
            <button
              key={name}
              type="button"
              onClick={() => toggleOption(name)}
              className="flex w-full cursor-pointer items-center justify-between p-2 text-shoko-text hover:text-shoko-link-hover"
            >
              <div>{name}</div>
              {selectedDropdownOptions.includes(name)
                ? <Check size={20} className="text-shoko-link" />
                : <Square size={20} className="text-shoko-text" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
