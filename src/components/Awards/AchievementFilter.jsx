
import React, { useEffect, useRef, useState } from "react";
import {
  Filter,
  ChevronDown,
  Check,
} from "lucide-react";

const AchievementFilter = ({
  value = "ALL",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const options = [
    {
      value: "ALL",
      label: "All",
    },
    {
      value: "University Level",
      label: "University",
    },
    {
      value: "Department Level",
      label: "Department",
    },
    {
      value: "National Level",
      label: "National",
    },
    {
      value: "International Level",
      label: "International",
    },
  ];

  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full min-w-0 sm:w-auto"
    >
      {/* FILTER BUTTON */}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`
          flex h-9 w-full min-w-0 items-center justify-between gap-2
          rounded-md border bg-white px-3 text-xs font-medium
          transition sm:w-auto sm:min-w-[120px]
          ${
            isOpen
              ? "border-blue-400 ring-2 ring-blue-50"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }
        `}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Filter
            size={14}
            className="shrink-0 text-slate-500"
          />

          <span className="truncate text-slate-700">
            {selectedOption.label}
          </span>
        </span>

        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-[100] w-[min(220px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Filter by Level
            </p>
          </div>

          <div className="p-1.5">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={`
                    flex w-full items-center justify-between gap-2
                    rounded-md px-3 py-2.5 text-left text-xs
                    transition
                    ${
                      isSelected
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <span className="min-w-0 break-words">
                    {option.label}
                  </span>

                  {isSelected && (
                    <Check
                      size={14}
                      className="shrink-0 text-blue-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementFilter;
