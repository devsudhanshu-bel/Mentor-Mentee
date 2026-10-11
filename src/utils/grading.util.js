export const gradePointMap = {
  "O": 4.0,
  "A+": 3.6,
  "A": 3.2,
  "B+": 2.8,
  "B": 2.4,
  "C": 2.0,
  "P": 1.6,
  "F": 0.0,
};

export const getGradePoint = (grade) => {
  return gradePointMap[grade] ?? 0;
};

export const calculateSemesterGPA = (subjects) => {

  let totalCredits = 0;
  let totalCreditPoints = 0;

  for (const subject of subjects) {

    totalCredits += subject.credits;

    totalCreditPoints +=
      subject.credits * getGradePoint(subject.grade);

  }

  if (totalCredits === 0) return 0;

  return Number((totalCreditPoints / totalCredits).toFixed(2));

};