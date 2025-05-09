const REQUEST_TYPES = [
  {
    title: "New School Registration",
    description:
      "Start your journey in education by registering a new school. Get guidance on requirements and standards for establishing an educational institution.",
    requestType: "new-school-registration",
  },
  {
    title: "School Identification",
    description:
      "Provide essential information about your institution. This step is crucial for accurate assessment and personalized accreditation guidance.",
    href: "/school-identification",
    actionLabel: "Fill School Information",
    requestType: "school-identification",
  },
  {
    title: "Check Accredited Schools",
    description:
      "Find accredited schools in your area. This tool helps you locate institutions that meet the required standards and regulations.",
    href: "/accredited-schools",
    actionLabel: "Check Accredited Schools",
    requestType: "accredited-schools",
  },
];

export const ACCREDITATION_APPLICATION_TYPES = [
  {
    title: "TVET Trades",
    description:
      "Apply for accreditation of specific TVET trades in sectors like Construction, ICT, Agriculture, and more. Expand your institution's vocational offerings.",
    requestType: "tvet-trades",
  },
  {
    title: "General Combinations",
    description:
      "Choose general education combinations to expand your school's offerings.",
    requestType: "general-combination",
  },
  {
    title: "Professional Combinations",
    description:
      "Opt for professional education paths to enhance your institution's curriculum.",
    requestType: "professional-combination",
  },
  {
    title: "Ordinary Level",
    description:
      "Apply to offer or update ordinary level education at your school.",
    requestType: "ordinary-level",
  },
  {
    title: "Primary Level",
    description:
      "Start or expand primary level education to build a strong foundation for students.",
    requestType: "primary-level",
  },
  {
    title: "Pre-primary Level",
    description:
      "Initiate or enhance pre-primary level education for early childhood development.",
    requestType: "pre-primary-level",
  },
  {
    title: "Boarding Status",
    description:
      "Update or apply for boarding status to accommodate students on campus.",
    requestType: "boarding-status",
  },
  {
    title: "Submit a Claim",
    description:
      "Have concerns about an accredited institution? Submit a formal claim for investigation and resolution.",
    href: "submit-claim",
    requestType: "submit-claim",
  },
];

export const ALL_REQUEST_TYPES = [
  ...REQUEST_TYPES,
  ...ACCREDITATION_APPLICATION_TYPES,
];

export default REQUEST_TYPES;
