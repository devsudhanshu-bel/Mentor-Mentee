import React, { useMemo, useState } from "react";
import { importAttendancePdf } from "../../api/attendance.api";

import {
  X,
  Plus,
  Trash2,
  BookOpen,
  Save,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const ROMAN = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
};

/* ==========================================================
   PERCENTAGE
========================================================== */

const calculatePercentage = (attended, held) => {
  const numericHeld = Number(held) || 0;
  const numericAttended = Number(attended) || 0;

  if (numericHeld <= 0) {
    return 0;
  }

  return (numericAttended / numericHeld) * 100;
};

/* ==========================================================
   EMPTY SUBJECT
========================================================== */

const createSubject = () => ({
  id: Date.now() + Math.random(),

  subjectName: "",

  courseCode: "",

  credits: "",

  category: "THEORY",

  /* Theory */

  theoryClassesHeld: "",

  theoryClassesAttended: "",

  /* Practical */

  practicalClassesHeld: "",

  practicalClassesAttended: "",
});

/* ==========================================================
   COMPONENT
========================================================== */

const AttendanceEntryModal = ({ semester, onClose, onSave }) => {
  const [subjects, setSubjects] = useState([createSubject()]);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [uploadedPdfName, setUploadedPdfName] = useState("");

  /* ========================================================
     ADD SUBJECT
  ======================================================== */

  const addSubject = () => {
    setSubjects((current) => [...current, createSubject()]);
  };

  /* ========================================================
     REMOVE SUBJECT
  ======================================================== */

  const removeSubject = (id) => {
    if (subjects.length === 1) {
      return;
    }

    setSubjects((current) => current.filter((subject) => subject.id !== id));

    setError("");
  };

  /* ========================================================
     UPDATE SUBJECT
  ======================================================== */

  const updateSubject = (id, field, value) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject,
      ),
    );

    setError("");
  };

  /* ========================================================
     GET SUBJECT TOTALS
  ======================================================== */

  const getSubjectTotals = (subject) => {
    if (subject.category === "PRACTICAL") {
      const theoryHeld = Number(subject.theoryClassesHeld) || 0;

      const theoryAttended = Number(subject.theoryClassesAttended) || 0;

      const practicalHeld = Number(subject.practicalClassesHeld) || 0;

      const practicalAttended = Number(subject.practicalClassesAttended) || 0;

      const totalHeld = theoryHeld + practicalHeld;

      const totalAttended = theoryAttended + practicalAttended;

      return {
        theoryHeld,

        theoryAttended,

        theoryPercentage: calculatePercentage(theoryAttended, theoryHeld),

        practicalHeld,

        practicalAttended,

        practicalPercentage: calculatePercentage(
          practicalAttended,
          practicalHeld,
        ),

        totalHeld,

        totalAttended,

        combinedPercentage: calculatePercentage(totalAttended, totalHeld),
      };
    }

    const classesHeld = Number(subject.theoryClassesHeld) || 0;

    const classesAttended = Number(subject.theoryClassesAttended) || 0;

    return {
      theoryHeld: classesHeld,

      theoryAttended: classesAttended,

      theoryPercentage: calculatePercentage(classesAttended, classesHeld),

      practicalHeld: 0,

      practicalAttended: 0,

      practicalPercentage: 0,

      totalHeld: classesHeld,

      totalAttended: classesAttended,

      combinedPercentage: calculatePercentage(classesAttended, classesHeld),
    };
  };

  /* ========================================================
     LIVE SUMMARY
  ======================================================== */

  const summary = useMemo(() => {
    let classesHeld = 0;

    let classesAttended = 0;

    subjects.forEach((subject) => {
      const totals = getSubjectTotals(subject);

      classesHeld += totals.totalHeld;

      classesAttended += totals.totalAttended;
    });

    return {
      classesHeld,

      classesAttended,

      percentage: calculatePercentage(classesAttended, classesHeld),
    };
  }, [subjects]);

  /* ========================================================
     VALIDATE
  ======================================================== */

  const validate = () => {
    const names = [];

    for (const subject of subjects) {
      const name = subject.subjectName.trim();

      if (!name) {
        return "Please enter every subject name.";
      }

      const normalizedName = name.toLowerCase();

      if (names.includes(normalizedName)) {
        return `Duplicate subject: ${name}.`;
      }

      names.push(normalizedName);

      /* ======================================================
         THEORY
      ====================================================== */

      const theoryHeld = Number(subject.theoryClassesHeld);

      const theoryAttended = Number(subject.theoryClassesAttended);

      if (
        subject.theoryClassesHeld === "" ||
        !Number.isInteger(theoryHeld) ||
        theoryHeld < 0
      ) {
        return `Enter valid theory classes held for ${name}.`;
      }

      if (
        subject.theoryClassesAttended === "" ||
        !Number.isInteger(theoryAttended) ||
        theoryAttended < 0
      ) {
        return `Enter valid theory classes attended for ${name}.`;
      }

      if (theoryAttended > theoryHeld) {
        return `Theory classes attended cannot exceed classes held for ${name}.`;
      }

      /* ======================================================
         PRACTICAL
      ====================================================== */

      if (subject.category === "PRACTICAL") {
        const practicalHeld = Number(subject.practicalClassesHeld);

        const practicalAttended = Number(subject.practicalClassesAttended);

        if (
          subject.practicalClassesHeld === "" ||
          !Number.isInteger(practicalHeld) ||
          practicalHeld < 0
        ) {
          return `Enter valid practical classes held for ${name}.`;
        }

        if (
          subject.practicalClassesAttended === "" ||
          !Number.isInteger(practicalAttended) ||
          practicalAttended < 0
        ) {
          return `Enter valid practical classes attended for ${name}.`;
        }

        if (practicalAttended > practicalHeld) {
          return `Practical classes attended cannot exceed classes held for ${name}.`;
        }
      }
    }

    return "";
  };

  /* ========================================================
     SAVE
  ======================================================== */

  const handleSave = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);

      return;
    }

    try {
      setSaving(true);

      setError("");

      /*
       * IMPORTANT:
       *
       * For practical subjects:
       *
       * Combined Held =
       * Theory Held + Practical Held
       *
       * Combined Attended =
       * Theory Attended + Practical Attended
       *
       * The backend therefore receives the
       * final combined subject attendance.
       */

      const payload = subjects.map((subject) => {
        const totals = getSubjectTotals(subject);

        return {
          subjectName: subject.subjectName.trim(),

          courseCode: subject.courseCode.trim(),

          credits: Number(subject.credits) || 0,

          category: subject.category,

          /*
           * FINAL COMBINED VALUES
           */

          classesHeld: totals.totalHeld,

          classesAttended: totals.totalAttended,
        };
      });

      await onSave(payload);
    } catch (err) {
      setError(err?.message || "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
      "
    >
      {/* ======================================================
          BACKDROP
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-slate-900/40
          backdrop-blur-[2px]
        "
        onClick={saving ? undefined : onClose}
      />

      {/* ======================================================
          MODAL
      ====================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[760px]
          max-h-[90vh]
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          className="
            px-6
            py-5
            border-b
            border-slate-200
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-blue-50
                flex
                items-center
                justify-center
              "
            >
              <BookOpen size={19} className="text-blue-600" />
            </div>

            <div>
              <h2
                className="
                  text-[17px]
                  font-semibold
                  text-[#142970]
                "
              >
                Enter Attendance
              </h2>

              <p
                className="
                  text-[12px]
                  text-slate-500
                  mt-0.5
                "
              >
                Semester {ROMAN[semester] || semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setPdfError("");
                setSelectedPdf(null);
                setShowPdfDialog(true);
              }}
              className="
                h-9
                px-3
                rounded-lg
                border
                border-blue-200
                bg-blue-50
                text-blue-700
                text-[12px]
                font-medium
                hover:bg-blue-100
                disabled:opacity-50
              "
            >
              Upload PDF
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="
                w-8
                h-8
                rounded-lg
                flex
                items-center
                justify-center
                text-slate-400
                hover:bg-slate-100
                hover:text-slate-700
              "
              aria-label="Close attendance dialog"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-6
            py-5
            space-y-4
          "
        >
          <div>
            <h3
              className="
                text-[14px]
                font-semibold
                text-slate-700
              "
            >
              Add your subjects
            </h3>

            <p
              className="
                text-[12px]
                text-slate-500
                mt-1
              "
            >
              Select the subject category and enter the corresponding attendance
              details.
            </p>
          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div
              className="
                flex
                items-start
                gap-2
                px-3
                py-2.5
                rounded-lg
                bg-red-50
                border
                border-red-100
                text-red-600
                text-[12px]
              "
            >
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />

              <span>{error}</span>
            </div>
          )}

          {/* ==================================================
              SUBJECTS
          ================================================== */}

          <div className="space-y-3">
            {subjects.map((subject, index) => {
              const totals = getSubjectTotals(subject);

              return (
                <div
                  key={subject.id}
                  className="
                      border
                      border-slate-200
                      rounded-xl
                      p-4
                      bg-slate-50/50
                    "
                >
                  {/* ========================================
                        SUBJECT HEADER
                    ======================================== */}

                  <div
                    className="
                        flex
                        items-center
                        justify-between
                        mb-4
                      "
                  >
                    <p
                      className="
                          text-[12px]
                          font-semibold
                          text-slate-600
                        "
                    >
                      Subject {index + 1}
                    </p>

                    {subjects.length > 1 && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => removeSubject(subject.id)}
                        className="
                            text-slate-400
                            hover:text-red-500
                          "
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  {/* ========================================
                        SUBJECT NAME
                    ======================================== */}

                  <div className="mb-3">
                    <label
                      className="
                          block
                          text-[11px]
                          font-medium
                          text-slate-600
                          mb-1.5
                        "
                    >
                      Subject Name
                    </label>

                    <input
                      type="text"
                      value={subject.subjectName}
                      onChange={(event) =>
                        updateSubject(
                          subject.id,
                          "subjectName",
                          event.target.value,
                        )
                      }
                      placeholder="e.g. Deep Learning"
                      className="
                          w-full
                          h-10
                          px-3
                          rounded-lg
                          border
                          border-slate-300
                          bg-white
                          text-[13px]
                          outline-none
                          focus:border-blue-500
                        "
                    />
                  </div>

                  {/* ========================================
                        COURSE CODE + CREDITS
                    ======================================== */}

                  <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                        mb-3
                      "
                  >
                    <div>
                      <label
                        className="
                            block
                            text-[11px]
                            font-medium
                            text-slate-600
                            mb-1.5
                          "
                      >
                        Course Code
                        <span className="text-slate-400 font-normal">
                          {" "}
                        </span>
                      </label>

                      <input
                        type="text"
                        value={subject.courseCode}
                        onChange={(event) =>
                          updateSubject(
                            subject.id,
                            "courseCode",
                            event.target.value,
                          )
                        }
                        placeholder="e.g. CSE701"
                        className="
                            w-full
                            h-10
                            px-3
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            text-[13px]
                            outline-none
                            focus:border-blue-500
                          "
                      />
                    </div>

                    <div>
                      <label
                        className="
                            block
                            text-[11px]
                            font-medium
                            text-slate-600
                            mb-1.5
                          "
                      >
                        Credits
                        <span className="text-slate-400 font-normal">
                          {" "}
                        </span>
                      </label>

                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={subject.credits}
                        onChange={(event) =>
                          updateSubject(
                            subject.id,
                            "credits",
                            event.target.value,
                          )
                        }
                        placeholder="0"
                        className="
                            w-full
                            h-10
                            px-3
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            text-[13px]
                            outline-none
                            focus:border-blue-500
                          "
                      />
                    </div>
                  </div>

                  {/* ========================================
                        CATEGORY
                    ======================================== */}

                  <div className="mb-4">
                    <label
                      className="
                          block
                          text-[11px]
                          font-medium
                          text-slate-600
                          mb-1.5
                        "
                    >
                      Subject Category
                    </label>

                    <div className="relative">
                      <select
                        value={subject.category}
                        onChange={(event) =>
                          updateSubject(
                            subject.id,
                            "category",
                            event.target.value,
                          )
                        }
                        className="
                            appearance-none
                            w-full
                            h-10
                            px-3
                            pr-9
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            text-[13px]
                            outline-none
                            focus:border-blue-500
                            cursor-pointer
                          "
                      >
                        <option value="THEORY">Theory</option>

                        <option value="PRACTICAL">Practical</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            pointer-events-none
                          "
                      />
                    </div>
                  </div>

                  {/* ========================================
                        THEORY
                    ======================================== */}

                  <div
                    className="
                        border
                        border-slate-200
                        rounded-xl
                        p-3
                        bg-white
                      "
                  >
                    {subject.category === "PRACTICAL" ? (
                      <div className="mb-3">
                        <p
                          className="
                              text-[12px]
                              font-semibold
                              text-[#142970]
                            "
                        >
                          Theory Part
                        </p>

                        <p
                          className="
                              text-[10px]
                              text-slate-400
                              mt-0.5
                            "
                        >
                          Enter theory attendance
                        </p>
                      </div>
                    ) : null}

                    <div
                      className="
                          grid
                          grid-cols-2
                          gap-3
                        "
                    >
                      <div>
                        <label
                          className="
                              block
                              text-[11px]
                              font-medium
                              text-slate-600
                              mb-1.5
                            "
                        >
                          Classes Held
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={subject.theoryClassesHeld}
                          onChange={(event) =>
                            updateSubject(
                              subject.id,
                              "theoryClassesHeld",
                              event.target.value,
                            )
                          }
                          placeholder="0"
                          className="
                              w-full
                              h-10
                              px-3
                              rounded-lg
                              border
                              border-slate-300
                              bg-white
                              text-[13px]
                              outline-none
                              focus:border-blue-500
                            "
                        />
                      </div>

                      <div>
                        <label
                          className="
                              block
                              text-[11px]
                              font-medium
                              text-slate-600
                              mb-1.5
                            "
                        >
                          Classes Attended
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={subject.theoryClassesAttended}
                          onChange={(event) =>
                            updateSubject(
                              subject.id,
                              "theoryClassesAttended",
                              event.target.value,
                            )
                          }
                          placeholder="0"
                          className="
                              w-full
                              h-10
                              px-3
                              rounded-lg
                              border
                              border-slate-300
                              bg-white
                              text-[13px]
                              outline-none
                              focus:border-blue-500
                            "
                        />
                      </div>
                    </div>

                    {/* THEORY PERCENTAGE */}

                    <div
                      className="
                          mt-3
                          text-right
                        "
                    >
                      <span
                        className="
                            text-[11px]
                            text-slate-400
                          "
                      >
                        Theory Attendance:{" "}
                      </span>

                      <span
                        className="
                            text-[11px]
                            font-semibold
                            text-blue-600
                          "
                      >
                        {totals.theoryPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* ========================================
                        PRACTICAL
                    ======================================== */}

                  {subject.category === "PRACTICAL" && (
                    <>
                      <div
                        className="
                            border
                            border-slate-200
                            rounded-xl
                            p-3
                            bg-white
                            mt-3
                          "
                      >
                        <div className="mb-3">
                          <p
                            className="
                                text-[12px]
                                font-semibold
                                text-[#142970]
                              "
                          >
                            Practical Part
                          </p>

                          <p
                            className="
                                text-[10px]
                                text-slate-400
                                mt-0.5
                              "
                          >
                            Enter practical attendance
                          </p>
                        </div>

                        <div
                          className="
                              grid
                              grid-cols-2
                              gap-3
                            "
                        >
                          <div>
                            <label
                              className="
                                  block
                                  text-[11px]
                                  font-medium
                                  text-slate-600
                                  mb-1.5
                                "
                            >
                              Classes Held
                            </label>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={subject.practicalClassesHeld}
                              onChange={(event) =>
                                updateSubject(
                                  subject.id,
                                  "practicalClassesHeld",
                                  event.target.value,
                                )
                              }
                              placeholder="0"
                              className="
                                  w-full
                                  h-10
                                  px-3
                                  rounded-lg
                                  border
                                  border-slate-300
                                  bg-white
                                  text-[13px]
                                  outline-none
                                  focus:border-blue-500
                                "
                            />
                          </div>

                          <div>
                            <label
                              className="
                                  block
                                  text-[11px]
                                  font-medium
                                  text-slate-600
                                  mb-1.5
                                "
                            >
                              Classes Attended
                            </label>

                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={subject.practicalClassesAttended}
                              onChange={(event) =>
                                updateSubject(
                                  subject.id,
                                  "practicalClassesAttended",
                                  event.target.value,
                                )
                              }
                              placeholder="0"
                              className="
                                  w-full
                                  h-10
                                  px-3
                                  rounded-lg
                                  border
                                  border-slate-300
                                  bg-white
                                  text-[13px]
                                  outline-none
                                  focus:border-blue-500
                                "
                            />
                          </div>
                        </div>

                        {/* PRACTICAL PERCENTAGE */}

                        <div
                          className="
                              mt-3
                              text-right
                            "
                        >
                          <span
                            className="
                                text-[11px]
                                text-slate-400
                              "
                          >
                            Practical Attendance:{" "}
                          </span>

                          <span
                            className="
                                text-[11px]
                                font-semibold
                                text-blue-600
                              "
                          >
                            {totals.practicalPercentage.toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {/* ======================================
                            COMBINED RESULT
                        ====================================== */}

                      <div
                        className="
                            mt-3
                            rounded-xl
                            border
                            border-blue-100
                            bg-blue-50/50
                            px-4
                            py-3
                          "
                      >
                        <div
                          className="
                              flex
                              items-center
                              justify-between
                              mb-3
                            "
                        >
                          <div>
                            <p
                              className="
                                  text-[12px]
                                  font-semibold
                                  text-[#142970]
                                "
                            >
                              Combined Attendance
                            </p>

                            <p
                              className="
                                  text-[10px]
                                  text-slate-400
                                  mt-0.5
                                "
                            >
                              Theory + Practical
                            </p>
                          </div>

                          <span
                            className="
                                text-[15px]
                                font-bold
                                text-blue-600
                              "
                          >
                            {totals.combinedPercentage.toFixed(2)}%
                          </span>
                        </div>

                        <div
                          className="
                              grid
                              grid-cols-2
                              gap-3
                            "
                        >
                          <div>
                            <p
                              className="
                                  text-[10px]
                                  text-slate-400
                                "
                            >
                              Total Classes Held
                            </p>

                            <p
                              className="
                                  text-[13px]
                                  font-semibold
                                  text-[#142970]
                                  mt-1
                                "
                            >
                              {totals.totalHeld}
                            </p>
                          </div>

                          <div>
                            <p
                              className="
                                  text-[10px]
                                  text-slate-400
                                "
                            >
                              Total Classes Attended
                            </p>

                            <p
                              className="
                                  text-[13px]
                                  font-semibold
                                  text-[#142970]
                                  mt-1
                                "
                            >
                              {totals.totalAttended}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ========================================
                        THEORY FINAL PERCENTAGE
                    ======================================== */}

                  {subject.category === "THEORY" && (
                    <div
                      className="
                          mt-3
                          text-right
                        "
                    >
                      <span
                        className="
                            text-[11px]
                            text-slate-400
                          "
                      >
                        Attendance:{" "}
                      </span>

                      <span
                        className="
                            text-[11px]
                            font-semibold
                            text-blue-600
                          "
                      >
                        {totals.combinedPercentage.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ==================================================
              ADD SUBJECT
          ================================================== */}

          <button
            type="button"
            disabled={saving}
            onClick={addSubject}
            className="
              w-full
              h-10
              rounded-lg
              border
              border-dashed
              border-blue-300
              text-blue-600
              text-[12px]
              font-medium
              flex
              items-center
              justify-center
              gap-2
              hover:bg-blue-50
              disabled:opacity-50
            "
          >
            <Plus size={15} />
            Add Subject
          </button>
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div
          className="
            border-t
            border-slate-200
            px-6
            py-4
            bg-white
          "
        >
          <div
            className="
              grid
              grid-cols-3
              gap-4
              mb-4
            "
          >
            <div>
              <p className="text-[10px] text-slate-400">Classes Held</p>

              <p
                className="
                  text-[14px]
                  font-semibold
                  text-[#142970]
                  mt-1
                "
              >
                {summary.classesHeld}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-slate-400">Classes Attended</p>

              <p
                className="
                  text-[14px]
                  font-semibold
                  text-[#142970]
                  mt-1
                "
              >
                {summary.classesAttended}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-slate-400">Overall Attendance</p>

              <p
                className="
                  text-[14px]
                  font-semibold
                  text-blue-600
                  mt-1
                "
              >
                {summary.percentage.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* BUTTONS */}

          <div
            className="
              flex
              justify-end
              gap-2
            "
          >
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="
                px-4
                h-10
                rounded-lg
                border
                border-slate-300
                text-[12px]
                font-medium
                text-slate-600
                hover:bg-slate-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="
                px-5
                h-10
                rounded-lg
                bg-blue-600
                text-white
                text-[12px]
                font-medium
                flex
                items-center
                gap-2
                hover:bg-blue-700
                disabled:opacity-60
              "
            >
              <Save size={15} />

              {saving ? "Saving..." : "Save Attendance"}
            </button>
          </div>
        </div>
      </div>

      {/* PDF picker dialog */}
      {showPdfDialog && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close PDF upload dialog"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setShowPdfDialog(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-pdf-title"
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3
                  id="attendance-pdf-title"
                  className="text-base font-semibold text-[#142970]"
                >
                  Upload PDF
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Choose a PDF file from your device.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPdfDialog(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                setPdfError("");
                setSelectedPdf(null);

                if (!file) return;

                const isPdf =
                  file.type === "application/pdf" ||
                  file.name.toLowerCase().endsWith(".pdf");

                if (!isPdf) {
                  setPdfError("Please select a PDF file.");
                  event.target.value = "";
                  return;
                }

                setSelectedPdf(file);
              }}
              className="block w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-blue-700 hover:file:bg-blue-100"
            />

            {selectedPdf && (
              <p className="mt-2 break-all text-xs text-slate-600">
                Selected: {selectedPdf.name}
              </p>
            )}

            {pdfError && (
              <p role="alert" className="mt-2 text-xs text-red-600">
                {pdfError}
              </p>
            )}

            {uploadedPdfName && !selectedPdf && (
              <p className="mt-2 text-xs text-emerald-700">
                Selected PDF: {uploadedPdfName}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowPdfDialog(false);
                  setSelectedPdf(null);
                  setPdfError("");
                }}
                className="h-9 rounded-lg border border-slate-300 px-4 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedPdf || uploadingPdf}
                onClick={async () => {
                  if (!selectedPdf) {
                    setPdfError("Choose a PDF file before clicking Upload.");
                    return;
                  }

                  try {
                    setUploadingPdf(true);
                    setPdfError("");
                    const result = await importAttendancePdf(semester, selectedPdf);
                    const importedSubjects = result?.data?.subjects || result?.subjects;
                    if (!Array.isArray(importedSubjects) || importedSubjects.length === 0) {
                      throw new Error("No attendance subjects were found in this PDF.");
                    }
                    // Reuse the existing save callback so the established
                    // persistence and refresh workflow remains unchanged.
                    await onSave(importedSubjects.map((subject) => ({
                      subjectName: subject.subjectName,
                      courseCode: subject.courseCode || "",
                      credits: 0,
                      category: "THEORY",
                      classesHeld: Number(subject.classesHeld),
                      classesAttended: Number(subject.classesAttended),
                    })));
                    setUploadedPdfName(selectedPdf.name);
                    setShowPdfDialog(false);
                    setSelectedPdf(null);
                  } catch (err) {
                    setPdfError(err?.response?.data?.message || err?.message || "Failed to import attendance PDF.");
                  } finally {
                    setUploadingPdf(false);
                  }
                }}
                className="h-9 rounded-lg bg-blue-600 px-4 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadingPdf ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceEntryModal;
