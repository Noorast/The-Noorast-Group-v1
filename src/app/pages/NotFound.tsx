import { Link } from 'react-router';

export function NotFound() {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32">
        <div className="max-w-3xl">
          <h1 className="mb-8">Page Not Found</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-block text-sm border-b border-current hover:text-muted-foreground transition-colors"
          >
            Return to home →
          </Link>
        </div>
      </section>
    </div>
  );
}
