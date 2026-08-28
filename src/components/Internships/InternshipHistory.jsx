import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Eye,
  Download,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Filter,
  Check,
} from "lucide-react";

/* =========================================================
   DUMMY INTERNSHIP DATA
========================================================= */

const internships = [
  {
    id: 1,
    company: "Google",
    role: "Data Science Intern",

    logo:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",

    location: "Bengaluru, Karnataka",
    mode: "On-site",
    duration: "Jan 2026 - Apr 2026 (4 Months)",

    status: "Completed",
    statusType: "completed",

    statusDate: "Completed on 20 Apr 2026",
    verification: "Verified on 22 Apr 2026",

    documentLabel: "Final Report",
    documentName: "DS_Internship_Report.pdf",
    documentSize: "1.2 MB",
  },

  {
    id: 2,
    company: "Amazon",
    role: "Machine Learning Intern",

    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",

    location: "Hyderabad, Telangana",
    mode: "Hybrid",
    duration: "May 2025 - Aug 2025 (4 Months)",

    status: "Completed",
    statusType: "completed",

    statusDate: "Completed on 30 Aug 2025",
    verification: "Verified on 02 Sep 2025",

    documentLabel: "Final Report",
    documentName: "ML_Internship_Report.pdf",
    documentSize: "2.1 MB",
  },

  {
    id: 3,
    company: "Infosys",
    role: "Software Development Intern",

    logo:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",

    location: "Mysuru, Karnataka",
    mode: "Hybrid",
    duration: "Jan 2025 - Mar 2025 (3 Months)",

    status: "Pending Verification",
    statusType: "pending",

    statusDate: "Submitted on 10 Mar 2025",
    verification: "Awaiting mentor review",

    documentLabel: "Supporting Document",
    documentName: "Offer_Letter.pdf",
    documentSize: "856 KB",
  },
];

/* =========================================================
   FILTER OPTIONS
========================================================= */

const filterOptions = [
  {
    label: "All",
    value: "All Internships",
  },
  {
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Pending Verification",
    value: "Pending Verification",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const InternshipHistory = () => {
  const [filter, setFilter] = useState("All Internships");
  const [openMenu, setOpenMenu] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  /* =======================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ======================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredInternships = useMemo(() => {
    if (filter === "Completed") {
      return internships.filter(
        (internship) =>
          internship.statusType === "completed"
      );
    }

    if (filter === "Pending Verification") {
      return internships.filter(
        (internship) =>
          internship.statusType === "pending"
      );
    }

    return internships;
  }, [filter]);

  /* =======================================================
     CURRENT FILTER LABEL
  ======================================================= */

  const currentFilterLabel =
    filterOptions.find(
      (option) => option.value === filter
    )?.label || "All";

  /* =======================================================
     FILTER CHANGE
  ======================================================= */

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsFilterOpen(false);
  };

  /* =======================================================
     VIEW DOCUMENT
  ======================================================= */

  const handleView = (internship) => {
    console.log(
      "View internship document:",
      internship.documentName
    );
  };

  /* =======================================================
     DOWNLOAD DOCUMENT
  ======================================================= */

  const handleDownload = (internship) => {
    console.log(
      "Download internship document:",
      internship.documentName
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        relative
        w-full
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        overflow-visible
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          z-30
          min-h-[74px]
          px-6
          py-4
          border-b
          border-slate-200
          flex
          items-center
          justify-between
          gap-6
          bg-white
          rounded-t-2xl
        "
      >
        {/* =================================================
            HEADER TITLE
        ================================================= */}

        <div className="flex items-center min-w-0">
          <h2
            className="
              text-[18px]
              leading-6
              font-semibold
              text-[#142970]
              whitespace-nowrap
            "
          >
            Internship History
          </h2>
        </div>

        {/* =================================================
            FILTER
        ================================================= */}

        <div
          ref={filterRef}
          className="
            relative
            z-[100]
            flex
            items-center
            shrink-0
          "
        >
          {/* =================================================
              FILTER BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setIsFilterOpen(
                (previous) => !previous
              )
            }
            className="
              h-[42px]
              min-w-[158px]
              px-4
              rounded-xl
              border
              border-slate-200
              bg-white
              flex
              items-center
              justify-between
              gap-4
              text-[12px]
              font-medium
              text-slate-600
              outline-none
              cursor-pointer
              transition-all
              duration-200
              hover:border-blue-300
              hover:bg-slate-50
              focus:ring-2
              focus:ring-blue-100
            "
          >
            {/* Filter Button Left Side */}

            <div className="flex items-center gap-2.5">
              <Filter
                size={15}
                strokeWidth={1.8}
                className="text-slate-500"
              />

              <span className="whitespace-nowrap">
                {currentFilterLabel}
              </span>
            </div>

            {/* Filter Arrow */}

            {isFilterOpen ? (
              <ChevronUp
                size={15}
                strokeWidth={1.8}
                className="text-slate-400 shrink-0"
              />
            ) : (
              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className="text-slate-400 shrink-0"
              />
            )}
          </button>

          {/* =================================================
              CUSTOM FILTER DROPDOWN
          ================================================= */}

          {isFilterOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2
                z-[200]
                w-[288px]
                bg-white
                border
                border-slate-200
                rounded-xl
                shadow-[0_12px_32px_rgba(15,23,42,0.14)]
                overflow-hidden
              "
            >
              {/* =================================================
                  DROPDOWN HEADER
              ================================================= */}

              <div
                className="
                  px-5
                  py-4
                  border-b
                  border-slate-100
                  bg-white
                "
              >
                <p
                  className="
                    text-[12px]
                    font-semibold
                    tracking-wide
                    text-slate-400
                    uppercase
                    whitespace-nowrap
                  "
                >
                  Filter by Status
                </p>
              </div>

              {/* =================================================
                  FILTER OPTIONS
              ================================================= */}

              <div className="p-2.5">
                {filterOptions.map((option) => {
                  const isSelected =
                    filter === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        handleFilterChange(
                          option.value
                        )
                      }
                      className={`
                        w-full
                        min-h-[44px]
                        pl-5
                        pr-4
                        py-2.5
                        rounded-lg
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-left
                        text-[13px]
                        transition-all
                        duration-150
                        ${
                          isSelected
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }
                      `}
                    >
                      {/* Option Label */}

                      <span className="whitespace-nowrap">
                        {option.label}
                      </span>

                      {/* Selected Check */}

                      {isSelected && (
                        <Check
                          size={17}
                          strokeWidth={2}
                          className="
                            text-blue-600
                            shrink-0
                          "
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          HISTORY CONTENT
      ===================================================== */}

      <div className="relative z-10 px-6">
        {filteredInternships.map(
          (internship, index) => (
            <div
              key={internship.id}
              className={`
                min-h-[138px]
                py-5
                grid
                grid-cols-[minmax(0,1fr)_230px_300px]
                items-center
                gap-6
                ${
                  index !==
                  filteredInternships.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }
              `}
            >
              {/* =================================================
                  LEFT — INTERNSHIP DETAILS
              ================================================= */}

              <div className="min-w-0 flex items-center gap-4">
                {/* Company Logo */}

                <div
                  className="
                    w-[64px]
                    h-[64px]
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    flex
                    items-center
                    justify-center
                    shrink-0
                    overflow-hidden
                  "
                >
                  <img
                    src={internship.logo}
                    alt={`${internship.company} logo`}
                    className="
                      w-[48px]
                      h-[48px]
                      object-contain
                    "
                  />
                </div>

                {/* Internship Information */}

                <div className="min-w-0">
                  <h3
                    className="
                      text-[15px]
                      font-semibold
                      text-slate-800
                    "
                  >
                    {internship.company}
                  </h3>

                  <p
                    className="
                      text-[14px]
                      font-semibold
                      text-[#142970]
                      mt-1
                    "
                  >
                    {internship.role}
                  </p>

                  {/* Meta Information */}

                  <div
                    className="
                      flex
                      items-center
                      flex-wrap
                      gap-x-4
                      gap-y-2
                      mt-3
                    "
                  >
                    {/* Location */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        text-slate-500
                        whitespace-nowrap
                      "
                    >
                      <MapPin
                        size={13}
                        className="text-slate-500"
                      />

                      <span>
                        {internship.location}
                      </span>
                    </div>

                    {/* Mode */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        text-slate-500
                        whitespace-nowrap
                      "
                    >
                      <BriefcaseBusiness
                        size={13}
                        className="text-slate-500"
                      />

                      <span>
                        {internship.mode}
                      </span>
                    </div>

                    {/* Duration */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        text-slate-500
                        whitespace-nowrap
                      "
                    >
                      <CalendarDays
                        size={13}
                        className="text-slate-500"
                      />

                      <span>
                        {internship.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  MIDDLE — STATUS
              ================================================= */}

              <div className="min-w-0">
                {/* Status Badge */}

                <div
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    px-4
                    h-[34px]
                    rounded-lg
                    text-[12px]
                    font-semibold
                    whitespace-nowrap
                    ${
                      internship.statusType ===
                      "completed"
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : "bg-orange-50 text-orange-600 border border-orange-100"
                    }
                  `}
                >
                  {internship.status}
                </div>

                {/* Status Date */}

                <p
                  className="
                    text-[12px]
                    text-slate-500
                    mt-3
                  "
                >
                  {internship.statusDate}
                </p>

                {/* Verification */}

                <p
                  className="
                    text-[12px]
                    text-slate-400
                    mt-1
                  "
                >
                  {internship.verification}
                </p>
              </div>

              {/* =================================================
                  RIGHT — REPORT
              ================================================= */}

              <div
                className="
                  min-w-0
                  border-l
                  border-slate-200
                  pl-6
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                {/* Document Information */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    min-w-0
                  "
                >
                  {/* Document Icon */}

                  <div
                    className="
                      w-[46px]
                      h-[46px]
                      rounded-xl
                      bg-blue-50
                      border
                      border-blue-100
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <FileText
                      size={21}
                      className="text-blue-600"
                    />
                  </div>

                  {/* Document Details */}

                  <div className="min-w-0">
                    <p
                      className="
                        text-[11px]
                        text-slate-500
                      "
                    >
                      {internship.documentLabel}
                    </p>

                    <p
                      className="
                        text-[13px]
                        font-semibold
                        text-slate-800
                        truncate
                        mt-0.5
                      "
                    >
                      {internship.documentName}
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-slate-400
                        mt-1
                      "
                    >
                      {internship.documentSize}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    shrink-0
                  "
                >
                  {/* View */}

                  <button
                    type="button"
                    onClick={() =>
                      handleView(internship)
                    }
                    title="View"
                    className="
                      w-8
                      h-8
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      text-slate-500
                      hover:text-blue-600
                      hover:bg-blue-50
                      transition
                    "
                  >
                    <Eye size={17} />
                  </button>

                  {/* Download */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(
                        internship
                      )
                    }
                    title="Download"
                    className="
                      w-8
                      h-8
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      text-slate-500
                      hover:text-blue-600
                      hover:bg-blue-50
                      transition
                    "
                  >
                    <Download size={17} />
                  </button>

                  {/* More */}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu ===
                            internship.id
                            ? null
                            : internship.id
                        )
                      }
                      title="More"
                      className="
                        w-8
                        h-8
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        text-slate-500
                        hover:text-blue-600
                        hover:bg-blue-50
                        transition
                      "
                    >
                      <MoreVertical size={17} />
                    </button>

                    {/* More Menu */}

                    {openMenu ===
                      internship.id && (
                      <div
                        className="
                          absolute
                          right-0
                          top-9
                          z-[200]
                          w-[140px]
                          bg-white
                          border
                          border-slate-200
                          rounded-lg
                          shadow-[0_10px_25px_rgba(15,23,42,0.12)]
                          py-1
                        "
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleView(
                              internship
                            );
                            setOpenMenu(null);
                          }}
                          className="
                            w-full
                            px-3
                            py-2.5
                            text-left
                            text-[11px]
                            text-slate-600
                            hover:bg-slate-50
                            transition
                          "
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleDownload(
                              internship
                            );
                            setOpenMenu(null);
                          }}
                          className="
                            w-full
                            px-3
                            py-2.5
                            text-left
                            text-[11px]
                            text-slate-600
                            hover:bg-slate-50
                            transition
                          "
                        >
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {filteredInternships.length === 0 && (
          <div
            className="
              py-12
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div
              className="
                w-12
                h-12
                rounded-full
                bg-slate-100
                flex
                items-center
                justify-center
                mb-3
              "
            >
              <FileText
                size={22}
                className="text-slate-400"
              />
            </div>

            <p
              className="
                text-sm
                font-semibold
                text-slate-700
              "
            >
              No internships found
            </p>

            <p
              className="
                text-xs
                text-slate-400
                mt-1
              "
            >
              There are no internship records
              matching this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipHistory;