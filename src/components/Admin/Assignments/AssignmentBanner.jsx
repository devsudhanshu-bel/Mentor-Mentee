import React, { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

import {
  createTermChangeRequest,
  getTermChangeContext,
} from "../../../api/termChange.api";

/* ==========================================================
   DATE HELPERS
========================================================== */

/**
 * Format a date for display.
 */
const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Convert Date/string → YYYY-MM-DD
 * for native date inputs.
 */
const formatDateForInput = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const year = parsed.getFullYear();

  const month = String(parsed.getMonth() + 1).padStart(2, "0");

  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* ==========================================================
   FIXED ACADEMIC CALENDAR
==========================================================

   STANDARD ACADEMIC CALENDAR:

   Odd Semester:
   June 1 → October 21

   Even Semester:
   October 22 → April 30 of the following year

========================================================== */

const getDefaultAcademicTermDates = (term) => {
  if (!term?.name) {
    return {
      startDate: null,
      endDate: null,
    };
  }

  const match = term.name.match(/^(Odd|Even)\s+Semester\s+(\d{4})$/i);

  if (!match) {
    return {
      startDate: term.startDate || null,
      endDate: term.endDate || null,
    };
  }

  const type = match[1].toLowerCase();

  const year = Number(match[2]);

  /* --------------------------------------------------------
     ODD SEMESTER

     June 1 → October 21
  -------------------------------------------------------- */

  if (type === "odd") {
    return {
      startDate: new Date(year, 5, 1),

      endDate: new Date(year, 9, 21),
    };
  }

  /* --------------------------------------------------------
     EVEN SEMESTER

     October 22 → April 30 next year
  -------------------------------------------------------- */

  return {
    startDate: new Date(year, 9, 22),

    endDate: new Date(year + 1, 3, 30),
  };
};

/* ==========================================================
   DISPLAY DATES
==========================================================

   Priority:

   1. Custom approved dates
   2. Fixed academic calendar
   3. DB dates as fallback for unknown term names

========================================================== */

const getAcademicTermDates = (term) => {
  if (!term) {
    return {
      startDate: null,
      endDate: null,
    };
  }

  /*
   * --------------------------------------------------------
   * CUSTOM DATES HAVE HIGHEST PRIORITY
   * --------------------------------------------------------
   *
   * These fields can be supplied later by the backend
   * after a custom term request has been approved.
   */

  if (term.customStartDate && term.customEndDate) {
    return {
      startDate: term.customStartDate,

      endDate: term.customEndDate,
    };
  }

  /*
   * --------------------------------------------------------
   * FIXED ACADEMIC CALENDAR
   * --------------------------------------------------------
   */

  return getDefaultAcademicTermDates(term);
};

/* ==========================================================
   NEXT TERM CALCULATION
========================================================== */

const getNextTermDefaults = (term) => {
  if (!term?.name) {
    return {
      name: "Next Academic Term",
      semesterNumber: null,
      startDate: null,
      endDate: null,
    };
  }

  const match = term.name.match(/^(Odd|Even)\s+Semester\s+(\d{4})$/i);

  if (!match) {
    return {
      name: "Next Academic Term",
      semesterNumber: term.semesterNumber
        ? Number(term.semesterNumber) + 1
        : null,
      startDate: null,
      endDate: null,
    };
  }

  const type = match[1].toLowerCase();

  const year = Number(match[2]);

  /*
   * Odd → Even
   */

  if (type === "odd") {
    return {
      name: `Even Semester ${year}`,

      semesterNumber: Number(term.semesterNumber || 0) + 1,

      startDate: new Date(year, 9, 22),

      endDate: new Date(year + 1, 3, 30),
    };
  }

  /*
   * Even → Odd
   */

  return {
    name: `Odd Semester ${year + 1}`,

    semesterNumber: Number(term.semesterNumber || 0) + 1,

    startDate: new Date(year + 1, 5, 1),

    endDate: new Date(year + 1, 9, 21),
  };
};

/* ==========================================================
   YEAR MAPPING
========================================================== */

const getYearText = (semesterNumber) => {
  if (
    semesterNumber === undefined ||
    semesterNumber === null ||
    semesterNumber === ""
  ) {
    return "All Years";
  }

  const semester = Number(semesterNumber);

  if (Number.isNaN(semester)) {
    return "All Years";
  }

  if (semester <= 2) {
    return "1st Year";
  }

  if (semester <= 4) {
    return "2nd Year";
  }

  if (semester <= 6) {
    return "3rd Year";
  }

  return "4th Year";
};

/* ==========================================================
   COMPONENT
========================================================== */

const AssignmentBanner = ({ term, filters, onTermChangeRequested }) => {
  /* ========================================================
     TERM CHANGE CONTEXT
  ======================================================== */

  const [termContext, setTermContext] = useState(null);

  const [loadingContext, setLoadingContext] = useState(true);

  const [contextError, setContextError] = useState("");

  /* ========================================================
     MODAL
  ======================================================== */

  const [showModal, setShowModal] = useState(false);

  /* ========================================================
     FORM
  ======================================================== */

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  /* ========================================================
     REQUEST STATE
  ======================================================== */

  const [submitting, setSubmitting] = useState(false);

  const [requestError, setRequestError] = useState("");

  const [requestSuccess, setRequestSuccess] = useState("");

  /* ========================================================
     LOAD TERM CHANGE CONTEXT
  ======================================================== */

  const loadTermContext = async () => {
    try {
      setLoadingContext(true);
      setContextError("");

      const context = await getTermChangeContext();

      setTermContext(context);
    } catch (error) {
      console.error("Failed to load term change context:", error);

      setContextError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load term change information.",
      );
    } finally {
      setLoadingContext(false);
    }
  };

  useEffect(() => {
    loadTermContext();
  }, []);

  /* ========================================================
     SELECTED TERM
  ========================================================

     IMPORTANT:

     `term` comes directly from Assignments.jsx.

     Therefore the banner follows the term selected
     in the Academic Year → Term filter.

  ======================================================== */

  const currentTerm = term || null;

  /* ========================================================
     NEXT TERM
  ========================================================

     Backend context is preferred when available.

     If unavailable, frontend derives the next term
     from the fixed academic calendar.
  ======================================================== */

  const calculatedNextTerm = useMemo(
    () => getNextTermDefaults(currentTerm),
    [currentTerm],
  );

  const nextTerm = termContext?.nextTerm || calculatedNextTerm;

  /* ========================================================
     PENDING REQUEST
  ======================================================== */

  const pendingRequest = termContext?.pendingRequest || null;

  /* ========================================================
     TERM NAME
  ======================================================== */

  const termName = currentTerm?.name || "Academic Term";

  /* ========================================================
     DISPLAY TERM DATES
  ======================================================== */

  const displayTermDates = useMemo(
    () => getAcademicTermDates(currentTerm),
    [
      currentTerm?.id,
      currentTerm?.name,
      currentTerm?.startDate,
      currentTerm?.endDate,
      currentTerm?.customStartDate,
      currentTerm?.customEndDate,
    ],
  );

  /* ========================================================
     YEAR / SECTION
  ======================================================== */

  const yearText = useMemo(
    () => getYearText(filters?.semesterNumber),
    [filters?.semesterNumber],
  );

  const sectionText = filters?.section || "All Sections";

  /* ========================================================
     OPEN MODAL
  ======================================================== */

  const handleOpenModal = () => {
    setRequestError("");
    setRequestSuccess("");

    /*
     * Use the next term returned by backend if available.
     *
     * Otherwise use the fixed academic calendar calculated
     * from the currently selected term.
     */

    const defaultStart =
      nextTerm?.customStartDate ||
      nextTerm?.startDate ||
      calculatedNextTerm.startDate;

    const defaultEnd =
      nextTerm?.customEndDate ||
      nextTerm?.endDate ||
      calculatedNextTerm.endDate;

    setStartDate(formatDateForInput(defaultStart));

    setEndDate(formatDateForInput(defaultEnd));

    setShowModal(true);
  };

  /* ========================================================
     CLOSE MODAL
  ======================================================== */

  const handleCloseModal = () => {
    if (submitting) {
      return;
    }

    setShowModal(false);

    setRequestError("");
    setRequestSuccess("");
  };

  /* ========================================================
     START DATE
  ======================================================== */

  const handleStartDateChange = (event) => {
    const value = event.target.value;

    setStartDate(value);

    /*
     * If current end date is no longer valid,
     * clear it.
     */

    if (endDate && value && endDate <= value) {
      setEndDate("");
    }
  };

  /* ========================================================
     END DATE
  ======================================================== */

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  /* ========================================================
     SUBMIT REQUEST
  ======================================================== */

  const handleSubmitRequest = async () => {
    setRequestError("");
    setRequestSuccess("");

    /* ----------------------------------------------------
         Required fields
      ---------------------------------------------------- */

    if (!startDate || !endDate) {
      setRequestError("Please select both the start date and end date.");

      return;
    }

    /* ----------------------------------------------------
         Date order
      ---------------------------------------------------- */

    if (endDate <= startDate) {
      setRequestError("End date must be after the start date.");

      return;
    }

    /* ----------------------------------------------------
         Pending request
      ---------------------------------------------------- */

    if (pendingRequest) {
      setRequestError("A term change request is already pending approval.");

      return;
    }

    try {
      setSubmitting(true);

      const request = await createTermChangeRequest({
        requestedStartDate: startDate,

        requestedEndDate: endDate,
      });

      setRequestSuccess("Term change request submitted successfully.");

      /*
       * Refresh pending-request status.
       */

      await loadTermContext();

      /*
       * Allow parent to react if required.
       */

      if (onTermChangeRequested) {
        onTermChangeRequested(request);
      }

      /*
       * Close after success.
       */

      setTimeout(() => {
        setShowModal(false);
        setRequestSuccess("");
      }, 1200);
    } catch (error) {
      console.error("Term change request failed:", error);

      setRequestError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit term change request.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* ====================================================
          BANNER
      ==================================================== */}

      <div className="flex w-full items-start justify-between">
        {/* ==================================================
            LEFT
        ================================================== */}

        <div className="pt-1">
          <h1
            className="
              text-[26px]
              font-bold
              leading-7
              tracking-tight
              text-slate-900
            "
          >
            Assign Students to Mentors
          </h1>

          <p
            className="
              mt-1.5
              text-[11px]
              font-medium
              leading-5
              text-slate-500
            "
          >
            Assign students to available mentors for {termName} ({yearText},{" "}
            {sectionText})
          </p>
        </div>

        {/* ==================================================
            CURRENT TERM CARD
        ================================================== */}

        <div
          className="
            flex
            h-[72px]
            w-[338px]
            shrink-0
            items-center
            justify-between
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-slate-50
                text-slate-500
              "
            >
              {loadingContext ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <CalendarDays size={18} strokeWidth={1.8} />
              )}
            </div>

            <div className="flex flex-col">
              <span
                className="
                  text-[9px]
                  font-medium
                  leading-4
                  text-slate-400
                "
              >
                Current Term
              </span>

              <span
                className="
                  text-[12px]
                  font-bold
                  leading-4
                  text-slate-800
                "
              >
                {loadingContext && !currentTerm ? "Loading..." : termName}
              </span>

              {/* ==========================================
                  FIXED / CUSTOM DATES
              ========================================== */}

              <span
                className="
                  text-[9px]
                  font-medium
                  leading-4
                  text-slate-400
                "
              >
                {formatDate(displayTermDates.startDate)}
                {" - "}
                {formatDate(displayTermDates.endDate)}
              </span>
            </div>
          </div>

          {/* =================================================
              CHANGE TERM
          ================================================= */}

          <button
            type="button"
            onClick={handleOpenModal}
            disabled={
              loadingContext || Boolean(contextError) || Boolean(pendingRequest)
            }
            className="
              flex
              h-10
              min-w-[116px]
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-blue-100
              bg-white
              px-4
              text-[10px]
              font-semibold
              text-blue-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <CalendarDays size={14} strokeWidth={2} />

            <span>{pendingRequest ? "Request Pending" : "Change Term"}</span>
          </button>
        </div>
      </div>

      {/* ====================================================
          CONTEXT ERROR
      ==================================================== */}

      {contextError && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-red-100
            bg-red-50
            px-3
            py-2
            text-[10px]
            font-medium
            text-red-600
          "
        >
          <AlertCircle size={14} />

          <span>{contextError}</span>

          <button
            type="button"
            onClick={loadTermContext}
            className="
              ml-auto
              font-semibold
              underline
            "
          >
            Retry
          </button>
        </div>
      )}

      {/* ====================================================
          PENDING REQUEST
      ==================================================== */}

      {pendingRequest && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-amber-100
            bg-amber-50
            px-3
            py-2
            text-[10px]
            font-medium
            text-amber-700
          "
        >
          <AlertCircle size={14} />

          <span>
            Term change request pending approval for{" "}
            <strong>{pendingRequest.requestedTermName}</strong>.
          </span>
        </div>
      )}

      {/* ====================================================
          MODAL
      ==================================================== */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/40
            px-4
            backdrop-blur-[2px]
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !submitting) {
              handleCloseModal();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-[540px]
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
            "
          >
            {/* ==============================================
                HEADER
            ============================================== */}

            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-slate-100
                px-6
                py-5
              "
            >
              <div>
                <h2
                  className="
                    text-[18px]
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Request Term Change
                </h2>

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-5
                    text-slate-500
                  "
                >
                  Select the semester date range before submitting your request.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={submitting}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-600
                "
              >
                <X size={17} />
              </button>
            </div>

            {/* ==============================================
                BODY
            ============================================== */}

            <div className="px-6 py-5">
              {/* ============================================
                  TERM TRANSITION
              ============================================ */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                "
              >
                {/* CURRENT */}

                <div className="min-w-0 flex-1">
                  <span
                    className="
                      block
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Current Term
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      truncate
                      text-[12px]
                      font-bold
                      text-slate-800
                    "
                  >
                    {currentTerm?.name || "Academic Term"}
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      text-[9px]
                      font-medium
                      text-slate-400
                    "
                  >
                    {formatDate(displayTermDates.startDate)}
                    {" - "}
                    {formatDate(displayTermDates.endDate)}
                  </span>
                </div>

                <ArrowRight
                  size={17}
                  className="
                    shrink-0
                    text-slate-400
                  "
                />

                {/* NEXT */}

                <div className="min-w-0 flex-1">
                  <span
                    className="
                      block
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-400
                    "
                  >
                    Change To
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      truncate
                      text-[12px]
                      font-bold
                      text-blue-600
                    "
                  >
                    {nextTerm?.name || calculatedNextTerm.name}
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      text-[9px]
                      font-medium
                      text-slate-400
                    "
                  >
                    {formatDate(
                      nextTerm?.startDate || calculatedNextTerm.startDate,
                    )}
                    {" - "}
                    {formatDate(
                      nextTerm?.endDate || calculatedNextTerm.endDate,
                    )}
                  </span>
                </div>
              </div>

              {/* ============================================
                  INFO
              ============================================ */}

              <div
                className="
                  mt-3
                  rounded-lg
                  border
                  border-blue-100
                  bg-blue-50
                  px-3
                  py-2.5
                "
              >
                <p
                  className="
                    text-[10px]
                    font-medium
                    leading-4
                    text-blue-700
                  "
                >
                  Default dates follow the academic calendar. You can select
                  custom dates below before submitting the request.
                </p>
              </div>

              {/* ============================================
                  DATE RANGE
              ============================================ */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-4
                "
              >
                {/* START DATE */}

                <div>
                  <label
                    htmlFor="term-change-start-date"
                    className="
                      mb-1.5
                      block
                      text-[10px]
                      font-semibold
                      text-slate-700
                    "
                  >
                    Start Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="term-change-start-date"
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      disabled={submitting}
                      className="
                        h-10
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        pl-9
                        pr-3
                        text-[11px]
                        font-medium
                        text-slate-700
                        outline-none
                        transition
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-100
                        disabled:cursor-not-allowed
                        disabled:bg-slate-50
                      "
                    />
                  </div>
                </div>

                {/* END DATE */}

                <div>
                  <label
                    htmlFor="term-change-end-date"
                    className="
                      mb-1.5
                      block
                      text-[10px]
                      font-semibold
                      text-slate-700
                    "
                  >
                    End Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="term-change-end-date"
                      type="date"
                      value={endDate}
                      min={startDate || undefined}
                      onChange={handleEndDateChange}
                      disabled={submitting || !startDate}
                      className="
                        h-10
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        pl-9
                        pr-3
                        text-[11px]
                        font-medium
                        text-slate-700
                        outline-none
                        transition
                        focus:border-blue-400
                        focus:ring-2
                        focus:ring-blue-100
                        disabled:cursor-not-allowed
                        disabled:bg-slate-50
                      "
                    />
                  </div>
                </div>
              </div>

              {/* ============================================
                  SUCCESS
              ============================================ */}

              {requestSuccess && (
                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-2
                    rounded-lg
                    border
                    border-emerald-100
                    bg-emerald-50
                    px-3
                    py-2.5
                    text-[10px]
                    font-medium
                    leading-4
                    text-emerald-600
                  "
                >
                  <CheckCircle2
                    size={14}
                    className="
                      mt-0.5
                      shrink-0
                    "
                  />

                  <span>{requestSuccess}</span>
                </div>
              )}

              {/* ============================================
                  ERROR
              ============================================ */}

              {requestError && (
                <div
                  className="
                    mt-4
                    flex
                    items-start
                    gap-2
                    rounded-lg
                    border
                    border-red-100
                    bg-red-50
                    px-3
                    py-2.5
                    text-[10px]
                    font-medium
                    leading-4
                    text-red-600
                  "
                >
                  <AlertCircle
                    size={14}
                    className="
                      mt-0.5
                      shrink-0
                    "
                  />

                  <span>{requestError}</span>
                </div>
              )}
            </div>

            {/* ==============================================
                FOOTER
            ============================================== */}

            <div
              className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-slate-100
                bg-slate-50/50
                px-6
                py-4
              "
            >
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={submitting}
                className="
                  h-9
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-[10px]
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmitRequest}
                disabled={submitting || Boolean(pendingRequest)}
                className="
                  flex
                  h-9
                  min-w-[126px]
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-4
                  text-[10px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Change"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentBanner;
