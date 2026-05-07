import { NotFound } from '@/components/NotFound';

export default function RootNotFound() {
  return (
    <NotFound
      title="Page not found"
      message="The page you are looking for does not exist or has been removed."
      actionLabel="Return to Home"
      actionHref="/"
    />
  );
}
