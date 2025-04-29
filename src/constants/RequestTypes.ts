const REQUEST_TYPES = [
  {
    title: "Parent/Guardian?",
    description:
      "You can check the status of your child's school registration and accreditation. This is a crucial step to ensure your child's educational institution meets the required standards.",
    href: "/accredited-schools",
    actionLabel: "View accredited schools",
  },
  {
    title: "New school/ Existing school but not Registered?",
    description:
      "If you are a new school or an existing school that is not yet registered, you can apply for registration. Become a recognized institution and gain access to accreditation opportunities.",
    href: "/register-school",
    actionLabel: "Register Your School",
    requestType: "school-identification",
  },
  {
    title: "Existing school requesting more accreditation?",
    description:
      "If your school is already registered but needs to expand its accreditation, you can apply for additional accreditation. This allows you to offer more programs or levels of education.",
    href: "/request-accreditation",
    actionLabel: "Request More Accreditation",
  },
];

export const ALL_REQUEST_TYPES = [...REQUEST_TYPES];

export default REQUEST_TYPES;
