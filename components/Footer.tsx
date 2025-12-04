import SocialShare from "./SocialShare";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <SocialShare />
        </div>
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Enge's Deliverables Academy. Empowering minds through education.</p>
        </div>
      </div>
    </footer>
  );
}
