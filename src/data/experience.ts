export type ExperienceItem = {
  title: string;
  /** The business/engineering outcome — leads, not the implementation. */
  outcome: string;
  /** Implementation specifics — follows the outcome, not the other way round. */
  engineering: string[];
};

export const experience = {
  contextLabel: "Production experience",
  company: "Ubitech Solutions Pvt. Ltd.",
  role: "Software Development Engineer I",
  location: "Gwalior, India",
  duration: "~1.5 years, including internship",
  stack: ["Angular", "TypeScript", "PHP (MVC)", "MySQL"],
  summary:
    "Production work on an internal HRMS/CRM platform — real business rules, real payroll math, real integrations, at a company that isn't mine. Specifics of the system stay internal; the engineering problems don't.",
  items: [
    {
      title: "Payroll integration",
      outcome:
        "Overtime payroll now submits accurate totals to the payment gateway automatically — closing a unit-conversion bug that had been silently corrupting totals before submission.",
      engineering: [
        "Structured payload builder for the gateway's overtime-payroll API",
        "Fixed a minutes-vs-seconds unit conversion bug",
        "Filtered zero-overtime days out before they reached the gateway",
      ],
    },
    {
      title: "Payroll calculation ordering",
      outcome:
        "Advance-leave salary figures now match what they should be — closing a small but real discrepancy in employee pay before it became a support ticket.",
      engineering: [
        "Root-caused a rounding-order bug: rounding was happening before, not after, a downstream deduction step",
        "Reordered the calculation so rounding is always the last step",
        "Verified the fix against known-good salary figures",
      ],
    },
    {
      title: "CRM stability",
      outcome:
        "Partner management pages stopped silently corrupting bulk actions and stopped leaking stale filter state across navigation.",
      engineering: [
        "Fixed a bulk-delete payload bug on the Partners page",
        "Resolved a scoped-variable naming conflict with a shared app-wide script",
        "Fixed filter-button state management that left stale filters applied after navigation",
      ],
    },
  ] as ExperienceItem[],
};
