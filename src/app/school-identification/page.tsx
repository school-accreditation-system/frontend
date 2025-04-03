import { NavBar } from "@/components/navigation/NavBar";
import { SchoolIdentificationSteps } from "@/components/school-identification/SchoolIdentificationSteps";


export default function SchoolIdentificationPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50 py-10">
        <SchoolIdentificationSteps />
      </main>
    </>
  )
} 