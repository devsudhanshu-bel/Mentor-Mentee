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
    options.find(
      (option) => option.value === value
    ) || options[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleSelect = (option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* ==================================================
          FILTER BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
        className={`
          h-9
          px-3
          min-w-[120px]
          rounded-md
          border
          bg-white
          flex
          items-center
          justify-between
          gap-2
          text-xs
          font-medium
          transition
          ${
            isOpen
              ? "border-blue-400 ring-2 ring-blue-50"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }
        `}
      >
        <span className="flex items-center gap-2">
          <Filter
            size={14}
            className="text-slate-500"
          />

          <span className="text-slate-700">
            {selectedOption.label}
          </span>
        </span>

        <ChevronDown
          size={14}
          className={`
            text-slate-400
            transition-transform
            ${
              isOpen
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {/* ==================================================
          DROPDOWN
      ================================================== */}

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-[100] w-[180px] rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">

          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Filter by Level
            </p>
          </div>

          <div className="p-1.5">
            {options.map((option) => {
              const isSelected =
                option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleSelect(option)
                  }
                  className={`
                    w-full
                    flex
                    items-center
                    justify-between
                    px-3
                    py-2
                    rounded-md
                    text-xs
                    transition
                    ${
                      isSelected
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <span>
                    {option.label}
                  </span>

                  {isSelected && (
                    <Check
                      size={14}
                      className="text-blue-600"
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