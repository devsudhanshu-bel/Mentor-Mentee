import React, { useMemo, useState } from "react";

import { X, Plus, Trash2, BookOpen, Save, AlertCircle } from "lucide-react";

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

const AttendanceEntryModal = ({ semester, onClose, onSave }) => {
  const [subjects, setSubjects] = useState([
    {
      id: Date.now(),

      subjectName: "",

      courseCode: "",

      credits: "",

      classesHeld: "",

      classesAttended: "",
    },
  ]);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Add Subject
  |--------------------------------------------------------------------------
  */

  const addSubject = () => {
    setSubjects((current) => [
      ...current,

      {
        id: Date.now() + Math.random(),

        subjectName: "",

        courseCode: "",

        credits: "",

        classesHeld: "",

        classesAttended: "",
      },
    ]);
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Subject
  |--------------------------------------------------------------------------
  */

  const removeSubject = (id) => {
    if (subjects.length === 1) {
      return;
    }

    setSubjects((current) => current.filter((subject) => subject.id !== id));
  };

  /*
  |--------------------------------------------------------------------------
  | Update Subject
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Live Summary
  |--------------------------------------------------------------------------
  */

  const summary = useMemo(() => {
    const classesHeld = subjects.reduce(
      (total, subject) => total + (Number(subject.classesHeld) || 0),
      0,
    );

    const classesAttended = subjects.reduce(
      (total, subject) => total + (Number(subject.classesAttended) || 0),
      0,
    );

    const percentage =
      classesHeld > 0 ? (classesAttended / classesHeld) * 100 : 0;

    return {
      classesHeld,
      classesAttended,
      percentage,
    };
  }, [subjects]);

  /*
  |--------------------------------------------------------------------------
  | Validate
  |--------------------------------------------------------------------------
  */

  const validate = () => {
    const names = [];

    for (const subject of subjects) {
      const name = subject.subjectName.trim();

      const held = Number(subject.classesHeld);

      const attended = Number(subject.classesAttended);

      if (!name) {
        return "Please enter every subject name.";
      }

      if (subject.classesHeld === "" || !Number.isInteger(held) || held < 0) {
        return `Enter valid classes held for ${name}.`;
      }

      if (
        subject.classesAttended === "" ||
        !Number.isInteger(attended) ||
        attended < 0
      ) {
        return `Enter valid classes attended for ${name}.`;
      }

      if (attended > held) {
        return `Classes attended cannot exceed classes held for ${name}.`;
      }

      const normalized = name.toLowerCase();

      if (names.includes(normalized)) {
        return `Duplicate subject: ${name}.`;
      }

      names.push(normalized);
    }

    return "";
  };

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSave = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);

      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = subjects.map((subject) => ({
        subjectName: subject.subjectName.trim(),

        courseCode: subject.courseCode.trim(),

        credits: Number(subject.credits) || 0,

        classesHeld: Number(subject.classesHeld),

        classesAttended: Number(subject.classesAttended),
      }));

      await onSave(payload);
    } catch (error) {
      setError(error.message || "Failed to save attendance.");
    } finally {
      setSaving(false);
    }
  };

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
      {/* Backdrop */}

      <div
        className="
          absolute
          inset-0
          bg-slate-900/40
          backdrop-blur-[2px]
        "
        onClick={saving ? undefined : onClose}
      />

      {/* Modal */}

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
        {/* ============================================================
            HEADER
        ============================================================ */}

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
                Semester {ROMAN[semester]}
              </p>
            </div>
          </div>

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
          >
            <X size={18} />
          </button>
        </div>

        {/* ============================================================
            CONTENT
        ============================================================ */}

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
              Enter the classes held and attended for each subject.
            </p>
          </div>

          {/* Error */}

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
              <AlertCircle
                size={15}
                className="
                  mt-0.5
                  flex-shrink-0
                "
              />

              <span>{error}</span>
            </div>
          )}

          {/* Subjects */}

          <div
            className="
            space-y-3
          "
          >
            {subjects.map((subject, index) => (
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

                {/* Subject */}

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
                    onChange={(e) =>
                      updateSubject(subject.id, "subjectName", e.target.value)
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

                {/* Course Code + Credits */}

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
                      <span
                        className="
                          text-slate-400
                          font-normal
                        "
                      >
                        {" "}
                        (Optional)
                      </span>
                    </label>

                    <input
                      type="text"
                      value={subject.courseCode}
                      onChange={(e) =>
                        updateSubject(subject.id, "courseCode", e.target.value)
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
                      <span
                        className="
                          text-slate-400
                          font-normal
                        "
                      >
                        {" "}
                        (Optional)
                      </span>
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={subject.credits}
                      onChange={(e) =>
                        updateSubject(subject.id, "credits", e.target.value)
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

                {/* Attendance */}

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
                      value={subject.classesHeld}
                      onChange={(e) =>
                        updateSubject(subject.id, "classesHeld", e.target.value)
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
                      value={subject.classesAttended}
                      onChange={(e) =>
                        updateSubject(
                          subject.id,
                          "classesAttended",
                          e.target.value,
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

                {/* Percentage */}

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
                    {Number(subject.classesHeld) > 0
                      ? (
                          (Number(subject.classesAttended) /
                            Number(subject.classesHeld)) *
                          100
                        ).toFixed(2)
                      : "0.00"}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add */}

          <button
            type="button"
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
            "
          >
            <Plus size={15} />
            Add Subject
          </button>
        </div>

        {/* ============================================================
            FOOTER
        ============================================================ */}

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
              <p
                className="
                text-[10px]
                text-slate-400
              "
              >
                Classes Held
              </p>

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
              <p
                className="
                text-[10px]
                text-slate-400
              "
              >
                Classes Attended
              </p>

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
              <p
                className="
                text-[10px]
                text-slate-400
              "
              >
                Overall Attendance
              </p>

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
    </div>
  );
};

export default AttendanceEntryModal;
